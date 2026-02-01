import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/src/types/User";

export interface Action {
  include?: boolean;
  title: string;
  onClick?: () => void;
  type?: "destructive" | "default";
  disabled?: boolean;
}

interface DataTableActionCellProps<T> {
  entity: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: any;
  user: User | null;
  actions: Action[];
}

export function DataTableActionCell<T>(props: DataTableActionCellProps<T>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { entity, service, user, actions } = props;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              variant={action.type ? action.type : "default"}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
