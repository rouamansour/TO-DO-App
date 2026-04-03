import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-blue-50 via-white to-pink-50 min-h-screen">
        <NavbarWrapper />
        <main className="max-w-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
