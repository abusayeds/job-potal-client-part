import { baseApi } from "../../api/baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // terms
    getTerms: builder.query({
      query: () => {
        return {
          url: `terms`,
          method: "GET",
        };
      },
      providesTags: ["settings"],
    }),
    editTerms: builder.mutation({
      query: ({ body }) => {
        return {
          url: `terms/update`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["settings"],
    }),

    //policy
    getPrivacy: builder.query({
      query: () => {
        return {
          url: `privacy`,
          method: "GET",
        };
      },
      providesTags: ["settings"],
    }),
    editPrivacy: builder.mutation({
      query: ({ body }) => {
        return {
          url: `privacy/update`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["settings"],
    }),

    //about
    getAbout: builder.query({
      query: () => {
        return {
          url: `about`,
          method: "GET",
        };
      },
      providesTags: ["settings"],
    }),
    editAbout: builder.mutation({
      query: ({ body }) => {
        return {
          url: `about/update`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["settings"],
    }),

    //disclaimer
    getDisclaimer: builder.query({
      query: () => {
        return {
          url: `disclaimer`,
          method: "GET",
        };
      },
      providesTags: ["settings"],
    }),
    editDisclaimer: builder.mutation({
      query: ({ body }) => {
        return {
          url: `disclaimer/update`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["settings"],
    }),

    //refund
    getRefund: builder.query({
      query: () => {
        return {
          url: `refund`,
          method: "GET",
        };
      },
      providesTags: ["settings"],
    }),
    editRefund: builder.mutation({
      query: ({ body }) => {
        return {
          url: `refund/update`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["settings"],
    }),

    //  support
    supportMailPhone: builder.mutation({
      query: ({ body }) => {
        return {
          url: `setting/support`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useGetTermsQuery,
  useEditTermsMutation,

  useGetPrivacyQuery,
  useEditPrivacyMutation,

  useGetAboutQuery,
  useEditAboutMutation,

  useGetDisclaimerQuery,
  useEditDisclaimerMutation,

  useGetRefundQuery,
  useEditRefundMutation,

  useSupportMailPhoneMutation,
} = settingsApi;
