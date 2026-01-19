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
import { Article } from "@/src/types";
import { useCreatePopupWindow } from "@/src/hooks";
import { EditArticle } from "@/src/components/popup-content/EditArticle";

interface ArticleActionCellProps {
  article: Article;
}

function EditAction({ article }: { article: Article }) {
  const { openPopupWindow } = useCreatePopupWindow(
    <EditArticle article={article} />,
  );
  return (
    <div onClick={openPopupWindow} className="w-full">
      Edit
    </div>
  );
}

export function ArticleActionCell(props: ArticleActionCellProps) {
  const { article } = props;

  const actions = [
    {
      key: "edit",
      label: "Edit",
      render: () => <EditAction article={article} />,
    },
    {
      key: "copy",
      label: "Copy Article ID",
      onClick: () => navigator.clipboard.writeText(article.article_id),
    },
  ];

  return (
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
        {actions.map((action) => (
          <DropdownMenuItem key={action.key} onClick={action.onClick}>
            {action.render ? action.render() : action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
