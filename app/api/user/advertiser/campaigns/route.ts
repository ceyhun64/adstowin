// app/api/user/advertiser/campaigns/route.ts
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// Helper function to calculate cost per click based on ad type
function getCostPerClick(adType: "NORMAL" | "PREMIUM"): number {
  return adType === "NORMAL" ? 0.005 : 0.02;
}

// GET - List user's campaigns
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Check if user has advertiser profile
    const advertiser = await prisma.advertiserProfile.findUnique({
      where: { userId },
    });

    if (!advertiser) {
      return NextResponse.json(
        { error: "Advertiser profile not found" },
        { status: 404 }
      );
    }

    // Get all campaigns for this advertiser
    const campaigns = await prisma.adCampaign.findMany({
      where: { userId: advertiser.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        targetUrl: true,
        imageUrl: true,
        adType: true,
        totalImpressions: true,
        remainingImpressions: true,
        costPerClick: true,
        totalClicks: true,
        isActive: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new campaign
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const {
      title,
      description,
      targetUrl,
      imageUrl,
      adType,
      totalImpressions,
    } = await req.json();

    // Validation
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!targetUrl || typeof targetUrl !== "string") {
      return NextResponse.json(
        { error: "Target URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(targetUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    if (!adType || !["NORMAL", "PREMIUM"].includes(adType)) {
      return NextResponse.json({ error: "Invalid ad type" }, { status: 400 });
    }

    if (
      !totalImpressions ||
      typeof totalImpressions !== "number" ||
      totalImpressions < 1000
    ) {
      return NextResponse.json(
        { error: "Minimum 1000 impressions required" },
        { status: 400 }
      );
    }

    // Calculate costs
    const costPerClick = getCostPerClick(adType);
    const totalCost = totalImpressions * costPerClick;

    // Get user and check balance from User table
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has sufficient balance (User.balance)
    const currentBalance = parseFloat(user.balance.toString());
    if (currentBalance < totalCost) {
      return NextResponse.json(
        {
          error: "Insufficient balance",
          required: totalCost,
          current: currentBalance,
          deficit: totalCost - currentBalance,
        },
        { status: 400 }
      );
    }

    // Get or create advertiser profile
    let advertiser = await prisma.advertiserProfile.findUnique({
      where: { userId },
    });

    if (!advertiser) {
      // Create advertiser profile if it doesn't exist
      advertiser = await prisma.advertiserProfile.create({
        data: {
          userId,
          balance: 0,
        },
      });
    }

    // Create campaign and deduct balance in a transaction
    const campaign = await prisma.$transaction(async (tx) => {
      // Create the campaign
      const newCampaign = await tx.adCampaign.create({
        data: {
          userId,
          title: title.trim(),
          description: description?.trim() || null,
          targetUrl: targetUrl.trim(),
          imageUrl: imageUrl?.trim() || null,
          adType,
          totalImpressions,
          remainingImpressions: totalImpressions,
          costPerClick,
          isActive: true,
        },
      });

      // Deduct cost from USER balance (not advertiser balance)
      await tx.user.update({
        where: { id: userId },
        data: {
          balance: { decrement: totalCost },
        },
      });

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId,
          type: "AD_EARNING",
          status: "COMPLETED",
          amount: -totalCost, // Negative amount to indicate spending
          description: `Campaign created: ${title.trim()} - ${totalImpressions} impressions`,
        },
      });

      return newCampaign;
    });

    return NextResponse.json({
      success: true,
      campaign: {
        id: campaign.id,
        title: campaign.title,
        adType: campaign.adType,
        totalImpressions: campaign.totalImpressions,
        costPerClick: parseFloat(campaign.costPerClick.toString()),
        totalCost,
      },
      message: "Campaign created successfully",
    });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}