import { exists } from "fs";

export const API_BASE_URL = process.env.API_ENDPOINT || "http://localhost:8000";

export const endpoints = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  users: {
    base: "/users",
    byId: (id: string) => `/users/${id}`,
    exists: (email: string) =>
      `/users/exists?email=${encodeURIComponent(email)}`,
    findByEmail: (email: string) => `/users?email=${encodeURIComponent(email)}`,
  },
  articles: {
    base: "/articles",
    byId: (id: string) => `/articles/${id}`,
  },
};
