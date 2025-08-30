import { TArgs } from "@/types";
import { baseApi } from "../../api/baseApi";

const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation({
      query: ({ jobId, body }) => {
        return {
          url: `job/apply/${jobId}`,
          method: "POST",
          body
        };
      },
      invalidatesTags: ["application", "jobs"],
    }),
    applicants: builder.query({
      query: ({ args, id }: { args?: TArgs; id: string; }) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `job/view-applications/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["application"],
    }),
    applicationDetails: builder.query({
      query: (id: string) => {
        return {
          url: `job/single-apply/${id}`,
          method: "GET",
        };
      },
      providesTags: ["application"],
    }),
  }),
});

export const {
  useApplyJobMutation,
  useApplicantsQuery,
  useApplicationDetailsQuery
} = applicationApi;
