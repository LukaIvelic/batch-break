import { Subtitle, Title } from "@/src/components/features";

export default function ArticlePage() {
  return (
    <div className="h-full max-w-[1000px] mx-auto">
      <div>
        <Title>Draft Shipments</Title>
        <Subtitle>Shipments that were discarded from production</Subtitle>
      </div>
    </div>
  );
}
