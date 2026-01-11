import { NestResponse } from "@/src/lib/config/response";
import { apiRequest } from "../../config";
import { ENDPOINTS } from "../../config/endpoints";
import { StatusCodes } from "http-status-codes";
import { tokenStorage } from "../../config/token-storage";

const { AUTH_ENDPOINT } = ENDPOINTS;

interface LoginResponse {
  access_token: string;
}

export async function login(
  email: string,
  password: string,
): Promise<NestResponse<LoginResponse>> {
  const response = await apiRequest<NestResponse<LoginResponse>>(
    AUTH_ENDPOINT.LOGIN(email, password),
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status > StatusCodes.MULTIPLE_CHOICES) {
    throw new Error("Login failed");
  }

  if (response.response?.access_token) {
    tokenStorage.setToken(response.response.access_token);
  }

  return response;
}

export function logout() {
  tokenStorage.removeToken();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

export function isAuthenticated() {
  return tokenStorage.isAuthenticated();
}
