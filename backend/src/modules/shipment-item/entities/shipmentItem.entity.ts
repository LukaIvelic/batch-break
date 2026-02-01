import { Article } from 'src/modules/articles/entities/article.entity';
import { Shipment } from 'src/modules/shipments/entities/shipment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum ShipmentItemStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

@Entity('shipment_items')
export class ShipmentItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  scannedQuantity: number;

  @Column({
    type: 'enum',
    enum: ShipmentItemStatus,
    default: ShipmentItemStatus.PENDING,
  })
  status: ShipmentItemStatus;

  @ManyToOne(() => Shipment, (shipment) => shipment.items, {
    onDelete: 'CASCADE',
  })
  shipment: Shipment;

  @ManyToOne(() => Article, (article) => article.shipmentItems, { eager: true })
  article: Article;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
