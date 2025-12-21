// app/api/user/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Session kontrolü
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Oturum bulunamadı" }, { status: 401 });
    }

    // Kullanıcı bilgilerini veritabanından çek
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        role: true,
        membershipType: true,
        balance: true,
        tkriptoBalance: true,
        spinCount: true,
        monthlySpinCount: true,
        premiumTickets: true,
        normalTickets: true,
        lastSpinAt: true,
        adsRemoved: true,
        premiumStartDate: true,
        premiumEndDate: true,
        language: true,
        darkMode: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Premium durumu kontrolü
    const isPremium =
      user.membershipType === "PREMIUM" &&
      user.premiumEndDate &&
      new Date(user.premiumEndDate) > new Date();

    // Response formatı
    return NextResponse.json({
      user: {
        id: user.id.toString(),
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        isPremium: isPremium,
        membershipType: user.membershipType,
        balance: parseFloat(user.balance.toString()),
        tkripto: parseFloat(user.tkriptoBalance.toString()),
        spinCount: user.spinCount,
        monthlySpinCount: user.monthlySpinCount,
        premiumTickets: user.premiumTickets,
        normalTickets: user.normalTickets,
        lastSpinAt: user.lastSpinAt?.toISOString() || null,
        adsRemoved: user.adsRemoved,
        premiumStartDate: user.premiumStartDate?.toISOString() || null,
        premiumEndDate: user.premiumEndDate?.toISOString() || null,
        language: user.language,
        darkMode: user.darkMode,
        createdAt: user.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
