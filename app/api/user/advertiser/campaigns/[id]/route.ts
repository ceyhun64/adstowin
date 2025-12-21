// app/api/user/advertiser/campaigns/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// GET - Get single campaign details
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await params (Next.js 15+ requirement)
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const campaignId = parseInt(id);

    if (isNaN(campaignId)) {
      return NextResponse.json(
        { error: "Invalid campaign ID" },
        { status: 400 }
      );
    }

    // Get campaign with all details
    const campaign = await prisma.adCampaign.findUnique({
      where: { id: campaignId },
      include: {
        advertiser: {
          select: {
            userId: true,
          },
        },
        adViews: {
          select: {
            id: true,
            userId: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        adClicks: {
          select: {
            id: true,
            userId: true,
            earnedAmount: true,
            verifiedCorrectly: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Check ownership
    if (campaign.advertiser.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Calculate stats
    const viewCount = await prisma.adView.count({
      where: { campaignId },
    });

    const clickCount = await prisma.adClick.count({
      where: { campaignId },
    });

    const totalSpent = await prisma.adClick.aggregate({
      where: { campaignId },
      _sum: {
        earnedAmount: true,
      },
    });

    return NextResponse.json({
      ...campaign,
      stats: {
        views: viewCount,
        clicks: clickCount,
        totalSpent: totalSpent._sum.earnedAmount || 0,
        clickRate:
          viewCount > 0 ? ((clickCount / viewCount) * 100).toFixed(2) : "0.00",
        remainingBudget:
          campaign.remainingImpressions *
          parseFloat(campaign.costPerClick.toString()),
      },
    });
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Update campaign (pause/resume, update details)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await params
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const campaignId = parseInt(id);

    if (isNaN(campaignId)) {
      return NextResponse.json(
        { error: "Invalid campaign ID" },
        { status: 400 }
      );
    }

    const { isActive, title, description, targetUrl, imageUrl } =
      await req.json();

    // Get campaign and verify ownership
    const campaign = await prisma.adCampaign.findUnique({
      where: { id: campaignId },
      include: {
        advertiser: {
          select: { userId: true },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    if (campaign.advertiser.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Build update data
    const updateData: any = {};

    if (typeof isActive === "boolean") {
      updateData.isActive = isActive;
    }

    if (title && typeof title === "string") {
      updateData.title = title.trim();
    }

    if (description !== undefined) {
      updateData.description = description?.trim() || null;
    }

    if (targetUrl && typeof targetUrl === "string") {
      // Validate URL
      try {
        new URL(targetUrl);
        updateData.targetUrl = targetUrl.trim();
      } catch {
        return NextResponse.json(
          { error: "Invalid URL format" },
          { status: 400 }
        );
      }
    }

    if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl?.trim() || null;
    }

    // Update campaign
    const updated = await prisma.adCampaign.update({
      where: { id: campaignId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      campaign: updated,
      message: "Campaign updated successfully",
    });
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete campaign (soft delete by deactivating)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await params
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const campaignId = parseInt(id);

    if (isNaN(campaignId)) {
      return NextResponse.json(
        { error: "Invalid campaign ID" },
        { status: 400 }
      );
    }

    // Get campaign and verify ownership
    const campaign = await prisma.adCampaign.findUnique({
      where: { id: campaignId },
      include: {
        advertiser: {
          select: { userId: true },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    if (campaign.advertiser.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Deactivate campaign instead of deleting
    await prisma.adCampaign.update({
      where: { id: campaignId },
      data: {
        isActive: false,
        endDate: new Date(),
      },
    });

    // Optionally refund remaining impressions
    const remainingBudget =
      campaign.remainingImpressions *
      parseFloat(campaign.costPerClick.toString());

    if (remainingBudget > 0) {
      await prisma.$transaction(async (tx) => {
        // Refund to advertiser balance
        await tx.advertiserProfile.update({
          where: { userId },
          data: {
            balance: { increment: remainingBudget },
          },
        });

        // Create refund transaction
        await tx.transaction.create({
          data: {
            userId,
            type: "DEPOSIT",
            status: "COMPLETED",
            amount: remainingBudget,
            description: `Campaign cancelled - Refund for ${campaign.remainingImpressions} unused impressions`,
          },
        });
      });
    }

    return NextResponse.json({
      success: true,
      refunded: remainingBudget,
      message: "Campaign cancelled successfully",
    });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
