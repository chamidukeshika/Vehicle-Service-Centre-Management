import { apiSlice } from "./apiSlice";

const inq_URL = '/api/inquiry';

export const inquiryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        inserti: builder.mutation({
            query: (data) => ({
                url: `${inq_URL}/addinquiry`,
                method: 'POST',
                body: data
            })
        }),
        viewi: builder.query({
            query: () => ({
                url: `${inq_URL}/viewinquiry`,
                method: 'GET'
            })
        }),
        updatei: builder.mutation({
            query: ({id, data}) => ({
                url: `${inq_URL}/updateinquiry/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deletei: builder.mutation({
            query: (id) => ({
                url: `${inq_URL}/deleteinquiry/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useInsertiMutation,
    useViewiQuery,
    useUpdateiMutation,
    useDeleteiMutation // Corrected export name
} = inquiryApiSlice;
