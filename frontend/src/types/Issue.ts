import { UUID } from "crypto";
import { Shipment } from "./Shipment";
import { User } from "./User";

export enum IssueSeverity {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

export enum IssueStatus {
  RESOLVED = "resolved",
  UNRESOLVED = "unresolved",
  DISMISSED = "dismissed",
}

export type Issue = {
  id: number;
  issueReporter: User;
  issueSeverity: IssueSeverity;
  referencesShipment: Shipment;
  issueStatus: IssueStatus;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateIssuePayload = {
  issueReporter?: UUID;
  referencesShipment?: number;
  issueSeverity?: IssueSeverity;
  description?: string;
};
