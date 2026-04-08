import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <NavbarWrapper />
        <main className="max-w-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
