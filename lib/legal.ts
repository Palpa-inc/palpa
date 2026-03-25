import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

export type Lang = "ja" | "en";
export type DocType = "terms" | "privacy";

export interface LegalFrontmatter {
  title: string;
  description: string;
  lastUpdated: string;
}

const COMPANY = {
  companyName: { ja: "株式会社Palpa", en: "Palpa Inc." },
  address: {
    ja: "〒150-0043 東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F-C",
    en: "1-10-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043, Japan",
  },
  department: { ja: "本部", en: "Headquarters" },
  email: "info@palpa.co.jp",
} as const;

// アプリ追加はここにサービス名を足すだけ
const APP_SERVICES: Record<string, string> = {
  racoz: "ラコズ",
};

const AVAILABLE_LANGS: Lang[] = ["ja", "en"];
const AVAILABLE_DOCS: DocType[] = ["terms", "privacy"];

export function getAvailableApps() {
  return Object.keys(APP_SERVICES);
}

export function getAvailableLangs() {
  return AVAILABLE_LANGS;
}

export function getAvailableDocs() {
  return AVAILABLE_DOCS;
}

export function isValidLang(lang: string): lang is Lang {
  return AVAILABLE_LANGS.includes(lang as Lang);
}

export function isValidDoc(doc: string): doc is DocType {
  return AVAILABLE_DOCS.includes(doc as DocType);
}

export function isValidApp(app: string): boolean {
  return app in APP_SERVICES;
}

export async function getLegalDocument(lang: Lang, app: string, doc: DocType) {
  const serviceName = APP_SERVICES[app];
  if (!serviceName) throw new Error(`Unknown app: ${app}`);

  const filePath = path.join(
    process.cwd(),
    "content",
    "legal",
    "templates",
    lang,
    `${doc}.mdx`
  );
  const raw = await fs.readFile(filePath, "utf-8");

  const vars: Record<string, string> = {
    serviceName,
    companyName: COMPANY.companyName[lang],
    address: COMPANY.address[lang],
    department: COMPANY.department[lang],
    email: COMPANY.email,
  };

  // Replace {varName} placeholders in the entire source (including frontmatter)
  const source = raw.replace(
    /\{(\w+)\}/g,
    (match, key) => vars[key] ?? match
  );

  return compileMDX<LegalFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });
}

export const DOC_LABELS: Record<DocType, Record<Lang, string>> = {
  terms: { ja: "利用規約", en: "Terms of Service" },
  privacy: { ja: "プライバシーポリシー", en: "Privacy Policy" },
};
