import { Metadata } from "next";
import Docs from "../docs";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CreativeDotBackground } from "@/components/creative-dot-background";
export const metadata: Metadata = {
  title: "株式会社Palpa | プライバシーポリシー",
};

async function getPrivacyData() {
  const isDev = process.env.NODE_ENV === "development";
  const res = isDev
    ? await fetch("http://localhost:3001/docs/privacy.json")
    : await fetch("https://palpa.co.jp/docs/privacy.json");
  const data = await res.json();
  return data.terms;
}

export default async function PrivacyPolicy() {
  const termsData = await getPrivacyData();

  return (
    <div>
      <CreativeDotBackground />
      <div className="p-4 flex flex-col items-center justify-center bg-white/70 text-gray-800">
        <div className="flex items-center gap-4 p-4 text-left max-w-xl w-full">
          <Link
            href="/"
            className="text-gray-800 cursor-pointer hover:no-underline"
          >
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
        </div>
        <Docs termsData={termsData} />
      </div>
    </div>
  );
}
