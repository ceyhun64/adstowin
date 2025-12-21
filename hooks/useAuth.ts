// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";

export interface AuthUser {
  name?: string;
  surname?: string;
  email?: string;
  role: string;
  membershipType: string;
  balance: number;
  tkripto: number;
  
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/account/check", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    loading,
  };
}
