import type React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CreativeDotBackground } from "@/components/creative-dot-background";
import { LanguageSwitcher } from "@/components/legal/language-switcher";
import { isValidLang } from "@/lib/legal";
import { notFound } from "next/navigation";

export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string; app: string }>;
}) {
  const { lang } = await params;

  if (!isValidLang(lang)) {
    notFound();
  }

  return (
    <div>
      <CreativeDotBackground />
      <div className="min-h-screen bg-white/70">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <ChevronLeft size={16} />
              {lang === "ja" ? "トップへ戻る" : "Back to Home"}
            </Link>
            <LanguageSwitcher currentLang={lang} />
          </div>
          <main lang={lang}>{children}</main>
          <footer className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p className="font-bold">
              {lang === "ja" ? "お問い合わせ窓口" : "Contact"}
            </p>
            <p>
              {lang === "ja"
                ? "〒150-0043 東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F-C"
                : "1-10-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043, Japan"}
            </p>
            <p>
              {lang === "ja" ? "株式会社Palpa" : "Palpa Inc."}
            </p>
            <p>info@palpa.co.jp</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
