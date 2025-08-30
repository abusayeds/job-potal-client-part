import { TArgs } from "@/types";
import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminUsers: builder.query({
      query: (args: TArgs) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `user/all-user`,
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    adminSingleUserDetails: builder.query({
      query: (id) => {
        return {
          url: `user/single-user/${id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    //  status change api
    userStatusChange: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `user/handle-status/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["user", "company"],
    }),

    dashboardOverview: builder.query({
      query: () => {
        return {
          url: `job/overview`,
          method: "GET",
        };
      },
      providesTags: ["user", "jobs", "transaction"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `user/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),

    // favorite api
    favoriteAction: builder.mutation({
      query: (id) => {
        return {
          url: `saved/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["favorite", "auth"],
    }),

    myFavorite: builder.query({
      query: () => {
        return {
          url: `saved/my-favorites`,
          method: "GET",
        };
      },
      providesTags: ["favorite"],
    }),
  }),
});

export const {
  useAdminUsersQuery,
  useAdminSingleUserDetailsQuery,
  useUserStatusChangeMutation,
  useDeleteUserMutation,
  useDashboardOverviewQuery,
  useFavoriteActionMutation,
  useMyFavoriteQuery,
} = usersApi;
