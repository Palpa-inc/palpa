import React, { JSX } from "react";
import fs from "fs";
import path from "path";
import LinkPreviewCard from "@/components/LinkPreviewCard"; // Import the new component
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// JSONデータの型定義
interface Point {
  points?: string[];
}

interface Subsection extends Point {
  id: string;
  title: string;
  content: string[];
  image?: string; // Optional image property
}

interface Section extends Point {
  id: string;
  title: string;
  content?: string[]; // Optional content at section level
  subsections?: Subsection[];
  image?: string; // Optional image property
}

interface Chapter {
  id: string;
  title: string;
  sections: Section[];
  references?: string[]; // Optional references property
  footer?: string; // Optional footer property
}

type GuideData = Chapter[];

// 型定義を追加
interface Author {
  name: string;
  avatar: string;
}

interface GuideMetadata {
  publishedAt: string;
  lastUpdated: string;
  author: Author;
}

interface IndexData {
  metadata: GuideMetadata;
  chapters: string[];
}

// ポイント（箇条書き）をレンダリングするヘルパーコンポーネント
const PointsList: React.FC<{ points?: string[] }> = ({ points }) => {
  if (!points || points.length === 0) {
    return null;
  }
  return (
    <blockquote className="my-4 p-4 bg-gray-50 border-l-4 border-gray-300">
      <h5 className="font-bold mb-2">本章のポイント</h5>
      <ul className="list-disc pl-4">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </blockquote>
  );
};

// コンテンツ（段落またはリスト）をレンダリングするヘルパー関数
const renderContent = (content: string[]) => {
  const items: JSX.Element[] = [];
  let currentList: string[] = [];
  let isInList = false;
  let isOrderedList = false;

  content.forEach((item, index) => {
    // コードブロックの判定
    if (item.startsWith("```")) {
      // リストが進行中の場合は、先にリストを閉じる
      if (isInList) {
        items.push(
          isOrderedList ? (
            <ol key={`list-${index}`} className="list-decimal pl-6">
              {currentList.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ol>
          ) : (
            <ul key={`list-${index}`} className="list-disc pl-6">
              {currentList.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ul>
          )
        );
        currentList = [];
        isInList = false;
      }

      // コードブロックの内容を取得（```を除去）
      const codeContent = item.slice(3, -3).trim();
      items.push(
        <pre key={index} className="bg-gray-900 p-4 rounded overflow-x-auto">
          <code>{codeContent}</code>
        </pre>
      );
      return;
    }

    // 番号付きリストの判定
    if (item.match(/^\d+\.\s/)) {
      if (!isInList) {
        isInList = true;
        isOrderedList = true;
      }
      currentList.push(item.replace(/^\d+\.\s/, ""));
      return;
    }

    // 箇条書きリストの判定
    if (item.match(/^(\*|-)\s/)) {
      if (!isInList) {
        isInList = true;
        isOrderedList = false;
      }
      currentList.push(item.replace(/^(\*|-)\s/, ""));
      return;
    }

    // リストが進行中の場合は、先にリストを閉じる
    if (isInList) {
      items.push(
        isOrderedList ? (
          <ol key={`list-${index}`} className="list-decimal pl-6">
            {currentList.map((listItem, i) => (
              <li key={i}>{listItem}</li>
            ))}
          </ol>
        ) : (
          <ul key={`list-${index}`} className="list-disc pl-6">
            {currentList.map((listItem, i) => (
              <li key={i}>{listItem}</li>
            ))}
          </ul>
        )
      );
      currentList = [];
      isInList = false;
    }

    // 通常の段落
    items.push(<p key={index}>{item}</p>);
  });

  // 最後のリストが閉じられていない場合は閉じる
  if (isInList) {
    items.push(
      isOrderedList ? (
        <ol key="list-final" className="list-decimal pl-6">
          {currentList.map((listItem, i) => (
            <li key={i}>{listItem}</li>
          ))}
        </ol>
      ) : (
        <ul key="list-final" className="list-disc pl-6">
          {currentList.map((listItem, i) => (
            <li key={i}>{listItem}</li>
          ))}
        </ul>
      )
    );
  }

  return items;
};

const AiBusinessGuidePage = () => {
  // JSONファイルの読み込み方法を変更
  const chaptersPath = path.join(
    process.cwd(),
    "public",
    "docs",
    "ai-business-guide"
  );
  let guideData: GuideData = [];
  let metadata: GuideMetadata | null = null;
  let errorLoading = false;

  try {
    // インデックスファイルを読み込む
    const indexPath = path.join(chaptersPath, "index.json");
    const indexContent = fs.readFileSync(indexPath, "utf8");
    const indexData: IndexData = JSON.parse(indexContent);
    metadata = indexData.metadata;

    // 各チャプターファイルを読み込んで結合
    guideData = indexData.chapters.map((filename: string) => {
      const filePath = path.join(chaptersPath, filename);
      const content = fs.readFileSync(filePath, "utf8");
      return JSON.parse(content);
    });
  } catch (error) {
    console.error("Error reading or parsing guide data:", error);
    errorLoading = true;
  }

  if (errorLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-red-500">
          ガイドデータの読み込み中にエラーが発生しました。
        </p>
      </div>
    );
  }

  // 目次データを生成
  const tableOfContents = guideData.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    sections: chapter.sections.map((section) => ({
      id: section.id,
      title: section.title,
    })),
  }));

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <article className="bg-white border pt-6 px-4 sm:p-8 rounded-3xl">
        <div className="relative w-full h-[360px] mb-4 -p-4">
          <Image
            src="/docs/ai-business-guide/thumbnail.jpg"
            alt="AI業務活用の可能性"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold mb-4 py-2">
          生成AIと次世代開発プロセスの関連を考える
        </h1>
        {metadata && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm mb-8">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage
                  src={metadata.author.avatar}
                  alt={metadata.author.name}
                  className="object-cover"
                />
                <AvatarFallback>
                  {metadata.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">執筆者</span>
                <span className="font-medium text-base sm:text-sm">
                  {metadata.author.name}
                </span>
              </div>
            </div>
            <div className="text-gray-500 text-sm sm:border-l sm:border-gray-200 sm:pl-6">
              <p>執筆日: {metadata.publishedAt}</p>
              {metadata.lastUpdated !== metadata.publishedAt && (
                <p>最終更新日: {metadata.lastUpdated}</p>
              )}
            </div>
          </div>
        )}

        {/* 目次 */}
        <nav className="bg-gray-50 p-4 rounded-lg prose">
          <h2>目次</h2>
          <ul>
            {tableOfContents.map((chapter) => (
              <li key={chapter.id}>
                <a href={`#chapter-${chapter.id}`}>
                  {chapter.id}. {chapter.title}
                </a>
                {chapter.sections.length > 0 && (
                  <ul>
                    {chapter.sections.map((section) => (
                      <li key={section.id}>
                        <a href={`#section-${section.id}`}>
                          {section.id} {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* 本文 */}
        {guideData.map((chapter) => (
          <section
            key={chapter.id}
            id={`chapter-${chapter.id}`}
            className="prose"
          >
            <h2 className="mt-12 mb-6 border-b pb-2">
              {chapter.id}. {chapter.title}
            </h2>
            {chapter.sections.map((section) => (
              <section
                key={section.id}
                id={`section-${section.id}`}
                className="mb-8"
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {section.id} {section.title}
                </h3>
                {section.content && renderContent(section.content)}
                {section.subsections &&
                  section.subsections.map((subsection) => (
                    <div
                      key={subsection.id}
                      id={`subsection-${subsection.id}`}
                      className="ml-4 mb-6"
                    >
                      <h4 className="text-xl font-semibold mb-2">
                        {subsection.id} {subsection.title}
                      </h4>
                      {renderContent(subsection.content)}
                      {/* TODO: 画像表示ロジック */}
                      {subsection.image && (
                        <p className="text-gray-500 italic my-2">
                          [画像: {subsection.image}]
                        </p>
                      )}
                      <PointsList points={subsection.points} />
                    </div>
                  ))}
                {/* TODO: セクションレベルの画像表示ロジック */}
                {section.image && (
                  <p className="text-gray-500 italic my-4">
                    [画像: {section.image}]
                  </p>
                )}
                <PointsList points={section.points} />
              </section>
            ))}
            {/* References */}
            {chapter.references && chapter.references.length > 0 && (
              <div className="mt-8 pt-4 border-t">
                <h4 className="text-lg font-semibold mb-2">参考文献</h4>
                <div className="space-y-1">
                  {" "}
                  {/* Changed ul to div */}
                  {chapter.references.map((ref, index) => (
                    <LinkPreviewCard key={index} url={ref} />
                  ))}
                </div>
              </div>
            )}
            {chapter.footer && (
              <>
                <hr className="my-8" />
                <p>
                  <small>{chapter.footer}</small>
                </p>
              </>
            )}
          </section>
        ))}
      </article>
    </div>
  );
};

export default AiBusinessGuidePage;
