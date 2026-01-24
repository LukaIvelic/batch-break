import {
  Article,
  ReactFlowEdge,
  ReactFlowNode,
  Shipment,
  ShipmentItem,
} from "@/src/types";

function articlesToReactFlowNodes(
  articles: Array<Article>,
  shipment: Shipment,
): Array<ReactFlowNode> {
  const nodes = articles.map((article, index) => {
    return {
      id: article.id,
      data: { label: article.name.toLowerCase() },
      position: { x: 300 + index * 50, y: index * 200 },
    };
  });

  const mainNode: ReactFlowNode = {
    id: `shipment-${shipment.id}`,
    data: { label: `Shipment ${shipment.shipmentNumber}` },
    position: { x: 0, y: 0 },
  };

  return [mainNode, ...nodes];
}

function articlesToReactFlowEdges(
  articles: Array<Article>,
  shipment: Shipment,
): Array<ReactFlowEdge> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return articles.map((article, _index) => {
    return {
      id: article.id,
      source: String(article.id),
      target: `shipment-${shipment.id}`,
      type: "smoothstep",
      label:
        shipment.items
          ?.find((item) => item.article.article_id === article.article_id)
          ?.quantity.toString() || "0",
    };
  });
}

export function useReactFlowData(shipment: Shipment) {
  const articles: Article[] = (shipment.items || []).map(
    (shipmentItem: ShipmentItem) => {
      return {
        ...shipmentItem.article,
        id: shipmentItem.article.id.toString(),
      };
    },
  );

  return {
    nodes: articlesToReactFlowNodes(articles, shipment),
    edges: articlesToReactFlowEdges(articles, shipment),
  };
}
