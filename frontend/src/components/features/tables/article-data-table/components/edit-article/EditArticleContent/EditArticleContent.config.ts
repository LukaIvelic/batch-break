export const fields = [
  {
    key: "barcode",
    label: "Barcode",
    description:
      "The barcode value associated with the article. Used for scanning and identification.",
    type: "text",
  },
  {
    key: "name",
    label: "Name",
    description:
      "Display name of the article as it should appear in lists and searches.",
    type: "text",
  },
  {
    key: "manufacturer",
    label: "Manufacturer",
    description: "Company or brand that produces the article.",
    type: "text",
  },
  {
    key: "category",
    label: "Category",
    description:
      "Logical grouping the article belongs to (used for filtering, reporting, or organization).",
    type: "text",
  },
  {
    key: "price",
    label: "Price",
    description:
      "Selling price of the article, typically in the default system currency.",
    type: "number",
  },
  {
    key: "scanned",
    label: "Scanned",
    description: "Number of times the article has been scanned or registered.",
    type: "number",
  },
] as const;
