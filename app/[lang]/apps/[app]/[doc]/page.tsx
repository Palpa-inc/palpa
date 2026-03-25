import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getLegalDocument,
  getAvailableApps,
  getAvailableDocs,
  getAvailableLangs,
  isValidLang,
  isValidDoc,
  isValidApp,
  type Lang,
  type DocType,
} from "@/lib/legal";

type Params = { lang: string; app: string; doc: string };

export async function generateStaticParams() {
  const params: Params[] = [];
  for (const lang of getAvailableLangs()) {
    for (const app of getAvailableApps()) {
      for (const doc of getAvailableDocs()) {
        params.push({ lang, app, doc });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, app, doc } = await params;

  if (!isValidLang(lang) || !isValidDoc(doc) || !isValidApp(app)) {
    return {};
  }

  try {
    const { frontmatter } = await getLegalDocument(
      lang as Lang,
      app,
      doc as DocType
    );
    return {
      title: frontmatter.title,
      description: frontmatter.description,
    };
  } catch {
    return {};
  }
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, app, doc } = await params;

  if (!isValidLang(lang) || !isValidDoc(doc) || !isValidApp(app)) {
    notFound();
  }

  try {
    const { content, frontmatter } = await getLegalDocument(
      lang as Lang,
      app,
      doc as DocType
    );

    return (
      <article>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {frontmatter.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {lang === "ja" ? "最終更新日: " : "Last updated: "}
          {frontmatter.lastUpdated}
        </p>
        <div className="prose prose-gray max-w-none">{content}</div>
      </article>
    );
  } catch {
    notFound();
  }
}
