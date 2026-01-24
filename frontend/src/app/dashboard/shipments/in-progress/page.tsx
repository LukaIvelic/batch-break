import { Subtitle, Title } from "@/src/components/features";
import { ShipmentsDataTable } from "@/src/components/features/tables/shipments-data-table/ShipmentsDataTable";

export default function ArticlePage() {
  return (
    <div className="h-full max-w-[1000px] mx-auto">
      <div>
        <Title>In-Progress Shipments</Title>
        <Subtitle>Shipments that are currently being processed</Subtitle>
      </div>
      <ShipmentsDataTable />
    </div>
  );
}
