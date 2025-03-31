const fs = require("fs");
const path = require("path");

const splitGuide = () => {
  // 元のJSONファイルを読み込む
  const sourcePath = path.join(
    process.cwd(),
    "public",
    "docs",
    "ai-business-guide.json"
  );
  const targetDir = path.join(
    process.cwd(),
    "public",
    "docs",
    "ai-business-guide"
  );

  // ディレクトリが存在しない場合は作成
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // JSONデータを読み込む
  const data = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

  // 各チャプターを個別のファイルに保存
  const chapterFiles = data.map((chapter: any) => {
    const filename = `chapter${chapter.id}.json`;
    const filePath = path.join(targetDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(chapter, null, 2));
    return filename;
  });

  // インデックスファイルを作成
  const indexPath = path.join(targetDir, "index.json");
  fs.writeFileSync(indexPath, JSON.stringify(chapterFiles, null, 2));

  console.log("Guide successfully split into chapters!");
};

splitGuide();
