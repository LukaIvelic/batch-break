import { Shipment, User } from "@/src/types";
import { DataTableActionCell } from "../../../data-table/components/DataTableActionCell";
import { getShipmentsActionCellConfig } from "./ShipmentsActionCell.config";

interface ShipmentsActionCellProps {
  shipment: Shipment;
  user: User | null;
}

export function ShipmentsActionCell(props: ShipmentsActionCellProps) {
  const { shipment, user } = props;

  return (
    <DataTableActionCell
      entity={shipment}
      service={null}
      user={user}
      actions={getShipmentsActionCellConfig({ shipment, user })}
    />
  );
}
