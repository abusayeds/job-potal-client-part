import { baseApi } from "@/redux/api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => {
        return {
          url: `admin/dashboard`,
          method: "GET",
        };
      },
    }),
    getEarningData: builder.query({
      query: (year) => {
        return {
          url: `admin/earning/${year}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetDashboardDataQuery, useGetEarningDataQuery } =
  dashboardApi;
