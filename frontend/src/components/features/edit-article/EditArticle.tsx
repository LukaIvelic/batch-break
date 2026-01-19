import { useSheetLayout } from "@/src/hooks/useSheetLayout";
import { useEffect, useState } from "react";
import { Article } from "@/src/types";
import { EditArticleContent } from "./EditArticleContent/EditArticleContent";

interface EditArticleProps {
  article: Article;
}

export function EditArticle({ article }: EditArticleProps) {
  const { setSheetLayoutItems, open } = useSheetLayout();

  useEffect(() => {
    setSheetLayoutItems({
      title: "Edit Article",
      description:
        "Make changes to existing fields, once you're done click confirm.",
      content: <EditArticleContent article={article} />,
    });
  }, []);

  return <div onClick={open}>Edit</div>;
}
