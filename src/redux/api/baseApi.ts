import { apiUrl } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token =
        Cookies.get("token") ||
        (getState() as { auth: { token: string } }).auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("X-Custom-Header", "foobar");
      return headers;
    },
  }),
  tagTypes: [
    "auth",
    "jobs",
    "subscription",
    "transaction",
    "category",
    "user",
    "renewal",
    "favorite",
    "application",
    "settings",
    "company",
    "employee",
    "training"
    // "notice",

  ],
  endpoints: () => ({}),
});
