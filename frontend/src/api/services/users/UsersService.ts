import { apiRequest } from "../../config";
import { ENDPOINTS } from "../../config/endpoints";
import { NestResponse } from "../../responses/response";

const { USERS_ENDPOINT } = ENDPOINTS;

interface User {
  id: string;
  email: string;
}

export async function createUser(payload: Partial<User>): Promise<User | null> {
  try {
    const res = await apiRequest<NestResponse<User>>(USERS_ENDPOINT.POST, {
      method: "POST",
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    return res.response ?? null;
  } catch {
    return null;
  }
}

export async function getAllUsers(): Promise<User[] | null> {
  try {
    const res = await apiRequest<NestResponse<User[]>>(
      USERS_ENDPOINT.GET_ALL,
      { cache: "no-store" },
    );

    return res.response ?? null;
  } catch {
    return null;
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const res = await apiRequest<NestResponse<User>>(
      USERS_ENDPOINT.GET_BY_ID(id),
      { cache: "no-store" },
    );

    return res.response ?? null;
  } catch {
    return null;
  }
}

export async function updateUser(
  id: string,
  payload: Partial<User>,
): Promise<User | null> {
  try {
    const res = await apiRequest<NestResponse<User>>(
      USERS_ENDPOINT.PATCH(id),
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        cache: "no-store",
      },
    );

    return res.response ?? null;
  } catch {
    return null;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    await apiRequest<NestResponse<void>>(USERS_ENDPOINT.DELETE(id), {
      method: "DELETE",
      cache: "no-store",
    });
    return true;
  } catch {
    return false;
  }
}

export async function findByEmail(email: string): Promise<User | null> {
  try {
    const res = await apiRequest<NestResponse<User | null>>(
      USERS_ENDPOINT.FIND_BY_EMAIL(email),
      { cache: "no-store" },
    );

    return res.response ?? null;
  } catch {
    return null;
  }
}

export async function isInDatabase(email: string): Promise<boolean> {
  try {
    const res = await apiRequest<NestResponse<{ exists: boolean }>>(
      USERS_ENDPOINT.IS_IN_DATABASE(email),
      { cache: "no-store" },
    );

    return res.response?.exists ?? false;
  } catch {
    return false;
  }
}
