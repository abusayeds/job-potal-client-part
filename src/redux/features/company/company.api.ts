import { baseApi } from "@/redux/api/baseApi";

const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRequestedCompany: builder.query({
      query: () => {
        return {
          url: `user/account-management`,
          method: "GET",
        };
      },
      providesTags: ["company"],
    }),

    getAllVerifiedCompany: builder.query({
      query: () => {
        return {
          url: `user/approve-employer`,
          method: "GET",
        };
      },
      providesTags: ["company"],
    }),
  }),
});

export const { useGetAllRequestedCompanyQuery, useGetAllVerifiedCompanyQuery } =
  companyApi;
