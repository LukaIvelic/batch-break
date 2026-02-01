import { User } from "@/src/types";
import { DataTableActionCell } from "../../data-table/components/DataTableActionCell";
import { getManageEmployeeActionCellConfig } from "./ManageEmployeeActionCell.config";

interface ManageEmployeesActionCellProps {
  employees: User[];
  user: User | null;
}

export function ManageEmployeesActionCell(
  props: ManageEmployeesActionCellProps,
) {
  const { employees, user } = props;

  return (
    <DataTableActionCell
      entity={employees}
      service={null}
      user={user}
      actions={getManageEmployeeActionCellConfig({ employees, user })}
    />
  );
}
