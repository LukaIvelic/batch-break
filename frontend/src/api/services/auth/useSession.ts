import { useState, useEffect, useCallback } from "react";
import { tokenStorage } from "../../config/token-storage";
import { authService } from "./AuthService";
import { usersService } from "../users/UsersService";
import { User } from "@/src/types";

interface AuthSession {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refetch: () => Promise<void>;
}

export function useAuth(): AuthSession {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = useCallback(async () => {
    try {
      const token = tokenStorage.getToken();
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const fetchedUser = await usersService.findByEmail(payload.email);

      if (fetchedUser) {
        setUser(fetchedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string): Promise<void> => {
    await authService.login(email, password);
    setIsAuthenticated(true);
    await fetchUser();
  };

  const logout = () => {
    authService.logout();
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
