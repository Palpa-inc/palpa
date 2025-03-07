import { CheckCircle, Code, MessageSquare } from "lucide-react";

export function ServicesSection() {
  return (
    <section id="services" className="py-4 md:py-16 lg:py-4">
      <div className="max-w-[59rem] space-y-4">
        <h2 className="relative inline-block text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
          <span className="absolute -inset-1 block -skew-y-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-80"></span>
          <span className="relative text-white">サービス</span>
        </h2>
        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          既存の枠組みを超えた、クリエイティブなソリューションを提供します。
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 py-8 lg:grid-cols-3">
        <ServiceCard
          icon={<MessageSquare className="h-6 w-6 text-white" />}
          title="コンサルティング"
          description="従来の常識にとらわれない、革新的なビジネス戦略を共に創り上げます。"
          features={[
            "クリエイティブ戦略",
            "イノベーション支援",
            "組織文化変革",
          ]}
        />
        <ServiceCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white"
            >
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            </svg>
          }
          title="Web3事業支援"
          description="次世代のデジタル体験を創造し、Web3の可能性を最大限に引き出します。"
          features={["クリエイティブNFT", "コミュニティ構築", "メタバース戦略"]}
        />
        <ServiceCard
          icon={<Code className="h-6 w-6 text-white" />}
          title="システム開発支援"
          description="テクノロジーの枠を超えた、革新的なシステム開発を実現します。"
          features={[
            "クリエイティブUI/UX",
            "革新的アーキテクチャ",
            "アジャイル開発支援",
          ]}
        />
      </div>
    </section>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all duration-700 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-yellow-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 bg-opacity-10">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
