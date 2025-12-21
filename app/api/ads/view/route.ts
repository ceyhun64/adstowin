// app/api/ads/view/route.ts
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
    const { campaignId } = await req.json();

    if (!campaignId || typeof campaignId !== "number") {
      return NextResponse.json(
        { error: "Invalid campaign ID" },
        { status: 400 }
      );
    }

    // Check if campaign exists and is active
    const campaign = await prisma.adCampaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    if (!campaign.isActive || campaign.remainingImpressions <= 0) {
      return NextResponse.json(
        { error: "Campaign not available" },
        { status: 400 }
      );
    }

    // Check if user already viewed this ad
    const existing = await prisma.adView.findUnique({
      where: {
        userId_campaignId: {
          userId,
          campaignId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ ok: true, alreadyViewed: true });
    }

    // Create ad view record
    await prisma.adView.create({
      data: {
        userId,
        campaignId,
      },
    });

    return NextResponse.json({ ok: true, alreadyViewed: false });
  } catch (error) {
    console.error("Error recording ad view:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
