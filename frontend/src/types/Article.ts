export type Article = {
  id: string;
  article_id: string;
  barcode: string;
  name: string;
  manufacturer?: string;
  category?: string;
  price: number;
  scanned: number;
  createdAt: string;
  lastModified: string;
};
