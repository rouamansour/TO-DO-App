"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbar =
    pathname.startsWith("/auth/signin") || pathname.startsWith("/auth/signup");
  if (hideNavbar) return null;
  return <Navbar />;
}