import { Article } from "@/src/types";

interface EditArticleProps {
  article: Article;
}

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EditArticle(_props: EditArticleProps) {
  return (
    <div className="bg-white/10 w-full h-full">
      <div>
        <p>Article ID</p>
      </div>
    </div>
  );
}
