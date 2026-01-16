import { cn } from "@/lib/utils";
import { ArticleDataTable, Subtitle, Title } from "@/src/components/features";

export default function ArticlePage() {
  return (
    <div
      className={cn(`
      h-full max-w-[1000px] mx-auto
      flex flex-col gap-6
    `)}
    >
      <div>
        <Title>Articles</Title>
        <Subtitle>Get an overview of all stored articles</Subtitle>
      </div>
      <ArticleDataTable />
    </div>
  );
}
