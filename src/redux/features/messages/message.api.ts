import { baseApi } from "../../api/baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation({
        query: (data) => {
            return {
                url: `conversations`,
                method: "POST",
                body: data,
            };
        },
        // invalidatesTags: ["messages"],
    }),
    // conversations: builder.query({
    //     query: (args: TArgs) => {
    //         const params = new URLSearchParams();
    //         if (args) {
    //             args.forEach((item) => {
    //                 params.append(item.name, item.value);
    //             });
    //         }
    //         return {
    //             url: `conversations`,
    //             method: "GET",
    //             params,
    //         };
    //     },
    //     providesTags: ["messages"],
    // }),
    // messages: builder.query({
    //     query: (id: string) => {
    //         const params = new URLSearchParams();
    //         // if (args) {
    //         //     args.forEach((item) => {
    //         //         params.append(item.name, item.value);
    //         //     });
    //         // }
    //         return {
    //             url: `conversations/${id}`,
    //             method: "GET",
    //             params,
    //         };
    //     },
    //     providesTags: ["messages"],
    // }),
  }),
});

export const {
//   useMessagesQuery,
//   useCreateConversationMutation,
//   useConversationsQuery,
} = messageApi;
