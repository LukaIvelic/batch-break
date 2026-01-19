import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Article } from "@/src/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { TruncatedText } from "../../truncated-text/TruncatedText";
import { ArticleActionCell } from "./ArticleActionCell";

export const columns: ColumnDef<Article>[] = [
  {
    id: "select",
    size: 25,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "article_id",
    size: 90,
    header: "Article ID",
    cell: ({ row }) => <div>{row.getValue("article_id")}</div>,
  },
  {
    accessorKey: "barcode",
    size: 130,
    header: "Barcode",
    cell: ({ row }) => <div>{row.getValue("barcode")}</div>,
  },
  {
    accessorKey: "name",
    size: 250,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <TruncatedText maxLength={25}>{row.getValue("name")}</TruncatedText>
    ),
  },
  {
    accessorKey: "manufacturer",
    size: 180,
    header: "Manufacturer",
    cell: ({ row }) => <div>{row.getValue("manufacturer") || "-"}</div>,
  },
  {
    accessorKey: "category",
    size: 80,
    header: "Category",
    cell: ({ row }) => (
      <TruncatedText maxLength={10}>
        {row.getValue("category") || "-"}
      </TruncatedText>
    ),
  },
  {
    accessorKey: "price",
    size: 100,
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return <div className="text-right font-medium">€{price}</div>;
    },
  },
  {
    accessorKey: "scanned",
    size: 70,
    header: "Scanned",
    cell: ({ row }) => <div>{row.getValue("scanned")}</div>,
  },
  {
    id: "actions",
    size: 60,
    enableHiding: false,
    cell: ({ row }) => {
      const { price, ...article } = row.original;
      const articleData = { ...article, price: parseFloat(price.toString()) };
      return <ArticleActionCell article={articleData} />;
    },
  },
];
