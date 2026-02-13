import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Math Tug of War",
  description: "Educational math game for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-white">
        {children}
      </body>
    </html>
  );
}
