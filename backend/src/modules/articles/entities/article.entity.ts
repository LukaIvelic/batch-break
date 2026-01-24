import { ShipmentItem } from 'src/modules/shipment-item/entities/shipmentItem.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: false, nullable: true })
  article_id: string;

  @Column({ unique: true, nullable: true })
  barcode: string;

  @Column({ unique: false })
  name: string;

  @Column({ nullable: true })
  manufacturer: string;

  @Column({ nullable: true })
  category: string;

  @Column('decimal')
  price: number;

  @Column('int')
  scanned: number;

  @OneToMany(() => ShipmentItem, (shipmentItem) => shipmentItem.article)
  shipmentItems: ShipmentItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
