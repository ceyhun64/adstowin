import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
// Prisma'dan gelen enum tipini kullanıyoruz
import { UserRole } from "@/lib/generated/prisma";

interface RegisterRequestBody {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRole; // Enum tipini buraya atadık
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterRequestBody;
    const { name, surname, email, password, role } = body;

    // 1. Temel Alan Doğrulaması
    if (!name || !surname || !email || !password || !role) {
      return NextResponse.json(
        { error: "Lütfen tüm zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    // 2. Role Geçerlilik Kontrolü (Opsiyonel ama güvenlidir)
    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: "Geçersiz kullanıcı rolü." },
        { status: 400 }
      );
    }

    // 3. Kullanıcı zaten kayıtlı mı kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kullanımda." },
        { status: 400 }
      );
    }

    // 4. Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12);

    // 5. Kullanıcıyı oluştur
    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role, // İstemciden gelen ADMIN, USER veya ADVERTISER değeri
      },
    });

    // 6. Başarılı yanıt (Şifre hariç verileri dönüyoruz)
    return NextResponse.json(
      {
        message: "Kayıt başarıyla tamamlandı.",
        user: {
          id: newUser.id,
          name: newUser.name,
          surname: newUser.surname,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    return NextResponse.json(
      { error: "Sunucu hatası. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
