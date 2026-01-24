"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Shipment } from "@/src/types";
import { useReactFlowData } from "./InteractiveArticleView.utils";
import { useTheme } from "next-themes";

function InteractiveArticleView({ shipment }: { shipment: Shipment }) {
  const { nodes, edges } = useReactFlowData(shipment);
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodesState, _setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);
  const onConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ReactFlow
      nodes={nodesState}
      edges={edgesState}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodesDraggable={false}
      nodesConnectable={false}
      fitView
      minZoom={0.5}
      className={`w-full h-20 ${theme === "dark" ? "text-background" : "text-foreground"}`}
    >
      <Background />
    </ReactFlow>
  );
}

export default InteractiveArticleView;
