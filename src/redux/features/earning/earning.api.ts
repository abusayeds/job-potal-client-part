import { baseApi } from "@/redux/api/baseApi";
import { TArgs } from "@/types";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarningHistory: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `admin/earning-history`,
          method: "GET",
          params
        };
      },
    }),
  }),
});

export const { useGetEarningHistoryQuery } = earningApi;
