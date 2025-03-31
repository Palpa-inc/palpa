import { CreativeDotBackground } from "@/components/creative-dot-background";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <CreativeDotBackground />
      {children}
    </div>
  );
}
