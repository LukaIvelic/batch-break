import { Subtitle, Title } from "@/src/components/features";

export default function ArticlePage() {
  return (
    <div className="h-full max-w-[1000px] mx-auto">
      <div>
        <Title>In-Progress Shipments</Title>
        <Subtitle>Shipments that are currently being processed</Subtitle>
      </div>
    </div>
  );
}
