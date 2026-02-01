import { Shipment } from 'src/modules/shipments/entities/shipment.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';

export enum IssueSeverity {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

export enum IssueStatus {
  RESOLVED = 'resolved',
  UNRESOLVED = 'unresolved',
  DISMISSED = 'dismissed',
}

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.issuesReported, {
    eager: true,
  })
  issueReporter: User;

  @Column({
    type: 'enum',
    enum: IssueSeverity,
    default: IssueSeverity.LOW,
  })
  issueSeverity: IssueSeverity;

  @ManyToOne(() => Shipment, (shipment) => shipment.issues, {
    eager: true,
  })
  referencesShipment: Shipment;

  @Column({
    type: 'enum',
    enum: IssueStatus,
    default: IssueStatus.UNRESOLVED,
  })
  issueStatus: IssueStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
