"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Call backend to notify logout 
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    router.replace("/auth/signin");
  }, [router]);

  return <p>Logging out...</p>;
}
