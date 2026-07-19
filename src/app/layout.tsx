import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://chuanjing-max.com"),
  title: "MaxPlus - Premium Men's Enhancement Gel | Japanese Formula",
  description: "MaxPlus is a premium Japanese men's enhancement gel with natural ingredients. Extend intimacy, treat ED, and boost confidence. From $49.9.",
  keywords: "men's health, enhancement gel, Japanese formula, natural ingredients, ED treatment",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
