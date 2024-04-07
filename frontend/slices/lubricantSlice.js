import { apiSlice } from "./apiSlice";
const LUBRI_URL = '/api/lubricant';

export const lubriApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        insert: builder.mutation({
            query: (data) => ({
                url: `${LUBRI_URL}/add`,
                method: 'POST',
                body: data
            })
        }),
        view: builder.query({
            query: () => ({
                url: `${LUBRI_URL}/view`,
                method: 'GET'
            })
        }),
        update: builder.mutation({
            query: (id, data) => ({
                url: `${LUBRI_URL}/update/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        delete: builder.mutation({
            query: (id) => ({
                url: `${LUBRI_URL}/delete/${id}`, 
                method: 'DELETE'
            })
        })
    })
})

export const {
    useInsertMutation,
    useViewQuery,
    useUpdateMutation,
    useDeleteMutation
} = lubriApiSlice;
