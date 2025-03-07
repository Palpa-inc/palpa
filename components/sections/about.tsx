import {
  Rocket,
  Eye,
  Heart,
  Building2,
  MapPin,
  User,
  Calendar,
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-20">
      <div className="grid gap-12">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="relative inline-block text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              <span className="absolute -inset-1 block -skew-y-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-80"></span>
              <span className="relative text-white">Palpaについて</span>
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              私たちは、既存の枠組みにとらわれない自由な発想と創造性を大切にしています。
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Palpa（パルパ）とは、ペルーのナスカに広がる神秘的な地上絵が描かれた地域の名前です。
                人々を圧倒させるナスカの地上絵のように、私たちは人の心を動かす「まだ見ぬ景色」を生み出します。
              </p>
              <p className="text-muted-foreground">
                自由な発想・革新的なテクノロジーの力で、
                お客様のビジネスに新しいストーリーを描きます。
                私たちと共に、まだ誰も見たことのない未来を創造しましょう。
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="space-y-6">
              <AboutCard
                title="ミッション"
                description="既存の枠組みを超えた発想と創造で、お客様と社会に新しい価値を提供します。"
                gradientPosition="top-left"
                icon={<Rocket size={20} />}
              />
              <AboutCard
                title="ビジョン"
                description="クリエイティブな発想とテクノロジーの融合で、より自由で豊かな未来を創造します。"
                gradientPosition="bottom-right"
                icon={<Eye size={20} />}
              />
              <AboutCard
                title="バリュー"
                description="自由な発想、創造性、挑戦精神を大切にし、常に新しい可能性を追求します。"
                gradientPosition="bottom-left"
                icon={<Heart size={20} />}
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-12">
          <h3 className="text-2xl font-bold mb-8 text-center">会社概要</h3>
          <div className="max-w-xl mx-auto">
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <CompanyInfoItem
                icon={<Building2 size={20} />}
                label="会社名"
                value="株式会社Palpa"
              />
              <CompanyInfoItem
                icon={<MapPin size={20} />}
                label="本社所在地"
                value={
                  "〒150-0043\n東京都渋谷区道玄坂1-10-8 渋谷道玄坂東急ビル2F−C"
                }
              />
              <CompanyInfoItem
                icon={<User size={20} />}
                label="代表取締役"
                value="木次 大樹"
              />
              <CompanyInfoItem
                icon={<Calendar size={20} />}
                label="設立"
                value="2023年7月"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface AboutCardProps {
  title: string;
  description: string;
  gradientPosition: "top-left" | "bottom-right" | "bottom-left";
  icon?: React.ReactNode;
}

function AboutCard({
  title,
  description,
  gradientPosition,
  icon,
}: AboutCardProps) {
  const gradientClasses = {
    "top-left": "-top-10 -left-10",
    "bottom-right": "-bottom-10 -right-10",
    "bottom-left": "-bottom-5 -left-5",
  };

  return (
    <div className="relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`absolute ${gradientClasses[gradientPosition]} h-20 w-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-10 blur-xl`}
      ></div>
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="text-primary">{icon}</div>}
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

interface CompanyInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function CompanyInfoItem({ icon, label, value }: CompanyInfoItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex-1">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        <div className="font-medium text-sm whitespace-pre-line">{value}</div>
      </div>
    </div>
  );
}
