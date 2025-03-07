"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // サーバーサイドレンダリング時は実行しない
    if (typeof window === "undefined") return;

    // モバイルデバイスかどうかを判定
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 初期チェック
    checkIsMobile();

    // リサイズ時にも再チェック
    window.addEventListener("resize", checkIsMobile);

    // モバイルでない場合のみカーソルを非表示に
    if (!isMobile) {
      document.body.style.cursor = "none";
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [isMobile]);

  // モバイルの場合は何も表示しない
  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white mix-blend-difference pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.5,
        }}
      />
    </>
  );
};

export default CustomCursor;
