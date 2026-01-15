import { api, endpoints, tokenStorage } from "../../config";
import { StatusCodes } from "http-status-codes";
import { NestResponse } from "../../responses/response";

interface LoginResponse {
  access_token: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

class AuthServiceClass {
  async login(
    email: string,
    password: string,
  ): Promise<NestResponse<LoginResponse>> {
    const response = await api.post<NestResponse<LoginResponse>>(
      endpoints.auth.login,
      { email, password },
      { cache: "no-store" },
    );

    if (response.status > StatusCodes.MULTIPLE_CHOICES) {
      throw new Error("Login failed");
    }

    if (response.response?.access_token) {
      tokenStorage.setToken(response.response.access_token);
    }

    return response;
  }

  async signup(payload: SignupPayload): Promise<NestResponse<LoginResponse>> {
    const response = await api.post<NestResponse<LoginResponse>>(
      endpoints.auth.signup,
      payload,
      { cache: "no-store" },
    );

    if (response.status > StatusCodes.MULTIPLE_CHOICES) {
      throw new Error("Signup failed");
    }

    if (response.response?.access_token) {
      tokenStorage.setToken(response.response.access_token);
    }

    return response;
  }

  logout(): void {
    tokenStorage.removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  isAuthenticated(): boolean {
    return tokenStorage.isAuthenticated();
  }
}

export const authService = new AuthServiceClass();
