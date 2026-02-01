"use client";

import { Shipment } from "@/src/types";
import InteractiveArticleView from "./InteractiveArticleView";
import { Title } from "@/src/components/features/title/Title";
import { Subtitle } from "@/src/components/features/subtitle/Subtitle";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { AppWindowIcon, ListIcon } from "lucide-react";
import { Field, FieldLabel } from "@/src/components/ui/field";
import { Progress } from "@/src/components/ui/progress";

export function ViewShipmentContent({ shipment }: { shipment: Shipment }) {
  if (!shipment.items || shipment.items.length === 0) {
    return <div>No articles in this shipment.</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div>
          <Title className="text-[16px]">Shipment articles</Title>
          <Subtitle className="text-[14px]">
            Quantity of each article in the shipment. Select a view mode to see
            details.
          </Subtitle>
        </div>

        <Tabs defaultValue="minimal">
          <TabsList>
            <TabsTrigger value="minimal">
              <ListIcon />
              Minimal
            </TabsTrigger>
            <TabsTrigger value="complex">
              <AppWindowIcon />
              Complex
            </TabsTrigger>
          </TabsList>
          <TabsContent value="minimal">
            <div className="border border-foreground/10 p-2 rounded-lg">
              {shipment.items.map((item) => {
                const id = item.article.id;
                const name = item.article.name.toLowerCase();
                const quantity = item.quantity;
                const scannedQuantity = item.scannedQuantity;

                return (
                  <div
                    key={id}
                    className="grid grid-cols-[5fr_1fr_1fr] p-2 border-b border-foreground/10 last:border-0 text-[14px]"
                  >
                    <span>{name}</span>
                    <span className="font-mono">
                      {scannedQuantity}/{quantity}
                    </span>
                    <span className="font-mono">
                      {((scannedQuantity / quantity) * 100).toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="complex">
            <div className="h-100 w-full border border-foreground/10 rounded-lg">
              <InteractiveArticleView shipment={shipment} />
            </div>
          </TabsContent>
        </Tabs>

        <Field className="mt-4">
          <FieldLabel htmlFor="shipment-progress">
            <span>Articles Scanned</span>
            <span className="ml-auto">
              {(
                (shipment.scannedArticles / shipment.totalArticles) *
                100
              ).toFixed(0)}
              %
            </span>
          </FieldLabel>
          <Progress
            value={(shipment.scannedArticles / shipment.totalArticles) * 100}
            id="shipment-progress"
          />
        </Field>
      </div>
    </div>
  );
}
