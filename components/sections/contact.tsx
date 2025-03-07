"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { submitContactForm } from "@/lib/actions";

export function ContactSection() {
  const [isPending, startTransition] = useTransition();

  async function handleFormSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const result = await submitContactForm(formData);
        if (result.success) {
          toast.success("お問い合わせありがとうございました。");
        } else {
          toast.error("送信に失敗しました。");
        }
      } catch (error) {
        toast.error("エラーが発生しました。");
      }
    });
  }

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[59rem] space-y-4 text-center">
        <h2 className="relative inline-block text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          <span className="absolute -inset-1 block -skew-y-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-80"></span>
          <span className="relative text-white">お問い合わせ</span>
        </h2>
        <p className="mx-auto max-w-[36rem] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          新しいアイデアやプロジェクトについて、
          <br />
          お気軽にご相談ください。
        </p>
      </div>
      <div className="mx-auto max-w-[36rem] py-4">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 opacity-10 blur-md"></div>
          <form
            className="relative rounded-lg border bg-card p-6 shadow-sm"
            action={handleFormSubmit}
          >
            <div className="grid gap-4">
              <FormField
                id="name"
                name="name"
                label="お名前"
                placeholder="山田 太郎"
              />
              <FormField
                id="email"
                name="email"
                label="メールアドレス"
                type="email"
                placeholder="contact@palpa.co.jp"
              />
              <div className="grid gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  メッセージ
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="お問い合わせ内容をご記入ください"
                ></textarea>
              </div>
              <Button
                className="relative overflow-hidden rounded-full"
                type="submit"
                disabled={isPending}
              >
                <span className="relative z-10">
                  {isPending ? "送信中..." : "送信する"}
                </span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 opacity-90"></span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
}

function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
}: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
