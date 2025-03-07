import React from "react";

interface Term {
  title: string;
  details: string | string[];
}

type Data = {
  termsData: Term[];
};

const Docs: React.FC<Data> = ({ termsData }) => {
  return (
    <div className="flex flex-col items-start text-gray-700 max-w-xl text-sm p-4 pt-0">
      <>
        {termsData ? (
          termsData.map((term, index) => (
            <div
              key={index}
              className="flex flex-col items-start text-sm pt-4 w-full"
            >
              <p className="font-bold text-base">{term.title}</p>
              {Array.isArray(term.details) ? (
                <ul className="list-disc pl-5 w-full">
                  {term.details.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>
                      <p>{bullet}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{term.details}</p>
              )}
            </div>
          ))
        ) : (
          <p>再度読み込んでください</p>
        )}
      </>
      <p className="font-bold pt-8">お問い合わせ窓口</p>
      <p>本利用規約に関するお問い合わせは，下記の窓口までお願いいたします。</p>
      <p>住所：〒150-0043　東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F−C</p>
      <p>社名：株式会社Palpa</p>
      <p>担当部署:本部</p>
      <p>お問い合わせ先 info@palpa.co.jp</p>
    </div>
  );
};

export default Docs;
