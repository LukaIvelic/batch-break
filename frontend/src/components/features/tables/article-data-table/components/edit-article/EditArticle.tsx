import { useSheetLayout } from "@/src/hooks/useSheetLayout";
import { useEffect } from "react";
import { Article } from "@/src/types";
import { EditArticleContent } from "./EditArticleContent/EditArticleContent";

interface EditArticleProps {
  article: Article;
  isAdmin?: boolean;
}

export function EditArticle({ article, isAdmin = false }: EditArticleProps) {
  const { setSheetLayoutItems, open } = useSheetLayout();

  useEffect(() => {
    setSheetLayoutItems({
      title: "Edit Article",
      description:
        "Make changes to existing fields, once you're done click confirm.",
      content: <EditArticleContent article={article} />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button onClick={open} disabled={!isAdmin} className="w-full text-left">
      Edit
    </button>
  );
}
