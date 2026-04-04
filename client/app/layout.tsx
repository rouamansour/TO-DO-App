import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        <main className="max-w-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
