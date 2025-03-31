import { CreativeDotBackground } from "@/components/creative-dot-background";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "生成AIと次世代開発プロセスの関連を考える",
  description:
    "AIビジネスガイド：生成AIを活用した業務効率化と開発プロセスの進化について解説します。",
  openGraph: {
    title: "生成AIと次世代開発プロセスの関連を考える",
    description:
      "AIビジネスガイド：生成AIを活用した業務効率化と開発プロセスの進化について解説します。",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/docs/ai-business-guide/thumbnail.jpg`,
        width: 1200,
        height: 630,
        alt: "AI業務活用の可能性",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "生成AIと次世代開発プロセスの関連を考える",
    description:
      "AIビジネスガイド：生成AIを活用した業務効率化と開発プロセスの進化について解説します。",
    images: [
      `${process.env.NEXT_PUBLIC_APP_URL}/docs/ai-business-guide/thumbnail.jpg`,
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <CreativeDotBackground />
      {children}
    </div>
  );
}
