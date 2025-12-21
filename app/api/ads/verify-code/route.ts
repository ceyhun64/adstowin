// app/api/ads/verify-code/route.ts
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Get user details to check membership
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { membershipType: true },
    });

    if (!user || user.membershipType !== "PREMIUM") {
      return NextResponse.json(
        { error: "Premium membership required" },
        { status: 403 }
      );
    }

    const { campaignId } = await req.json();

    if (!campaignId || typeof campaignId !== "number") {
      return NextResponse.json(
        { error: "Invalid campaign ID" },
        { status: 400 }
      );
    }

    // Verify that the user has viewed the ad
    const adView = await prisma.adView.findUnique({
      where: {
        userId_campaignId: {
          userId,
          campaignId,
        },
      },
    });

    if (!adView) {
      return NextResponse.json(
        { error: "Ad must be viewed first" },
        { status: 400 }
      );
    }

    // Check if ad was viewed at least 10 seconds ago (as per requirements)
    const viewedAt = new Date(adView.createdAt);
    const now = new Date();
    const secondsElapsed = (now.getTime() - viewedAt.getTime()) / 1000;

    if (secondsElapsed < 10) {
      return NextResponse.json(
        { error: "Must wait 10 seconds before verification code appears" },
        { status: 400 }
      );
    }

    // Generate random code between 0-99
    const code = Math.floor(Math.random() * 100);

    // Store or update the verification code in AdClick
    const existingClick = await prisma.adClick.findUnique({
      where: {
        userId_campaignId: {
          userId,
          campaignId,
        },
      },
    });

    if (existingClick) {
      await prisma.adClick.update({
        where: {
          userId_campaignId: {
            userId,
            campaignId,
          },
        },
        data: { verificationCode: code },
      });
    } else {
      await prisma.adClick.create({
        data: {
          userId,
          campaignId,
          verificationCode: code,
          earnedAmount: 0,
          ip: req.headers.get("x-forwarded-for") || "unknown",
          userAgent: req.headers.get("user-agent") || "unknown",
        },
      });
    }

    return NextResponse.json({ code });
  } catch (error) {
    console.error("Error generating verification code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
