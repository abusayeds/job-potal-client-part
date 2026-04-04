import { TArgs } from "@/types";
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `category/all`,
          method: "GET",
          params,
        };
      },
      providesTags: ["category"],
    }),
    getSingleCategory: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `category/single`,
          method: "GET",
          params,
        };
      },
      providesTags: ["category"],
    }),

    createCategory: builder.mutation({
      query: ({ body }) => {
        // console.log(data);
        return {
          url: `category/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ body, id }) => {
        // console.log(data);
        return {
          url: `category/update/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        // console.log(data);
        return {
          url: `category/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
