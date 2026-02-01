import { User } from "@/src/types";
import { Action } from "../../data-table/components/DataTableActionCell";

interface ManageEmployeeActionCellConfigProps {
  employees: User[];
  user: User | null;
}

export function getManageEmployeeActionCellConfig({
  employees: _employees,
  user: _user,
}: ManageEmployeeActionCellConfigProps): Action[] {
  const manageEmployeeActionCellConfig: Action[] = [
    {
      title: "Manage",
      onClick: () => console.log("manage"),
    },
    {
      title: "Delete",
      onClick: () => console.log("delete"),
      type: "destructive",
    },
  ];

  return manageEmployeeActionCellConfig;
}
