import { useState, useEffect } from "react";
import { tokenStorage } from "../../config/token-storage";
import { login as authLogin, logout as authLogout } from "./AuthService";
import { NestResponse } from "@/src/lib/config/response";
import { User } from "@/src/lib/types";
import { apiRequest } from "../../config";
import { ENDPOINTS } from "../../config/endpoints";

interface LoginResponse {
  access_token: string;
}

interface AuthSession {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<NestResponse<LoginResponse>>;
  logout: () => void;
  refetch: () => Promise<void>;
}

export function useAuth(): AuthSession {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const token = tokenStorage.getToken();
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));

      const response = await apiRequest<NestResponse<User>>(
        ENDPOINTS.USERS_ENDPOINT.FIND_BY_EMAIL(payload.email),
        { cache: "no-store" },
      );

      if (response.response) {
        setUser(response.response);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<NestResponse<LoginResponse>> => {
    const result = await authLogin(email, password);
    setIsAuthenticated(true);
    await fetchUser();
    return result;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refetch = async () => {
    setIsLoading(true);
    await fetchUser();
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refetch,
  };
}
