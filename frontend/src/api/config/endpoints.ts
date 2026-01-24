export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
  shipments: {
    base: "/shipments",
    byId: (id: string) => `/shipments/${id}`,
    updateItem: (shipmentId: string, itemId: string) =>
      `/shipments/${shipmentId}/items/${itemId}`,
  },
};
