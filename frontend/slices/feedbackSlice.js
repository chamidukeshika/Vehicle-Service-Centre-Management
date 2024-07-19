import { apiSlice } from "./apiSlice";

const fbk_URL = '/api/feedback';

export const feedbackApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        insertf: builder.mutation({
            query: (data) => ({
                url: `${fbk_URL}/addfeedback`,
                method: 'POST',
                body: data
            })
        }),
        viewf: builder.query({
            query: () => ({
                url: `${fbk_URL}/viewfeedback`,
                method: 'GET'
            })
        }),
        viewById: builder.query({ // New endpoint for fetching feedback by ID
            query: (id) => ({
                url: `${fbk_URL}/view/${id}`, // Assuming the endpoint to fetch feedback by ID
                method: 'GET'
            })
        }),
        updatef: builder.mutation({
            query: ({ id, data }) => ({
                url: `${fbk_URL}/updatefeedback/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deletef: builder.mutation({
            query: (id) => ({
                url: `${fbk_URL}/deletefeedback/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useInsertfMutation,
    useViewfQuery,
    useViewByIdQuery, // Add this line to export the new query
    useUpdatefMutation,
    useDeletefMutation,
} = feedbackApiSlice;
