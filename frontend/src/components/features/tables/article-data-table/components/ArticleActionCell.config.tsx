import { Article, Role, User } from "@/src/types";
import { Action } from "../../../data-table/components/DataTableActionCell";
import { useSheetLayout } from "@/src/hooks/useSheetLayout";
import { EditArticleContent } from "./edit-article/EditArticleContent/EditArticleContent";

interface ArticleActionCellConfigProps {
  article: Article;
  user: User | null;
}

export function getArticleActionCellConfig({
  article,
  user,
}: ArticleActionCellConfigProps): Action[] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setSheetLayoutItems, open } = useSheetLayout();
  const isAdmin = user?.roleId === Role.ADMIN;

  const articleActionCellConfig: Action[] = [
    {
      title: "Edit",
      onClick: () => {
        setSheetLayoutItems({
          title: "Edit Article",
          description:
            "Make changes to existing fields, once you're done click confirm.",
          content: <EditArticleContent article={article} />,
        });
        open();
      },
      disabled: !isAdmin,
    },
    {
      title: "Delete",
      onClick: () => console.log("delete"),
      type: "destructive",
    },
  ];

  return articleActionCellConfig;
}
