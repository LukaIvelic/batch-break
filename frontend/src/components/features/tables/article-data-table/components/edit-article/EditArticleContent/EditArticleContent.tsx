"use client";

import { Article, ArticleUpdateResponse } from "@/src/types";
import { useState } from "react";
import { fields } from "./EditArticleContent.config";
import { Subtitle } from "../../../../../subtitle/Subtitle";
import { Input } from "@/src/components/ui/input";
import { Button } from "../../../../../button/Button";
import { articleService } from "@/src/api/services/articles/ArticleService";
import { useSheetLayout } from "@/src/hooks/useSheetLayout";
import { useQueryClient } from "@tanstack/react-query";

export function EditArticleContent({ article }: { article: Article }) {
  const {
    id: ArticleId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createdAt: _createdAt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatedAt: _updatedAt,
    ...defaultArticle
  } = article;
  const { close } = useSheetLayout();
  const [updatedArticle, setUpdatedArticle] =
    useState<ArticleUpdateResponse>(defaultArticle);
  const queryClient = useQueryClient();

  const handleChange =
    (key: keyof ArticleUpdateResponse, type: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = type === "number" ? Number(e.target.value) : e.target.value;

      setUpdatedArticle((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  const handleSubmit = async () => {
    await articleService.update(ArticleId, updatedArticle);
    queryClient.invalidateQueries({ queryKey: ["articles"] });
    close();
  };

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-2">
          <div>
            <div>{field.label}</div>
            <Subtitle className="text-sm">{field.description}</Subtitle>
          </div>
          <Input
            type={field.type}
            defaultValue={article[field.key]}
            onChange={handleChange(field.key, field.type)}
          />
        </div>
      ))}
      <Button
        className="mt-4 rounded-[10px]! inverted  py-2! font-medium"
        onClick={handleSubmit}
      >
        Confirm
      </Button>
    </div>
  );
}
