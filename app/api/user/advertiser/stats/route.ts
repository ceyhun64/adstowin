// app/api/user/advertiser/stats/route.ts
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

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

    // Get all campaigns
    const allCampaigns = await prisma.adCampaign.findMany({
      where: { userId },
    });

    // Calculate overall stats
    const totalCampaigns = allCampaigns.length;
    const activeCampaigns = allCampaigns.filter((c) => c.isActive).length;

    const totalImpressions = allCampaigns.reduce(
      (sum, c) => sum + c.totalImpressions,
      0
    );

    const remainingImpressions = allCampaigns.reduce(
      (sum, c) => sum + c.remainingImpressions,
      0
    );

    const totalClicks = allCampaigns.reduce((sum, c) => sum + c.totalClicks, 0);

    const deliveredImpressions = totalImpressions - remainingImpressions;

    // Calculate total spent
    const totalSpentResult = await prisma.adClick.aggregate({
      where: {
        campaignId: {
          in: allCampaigns.map((c) => c.id),
        },
      },
      _sum: {
        earnedAmount: true,
      },
    });

    const totalSpent = totalSpentResult._sum.earnedAmount
      ? parseFloat(totalSpentResult._sum.earnedAmount.toString())
      : 0;

    // Calculate remaining budget
    const remainingBudget = allCampaigns.reduce((sum, c) => {
      return (
        sum + c.remainingImpressions * parseFloat(c.costPerClick.toString())
      );
    }, 0);

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentClicks = await prisma.adClick.count({
      where: {
        campaignId: {
          in: allCampaigns.map((c) => c.id),
        },
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    const recentViews = await prisma.adView.count({
      where: {
        campaignId: {
          in: allCampaigns.map((c) => c.id),
        },
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Top performing campaigns
    const topCampaigns = allCampaigns
      .sort((a, b) => b.totalClicks - a.totalClicks)
      .slice(0, 5)
      .map((c) => ({
        id: c.id,
        title: c.title,
        adType: c.adType,
        totalClicks: c.totalClicks,
        totalImpressions: c.totalImpressions,
        remainingImpressions: c.remainingImpressions,
        isActive: c.isActive,
      }));

    // Campaign performance by type
    const normalCampaigns = allCampaigns.filter((c) => c.adType === "NORMAL");
    const premiumCampaigns = allCampaigns.filter((c) => c.adType === "PREMIUM");

    const normalClicks = normalCampaigns.reduce(
      (sum, c) => sum + c.totalClicks,
      0
    );
    const premiumClicks = premiumCampaigns.reduce(
      (sum, c) => sum + c.totalClicks,
      0
    );

    // Daily stats for the last 7 days
    const dailyStats = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const dayClicks = await prisma.adClick.count({
        where: {
          campaignId: {
            in: allCampaigns.map((c) => c.id),
          },
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      });

      const dayViews = await prisma.adView.count({
        where: {
          campaignId: {
            in: allCampaigns.map((c) => c.id),
          },
          createdAt: {
            gte: date,
            lt: nextDate,
          },
        },
      });

      dailyStats.push({
        date: date.toISOString().split("T")[0],
        views: dayViews,
        clicks: dayClicks,
      });
    }

    return NextResponse.json({
      overview: {
        balance: parseFloat(advertiser.balance.toString()),
        totalCampaigns,
        activeCampaigns,
        totalImpressions,
        deliveredImpressions,
        remainingImpressions,
        totalClicks,
        totalSpent,
        remainingBudget,
        averageCTR:
          deliveredImpressions > 0
            ? ((totalClicks / deliveredImpressions) * 100).toFixed(2)
            : "0.00",
      },
      recentActivity: {
        last7Days: {
          clicks: recentClicks,
          views: recentViews,
        },
      },
      campaignsByType: {
        normal: {
          count: normalCampaigns.length,
          clicks: normalClicks,
        },
        premium: {
          count: premiumCampaigns.length,
          clicks: premiumClicks,
        },
      },
      topCampaigns,
      dailyStats,
    });
  } catch (error) {
    console.error("Error fetching advertiser stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
