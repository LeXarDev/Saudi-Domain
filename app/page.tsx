import DomainCheckerPage from "@/app/domain-checker-page";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0 grid-background opacity-50" />
      <div className="relative">
        <DomainCheckerPage />
      </div>
    </div>
  );
}