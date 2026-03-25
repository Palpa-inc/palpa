"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LANGS = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
] as const;

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 text-sm">
      {LANGS.map((lang) => {
        const newPath = pathname.replace(`/${currentLang}/`, `/${lang.code}/`);
        const isActive = currentLang === lang.code;

        return isActive ? (
          <span key={lang.code} className="font-bold text-gray-900">
            {lang.label}
          </span>
        ) : (
          <Link
            key={lang.code}
            href={newPath}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            {lang.label}
          </Link>
        );
      })}
    </div>
  );
}
