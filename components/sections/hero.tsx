"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import hero from "@/public/hero.json";

export function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="relative inline-block">
            <span className="absolute -inset-1 block h-8 sm:h-12 mt-2 -skew-y-3 bg-gradient-to-r from-purple-600 to-pink-500 opacity-70"></span>
            <h1 className="relative text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              <span className="relative text-white">枠を超える</span>
              <div className="relative text-slate-700">発想と創造</div>
            </h1>
          </div>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            テクノロジーの力で人々・情報・システムを滑らかに繋ぎ合わせ、便利で快適な社会体験の実現を支援します
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="relative overflow-hidden rounded-full" asChild>
              <Link href="#services" className="group">
                <span className="relative z-10">サービスを見る</span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 opacity-90"></span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-dashed"
              asChild
            >
              <Link href="#contact">お問い合わせ</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center pt-12 sm:pt-0 max-w-md mx-auto sm:mx-0">
          <Lottie animationData={hero} loop={true} />
        </div>
      </div>
    </section>
  );
}
