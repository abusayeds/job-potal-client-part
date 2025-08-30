import { TArgs } from "@/types";
import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscription: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `subscription`,
          method: "GET",
          params,
        };
      },
      providesTags: ["subscription"],
    }),

    // get single subscription
    singleSubscription: builder.query({
      query: (id) => {
        return {
          url: `subscription/${id}`,
          method: "GET",
        };
      },
      providesTags: ["subscription"],
    }),

    // update subscription
    updateSubscription: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `subscription/update/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["subscription"],
    }),

    myPlan: builder.query({
      query: () => {
        return {
          url: `plan/my-plan`,
          method: "GET",
        };
      },
      providesTags: ["renewal", "auth", "transaction"],
    }),
    renewable: builder.mutation({
      query: ({ myPlanId, body }) => {
        return {
          url: `plan/auto-renewal/${myPlanId}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["renewal"],
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
  }),
});

export const {
  useSubscriptionQuery,
  useSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useMyPlanQuery,
  useRenewableMutation,
} = subscriptionApi;
