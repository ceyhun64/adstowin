import { DefaultSession } from "next-auth";
import { UserRole } from "@/lib/generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      surname: string;
      email: string;
      role: UserRole;
      membershipType: "FREE" | "PREMIUM";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: UserRole;
    membershipType: "FREE" | "PREMIUM";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: UserRole;
    membershipType: "FREE" | "PREMIUM";
  }
}
