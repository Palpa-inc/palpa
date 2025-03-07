import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/icon.png"
              alt="Palpa"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Palpa
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Palpa. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap gap-2 sm:gap-6">
          <Link
            href="#services"
            className="text-sm font-medium transition-colors hover:text-primary"
            scroll={false}
          >
            サービス
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium transition-colors hover:text-primary"
            scroll={false}
          >
            会社概要
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium transition-colors hover:text-primary"
            scroll={false}
          >
            お問い合わせ
          </Link>
          <Link
            href="/privacypolicy"
            className="text-sm font-medium transition-colors hover:text-primary"
            scroll={false}
          >
            プライバシーポリシー
          </Link>
        </nav>
      </div>
    </footer>
  );
}
