import { Checkbox } from "@/src/components/ui/checkbox";
import { User } from "@/src/types";
import { ColumnDef } from "@tanstack/react-table";
import { TruncatedText } from "../../truncated-text/TruncatedText";
import { ManageEmployeesActionCell } from "./ManageEmployeeActionCell";

export const getColumns = (user: User | null): ColumnDef<User>[] => [
  {
    id: "select",
    size: 25,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    size: 90,
    header: "ID",
    cell: ({ row }) => (
      <TruncatedText maxLength={15}>{row.getValue("id")}</TruncatedText>
    ),
  },
  {
    accessorKey: "email",
    size: 150,
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "firstName",
    size: 120,
    header: "First Name",
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    size: 120,
    header: "Last Name",
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "roleId",
    size: 80,
    header: "Role ID",
    cell: ({ row }) => <div>{row.getValue("roleId")}</div>,
  },
  {
    id: "actions",
    size: 60,
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <ManageEmployeesActionCell
          employees={row.original ? [row.original] : []}
          user={user}
        />
      );
    },
  },
];
