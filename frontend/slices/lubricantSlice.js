import { apiSlice } from "./apiSlice";
const LUBRI_URL = '/api/lubricant';

export const lubriApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        insertL: builder.mutation({
            query: (data) => ({
                url:` ${LUBRI_URL}/add`,
                method: 'POST',
                body: data
            })
        }),
        viewL: builder.query({
            query: () => ({
                url: `${LUBRI_URL}/view`,
                method: 'GET'
            })
        }),
        updateL: builder.mutation({
            query: ({id, data}) => ({
                url: `${LUBRI_URL}/update/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteL: builder.mutation({
            query: (id) => ({
                url: `${LUBRI_URL}/delete/${id}`, 
                method: 'DELETE'
            })
        })
    })
})

export const {
    useInsertLMutation,
    useViewLQuery,
    useUpdateLMutation,
    useDeleteLMutation
} = lubriApiSlice;
