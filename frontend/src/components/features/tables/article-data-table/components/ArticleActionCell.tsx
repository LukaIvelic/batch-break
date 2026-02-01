import { Article, User } from "@/src/types";
import { DataTableActionCell } from "../../../data-table/components/DataTableActionCell";
import { getArticleActionCellConfig } from "./ArticleActionCell.config";

interface ArticleActionCellProps {
  article: Article;
  user: User | null;
}

export function ArticleActionCell(props: ArticleActionCellProps) {
  const { article, user } = props;

  return (
    <DataTableActionCell
      entity={article}
      service={null}
      user={user}
      actions={getArticleActionCellConfig({ article, user })}
    />
  );
}
