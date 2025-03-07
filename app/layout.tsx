import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LenisLayout from "./lenis";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palpa - コンサルティング・Web3事業支援・システム開発支援",
  description:
    "枠を超える発想と創造で、お客様のビジネスに新しい価値を提供します。",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/icon.png", sizes: "32x32" },
      { url: "/apple-icon.png", sizes: "180x180" },
    ],
    shortcut: "/shortcut-icon.png",
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <CustomCursor />
        <LenisLayout>{children}</LenisLayout>
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
