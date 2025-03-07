"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition, useState } from "react";
import { submitContactForm } from "@/lib/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isFormValid =
    formData.name && formData.email && formData.message && isAgreed;

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

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
        console.log(error);
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
        <AnimatePresence>
          <motion.div
            layoutId="contact-container"
            className={
              isFullscreen
                ? "fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-0.5"
                : "relative"
            }
            transition={{
              type: "tween",
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1], // カスタムベジェ曲線
            }}
          >
            <motion.div
              layoutId="form-wrapper"
              className={isFullscreen ? "w-full h-full" : ""}
            >
              <motion.form
                layoutId="contact-form"
                className={`relative rounded-lg border bg-card p-6 px-5 shadow-sm ${
                  isFullscreen
                    ? "w-full min-h-screen rounded-none border-none"
                    : ""
                }`}
                action={handleFormSubmit}
              >
                <motion.div
                  layoutId="button-container"
                  className="relative flex justify-end mb-2"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="absolute -top-4 right-0 h-8 w-8"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {isFullscreen ? "最小化" : "全画面表示"}
                    </span>
                  </Button>
                </motion.div>
                <motion.div layoutId="form-fields" className="grid gap-4">
                  <motion.div layoutId="name-field">
                    <FormField
                      id={`name${isFullscreen ? "-fullscreen" : ""}`}
                      name="name"
                      label="お名前"
                      placeholder="山田 太郎"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  <motion.div layoutId="email-field">
                    <FormField
                      id={`email${isFullscreen ? "-fullscreen" : ""}`}
                      name="email"
                      label="メールアドレス"
                      type="email"
                      placeholder="contact@palpa.co.jp"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </motion.div>
                  <motion.div layoutId="message-field" className="grid gap-2">
                    <motion.label
                      layoutId="message-label"
                      htmlFor={`message${isFullscreen ? "-fullscreen" : ""}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      メッセージ
                    </motion.label>
                    <motion.textarea
                      layoutId="message-textarea"
                      id={`message${isFullscreen ? "-fullscreen" : ""}`}
                      name="message"
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="お問い合わせ内容をご記入ください"
                      value={formData.message}
                      onChange={handleInputChange}
                      style={{ minHeight: isFullscreen ? 300 : 150 }}
                    ></motion.textarea>
                  </motion.div>

                  <motion.div
                    layoutId="terms-container"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`terms${isFullscreen ? "-fullscreen" : ""}`}
                      checked={isAgreed}
                      onCheckedChange={(checked) =>
                        setIsAgreed(checked as boolean)
                      }
                    />
                    <motion.label
                      layoutId="terms-label"
                      htmlFor={`terms${isFullscreen ? "-fullscreen" : ""}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      弊社の
                      <a
                        href="/privacypolicy"
                        className="text-primary hover:underline"
                      >
                        プライバシーポリシー
                      </a>
                      に同意します
                    </motion.label>
                  </motion.div>

                  <motion.div
                    layoutId="submit-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="relative overflow-hidden rounded-full w-full"
                      type="submit"
                      disabled={isPending || !isFormValid}
                    >
                      <span className="relative z-10">
                        {isPending ? "送信中..." : "送信する"}
                      </span>
                      <span className="absolute inset-0 -z-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 opacity-90"></span>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
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
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
