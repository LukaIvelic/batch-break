"use client";

import { cn } from "@/lib/utils";
import { Subtitle, Title } from "@/src/components/features";
import { ArticleDataTable } from "@/src/components/features/tables/article-data-table/ArticleDataTable";

export default function ArticlePage() {
  return (
    <div className={cn(`max-w-250 mx-auto flex flex-col gap-6`)}>
      <div>
        <Title>Articles</Title>
        <Subtitle>Get an overview of all stored articles</Subtitle>
      </div>
      <ArticleDataTable />
    </div>
  );
}
