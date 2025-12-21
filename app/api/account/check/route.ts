// app/api/account/check/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Session kontrolü
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ user: null }, { status: 200 });
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
        premiumStartDate: true,
        premiumEndDate: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Premium durumu kontrolü

    // Response formatı
    return NextResponse.json({
      user: {
        id: user.id.toString(),
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        membershipType: user.membershipType,
        balance: parseFloat(user.balance.toString()),
        tkripto: parseFloat(user.tkriptoBalance.toString()),
      },
    });
  } catch (error) {
    console.error("Account check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
