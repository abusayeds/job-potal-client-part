import { TArgs } from "@/types";
import { baseApi } from "../../api/baseApi";

const trainingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postTraining: builder.mutation({
      query: (data) => {
        return {
          url: `training/create`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["training"],
    }),
    myTraining: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `training/my-training`,
          method: "GET",
          params,
        };
      },
      providesTags: ["training"],
    }),
    // jobEdit: builder.mutation({
    //   query: ({ id, data }) => {
    //     return {
    //       url: `job/${id}`,
    //       method: "PUT",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["jobs"],
    // }),
    deleteTraining: builder.mutation({
      query: (id) => {
        return {
          url: `training/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["training"],
    }),
    // apply for training
    applyTraining: builder.mutation({
      query: (data) => {
        return {
          url: `training/ragistration`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["training"],
    }),
    trainingInterested: builder.query({
      query: ({ args, id }: { args?: TArgs; id: string; }) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `training/specific/${id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["training"],
    }),
      myAppliedTraining: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `training/my-appliedTraining`,
          method: "GET",
          params,
        };
      },
      providesTags: ["training"],
    }),
  }),
});

export const {
  usePostTrainingMutation,
  useMyTrainingQuery,
  useDeleteTrainingMutation,
  useApplyTrainingMutation,
  useTrainingInterestedQuery,
   useMyAppliedTrainingQuery
} = trainingApi;

