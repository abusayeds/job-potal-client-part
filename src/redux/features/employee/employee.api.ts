import { baseApi } from "@/redux/api/baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addEmployee: builder.mutation({
      query: (body) => {
        return {
          url: `user/access-employe`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["employee"],
    }),
    employerEmployee: builder.query({
      query: () => {
        return {
          url: `user/access-employe`,
          method: "GET",
        };
      },
      providesTags: ["employee"]
    }),
    deleteEmployee: builder.mutation({
      query: (id) => {
        return {
          url: `user/employe/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["employee"],
    }),

  }),
});

export const { useEmployerEmployeeQuery, useAddEmployeeMutation, useDeleteEmployeeMutation } =
  employeeApi;
