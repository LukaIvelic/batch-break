import { Shipment, User } from "@/src/types";
import { Action } from "../../../data-table/components/DataTableActionCell";
import { useSheetLayout } from "@/src/hooks/useSheetLayout";
import { ViewShipmentContent } from "./view-shipments/ViewShipmentContent";
import { shipmentService } from "@/src/api/services";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface ShipmentsActionCellConfigProps {
  shipment: Shipment;
  user: User | null;
}

export function getShipmentsActionCellConfig({
  shipment,
  user: _user,
}: ShipmentsActionCellConfigProps): Action[] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setSheetLayoutItems, open } = useSheetLayout();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  const tableId = "shipments";

  const shipmentsActionCellConfig: Action[] = [
    {
      title: "View Details",
      onClick: () => {
        setSheetLayoutItems({
          title: "Shipment Details",
          description: "See in depth details about this shipment.",
          content: <ViewShipmentContent shipment={shipment} />,
        });
        open();
      },
    },
    {
      title: "Delete",
      onClick: () => {
        shipmentService.delete(shipment.id.toString()).then(() => {
          toast.success("Shipment deleted successfully");
          queryClient.invalidateQueries({ queryKey: [tableId] });
        });
      },
      type: "destructive",
    },
  ];

  return shipmentsActionCellConfig;
}
