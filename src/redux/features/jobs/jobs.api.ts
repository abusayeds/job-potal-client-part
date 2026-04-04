import { TArgs } from "@/types";
import { baseApi } from "../../api/baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    jobPost: builder.mutation({
      query: (data) => {
        return {
          url: `job/create`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["jobs"],
    }),
    jobEdit: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `job/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["jobs"],
    }),
    dashboardJobs: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `job/my-jobs`,
          method: "GET",
          params,
        };
      },
      providesTags: ["jobs"],
    }),
    dashSingleJobs: builder.query({
      query: (id) => {
        // const params = new URLSearchParams();
        // if (args) {
        //     args.forEach((item) => {
        //         params.append(item.name, item.value);
        //     });
        // }
        return {
          url: `job/single/${id}`,
          method: "GET",
          // params,
        };
      },
      providesTags: ["jobs"],
    }),
    relatedJobs: builder.query({
      query: (id) => {
        return {
          url: `job/related-jobs/${id}`,
          method: "GET",
          // params,
        };
      },
      providesTags: ["jobs"],
    }),
    alertJobs: builder.query({
      query: () => {
        return {
          url: `job/my-job-alerts`,
          method: "GET",
          // params,
        };
      },
      providesTags: ["jobs", "auth"],
    }),
    deleteJob: builder.mutation({
      query: (id) => {
        return {
          url: `job/delete-job/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const {
  useJobPostMutation,
  useJobEditMutation,
  useDashboardJobsQuery,
  useDashSingleJobsQuery,
  useAlertJobsQuery,
  useRelatedJobsQuery,
  useDeleteJobMutation,
} = jobApi;
