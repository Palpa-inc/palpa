import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="container flex h-16 items-center justify-between py-6 border-b border-gray-300/40 bg-background/40 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="flex flex-row items-center space-x-2">
        <Image
          src="/icon.png"
          alt="Palpa"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="relative text-xl font-bold tracking-tight">Palpa</span>
      </Link>
      <nav className="hidden space-x-6 md:flex flex-row w-full justify-end pr-8">
        <Link
          href="#services"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          サービス
        </Link>
        <Link
          href="#about"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          会社概要
        </Link>
      </nav>
      <Button className="relative overflow-hidden rounded-full" asChild>
        <Link href="#contact">
          <span className="relative z-10 px-2">お問い合わせ</span>
          <span className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 opacity-90"></span>
        </Link>
      </Button>
    </header>
  );
}
