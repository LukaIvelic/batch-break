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
import { Article, Role } from "@/src/types";
import { EditArticle } from "../../edit-article/EditArticle";
import { useAuth } from "@/src/api/services";

interface ArticleActionCellProps {
  article: Article;
}

export function ArticleActionCell(props: ArticleActionCellProps) {
  const { article } = props;
  const { user } = useAuth();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <EditArticle
              article={article}
              isAdmin={user?.roleId === Role.ADMIN}
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => console.log("delete")}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
