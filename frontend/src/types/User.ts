import { UUID } from "crypto";

export type User = {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  roleId: number | null;
  createdAt: string;
  updatedAt: string;
};
