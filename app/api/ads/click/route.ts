// app/api/ads/click/route.ts
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// Helper function to calculate ad rewards based on requirements
function calculateAdReward(
  adType: "NORMAL" | "PREMIUM",
  membershipType: "FREE" | "PREMIUM"
): number {
  // Normal ads: Free users earn $0.001, Premium users earn $0.005
  // Premium ads: Only premium users can see them, they earn $0.01

  if (adType === "NORMAL") {
    return membershipType === "PREMIUM" ? 0.005 : 0.001;
  } else {
    // PREMIUM ad - only premium users should see these
    return 0.01;
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const { campaignId, verificationCode } = await req.json();

    if (!campaignId || typeof campaignId !== "number") {
      return NextResponse.json(
        { error: "Invalid campaign ID" },
        { status: 400 }
      );
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { membershipType: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has viewed the ad
    const view = await prisma.adView.findUnique({
      where: {
        userId_campaignId: {
          userId,
          campaignId,
        },
      },
    });

    if (!view) {
      return NextResponse.json(
        { error: "Ad must be viewed first" },
        { status: 400 }
      );
    }

    // Check if 15 seconds have elapsed since view
    const elapsed = (Date.now() - new Date(view.createdAt).getTime()) / 1000;

    if (elapsed < 15) {
      return NextResponse.json(
        { error: "Must watch ad for at least 15 seconds" },
        { status: 400 }
      );
    }

    // Get campaign details
    const campaign = await prisma.adCampaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign || !campaign.isActive || campaign.remainingImpressions <= 0) {
      return NextResponse.json(
        { error: "Ad is no longer available" },
        { status: 400 }
      );
    }

    // Check if user already clicked this ad
    const existingClick = await prisma.adClick.findUnique({
      where: {
        userId_campaignId: {
          userId,
          campaignId,
        },
      },
    });

    // For premium users watching premium ads, verify the code
    let verifiedCorrectly = true;
    if (user.membershipType === "PREMIUM" && campaign.adType === "PREMIUM") {
      if (
        !existingClick?.verificationCode ||
        verificationCode !== existingClick.verificationCode
      ) {
        return NextResponse.json(
          { error: "Invalid verification code" },
          { status: 400 }
        );
      }
    }

    // If already clicked and earned, don't allow double earning
    if (existingClick && existingClick.earnedAmount.toNumber() > 0) {
      return NextResponse.json(
        { error: "Ad already clicked" },
        { status: 400 }
      );
    }

    // Calculate reward
    const reward = calculateAdReward(campaign.adType, user.membershipType);

    // Process the click and reward in a transaction
    await prisma.$transaction(async (tx) => {
      // Update or create ad click record
      await tx.adClick.upsert({
        where: {
          userId_campaignId: {
            userId,
            campaignId,
          },
        },
        update: {
          earnedAmount: reward,
          verifiedCorrectly,
          ip: req.headers.get("x-forwarded-for") || "unknown",
          userAgent: req.headers.get("user-agent") || "unknown",
        },
        create: {
          userId,
          campaignId,
          earnedAmount: reward,
          verifiedCorrectly,
          ip: req.headers.get("x-forwarded-for") || "unknown",
          userAgent: req.headers.get("user-agent") || "unknown",
        },
      });

      // Update user balance
      await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: reward } },
      });

      // Update campaign stats
      await tx.adCampaign.update({
        where: { id: campaignId },
        data: {
          remainingImpressions: { decrement: 1 },
          totalClicks: { increment: 1 },
        },
      });

      // Deduct cost from advertiser
      await tx.advertiserProfile.update({
        where: { userId: campaign.userId },
        data: {
          balance: { decrement: campaign.costPerClick },
        },
      });

      // Create transaction record for user earning
      await tx.transaction.create({
        data: {
          userId,
          type: "AD_EARNING",
          status: "COMPLETED",
          amount: reward,
          description: `Ad click reward - Campaign: ${campaign.title}`,
        },
      });
    });

    return NextResponse.json({
      success: true,
      earned: reward,
      message: `Successfully earned $${reward}`,
    });
  } catch (error) {
    console.error("Error processing ad click:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
