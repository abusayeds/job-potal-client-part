
import { TArgs } from "@/types";
import { baseApi } from "../../api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    chackout: builder.mutation({
      query: ({ planId, numberOfEmployeeIndex, body }) => {
        return {
          url: `plan/purchase/${planId}${numberOfEmployeeIndex ? `?numberOfEmployees=${numberOfEmployeeIndex}` : ""}`,
          method: "POST",
          body
        };
      },
      invalidatesTags: ["transaction"],
    }),
    // transactions: builder.query({
    //   query: (args: TArgs) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item) => {
    //         params.append(item.name, item.value);
    //       });
    //     }
    //     return {
    //       url: `transaction`,
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   // providesTags: ["transaction"],
    // }),
    invoices: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `plan/latest-invoice`,
          method: "GET",
          params,
        };
      },
      providesTags: ["transaction"],
    }),
    // earnigHistory: builder.query({
    //   query: () => {
    //     return {
    //       url: `transaction/counts`,
    //       method: "GET",
    //     };
    //   },
    //   // providesTags: ["transaction", "subscription"],
    // }),
  })
})

export const {
  useChackoutMutation,
  useInvoicesQuery
} = transactionApi;
