import { Issue } from 'src/modules/issues/entities/issue.entity';
import { ShipmentItem } from 'src/modules/shipment-item/entities/shipmentItem.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

export enum ShipmentStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  shipmentNumber: string;

  @Column({ type: 'int', default: 0 })
  differentArticles: number;

  @Column({ type: 'int', default: 0 })
  totalArticles: number;

  @Column({ type: 'int', default: 0 })
  scannedArticles: number;

  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.DRAFT,
  })
  status: ShipmentStatus;

  @OneToMany(() => ShipmentItem, (shipmentItem) => shipmentItem.shipment, {
    cascade: true,
    eager: false,
  })
  items: ShipmentItem[];

  @OneToMany(() => Issue, (issue) => issue.referencesShipment)
  issues: Issue[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  get progress(): number {
    if (this.totalArticles === 0) return 0;
    return Math.round((this.scannedArticles / this.totalArticles) * 100);
  }

  @BeforeInsert()
  generateShipmentNumber() {
    if (!this.shipmentNumber) {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0');
      this.shipmentNumber = `SHP-${timestamp}-${random}`;
    }
  }
}
