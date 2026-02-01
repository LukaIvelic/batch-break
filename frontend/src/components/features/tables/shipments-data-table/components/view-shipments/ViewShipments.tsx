import { useSheetLayout } from "@/src/hooks/useSheetLayout";
import { useEffect } from "react";
import { Shipment } from "@/src/types";
import { ViewShipmentContent } from "./ViewShipmentContent";

interface EditArticleProps {
  shipment: Shipment;
}

export function ViewShipments({ shipment }: EditArticleProps) {
  const { setSheetLayoutItems, open } = useSheetLayout();

  useEffect(() => {
    setSheetLayoutItems({
      title: "Shipment Details",
      description: "See in depth details about this shipment.",
      content: <ViewShipmentContent shipment={shipment} />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button onClick={open} className="w-full text-left">
      View Details
    </button>
  );
}
