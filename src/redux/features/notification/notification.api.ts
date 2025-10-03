import { TArgs } from "@/types";
import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createPayment: builder.mutation({
    //     query: (data) => {
    //         return {
    //             url: `payments`,
    //             method: "POST",
    //             body: data,
    //         };
    //     },
    //     invalidatesTags: ["booking", "earning"],
    // }),
    unreadNotice: builder.query({
      query: () => {
        return {
          url: `notification/count`,
          method: "GET",
        };
      },
      // providesTags: ["notice"],
    }),
    allNotification: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `notification`,
          method: "GET",
          params,
        };
      },
      // providesTags: ["notice"],
    }),
  }),
});

export const { useUnreadNoticeQuery, useAllNotificationQuery } =
  notificationApi;
