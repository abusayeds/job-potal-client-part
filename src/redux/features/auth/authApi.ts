import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => {
        return {
          url: `user/register`,
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: `user/login`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    verifyEmail: builder.mutation({
      query: ({ data, endpoint }) => {
        return {
          url: `user/${endpoint}`,
          method: "POST",
          // headers: { Authorization: `Bearer ${token}` },
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    resendOtp: builder.mutation({
      query: () => {
        return {
          url: `user/resend`,
          method: "POST",
          // body: data,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `user/forget-password`,
          method: "POST",
          body: data,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `user/reset-password`,
          method: "POST",
          body,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: `user/change-password`,
          method: "POST",
          body,
        };
      },
    }),
    getProfile: builder.query({
      query: () => {
        return {
          url: `user/my-profile`,
          method: "GET",
        };
      },
      providesTags: ["auth"],
    }),
    // employer
    updateInfo: builder.mutation({
      query: ({ body, step }) => {
        return {
          url: `user/identity-verification?step=${step}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),

    updateCandidateInfo: builder.mutation({
      query: ({ body, step }) => {
        return {
          url: `user/candidate-identity-verification?step=${step}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // seekers 
    jobAlert: builder.mutation({
      query: (body) => {
        console.log(body)
        return {
          url: `user/job-alert`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    uploadCv: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `user/cv-update${id ? '?pull=' + id : ""}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    // for admin
    updateAdminProfile: builder.mutation({
      query: (body) => {
        return {
          url: `user/update`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    closeAccount: builder.mutation({
      query: () => {
        return {
          url: `user/my-profile`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["auth"],
    }),
    updateEmployment: builder.mutation({
      query: ({ type, body }) => {
        return {
          url: `employment/record?type=${type}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    deleteEmployment: builder.mutation({
      query: ({ recordId, type }) => {
        return {
          url: `employment/record?recordId=${recordId}&type=${type}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateInfoMutation,
  useChangePasswordMutation,
  useUpdateAdminProfileMutation,
  useUpdateCandidateInfoMutation,
  useJobAlertMutation,
  useUploadCvMutation,
  useCloseAccountMutation,
  useUpdateEmploymentMutation,
  useDeleteEmploymentMutation
} = authApi;
