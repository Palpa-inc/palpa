import React from "react";
import ogs from "open-graph-scraper";

interface LinkPreviewCardProps {
  url: string;
}

// Helper function to truncate text
const truncateText = (text: string | undefined, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const LinkPreviewCard: React.FC<LinkPreviewCardProps> = async ({ url }) => {
  try {
    const { result } = await ogs({ url });

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block my-4 border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200 bg-white no-underline text-gray-800"
      >
        <div className="flex">
          {result.ogImage && result.ogImage.length > 0 && (
            <div className="flex-shrink-0 pl-4">
              <img
                src={result.ogImage[0].url}
                alt={result.ogTitle || "Link preview image"}
                className="h-16 w-32 sm:h-32 sm:w-64 object-cover rounded-sm"
              />
            </div>
          )}
          <div className="p-6 flex flex-col justify-between flex-grow min-w-0">
            <div>
              <div className="font-bold text-sm sm:text-base mb-2 line-clamp-3">
                {result.ogTitle || "No Title"}
              </div>
              {result.ogDescription && (
                <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                  {truncateText(result.ogDescription, 100)}
                </p>
              )}
            </div>
            <div className="text-gray-500 text-xs truncate">
              {result.ogSiteName || new URL(url).hostname}
            </div>
          </div>
        </div>
      </a>
    );
  } catch (error) {
    console.error(`OGP取得エラー: ${url}`, error);
    return <FallbackLinkCard url={url} />;
  }
};

// フォールバック用のシンプルなリンクカード
const FallbackLinkCard: React.FC<{ url: string }> = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-lg hover:bg-gray-50"
    >
      <div className="text-blue-600 hover:underline break-all">{url}</div>
    </a>
  );
};

export default LinkPreviewCard;
