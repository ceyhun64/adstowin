// app/api/ads/route.ts
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      // Return empty array for unauthenticated users
      return NextResponse.json([]);
    }

    const userId = parseInt(session.user.id);

    // Get user details to check membership type
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { membershipType: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get campaigns user has already clicked
    const clicked = await prisma.adClick.findMany({
      where: { userId },
      select: { campaignId: true },
    });

    const clickedIds = clicked.map((c) => c.campaignId);

    // Build query based on membership type
    const whereClause: any = {
      isActive: true,
      remainingImpressions: { gt: 0 },
      id: { notIn: clickedIds },
    };

    // Premium users can see both NORMAL and PREMIUM ads
    // Free users can only see NORMAL ads
    if (user.membershipType === "PREMIUM") {
      whereClause.adType = { in: ["NORMAL", "PREMIUM"] };
    } else {
      whereClause.adType = "NORMAL";
    }

    const ads = await prisma.adCampaign.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: 10, // Get up to 10 ads
      select: {
        id: true,
        title: true,
        description: true,
        targetUrl: true,
        imageUrl: true,
        adType: true,
        totalImpressions: true,
        remainingImpressions: true,
        totalClicks: true,
        createdAt: true,
      },
    });

    return NextResponse.json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
