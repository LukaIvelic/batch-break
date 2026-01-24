export enum ShipmentStatus {
  DRAFT = "draft",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export enum ShipmentItemStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

export type ShipmentItem = {
  id: number;
  quantity: number;
  scannedQuantity: number;
  status: ShipmentItemStatus;
  article: {
    id: number;
    article_id: string;
    barcode: string;
    name: string;
    manufacturer?: string;
    category?: string;
    price: number;
    scanned: number;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type Shipment = {
  id: number;
  shipmentNumber: string;
  differentArticles: number;
  totalArticles: number;
  scannedArticles: number;
  status: ShipmentStatus;
  items?: ShipmentItem[];
  createdAt: string;
  updatedAt: string;
};

export type CreateShipmentItemDto = {
  articleId: number;
  quantity: number;
  scannedQuantity?: number;
  status?: ShipmentItemStatus;
};

export type CreateShipmentDto = {
  status?: ShipmentStatus;
  items?: CreateShipmentItemDto[];
};

export type UpdateShipmentDto = Partial<CreateShipmentDto>;

export type UpdateShipmentItemDto = {
  quantity?: number;
  scannedQuantity?: number;
  status?: ShipmentItemStatus;
};
