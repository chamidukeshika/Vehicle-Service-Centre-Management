import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/records';

export const recordApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        insertRecord: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/addrecords`,
                method: 'POST',
                body: data
            })
        }),
        viewRecords: builder.query({
            query: () => ({
                url: `${USERS_URL}/viewrecords`,
                method: 'GET'
            })
        }),
        getRecordsByEmail: builder.query({ // Add a new query for fetching records by user's email
            query: (cemail) => ({
                url: `${USERS_URL}/view/${cemail}`, // Update the URL to include the email
                method: 'GET'
            })
        }),
        
        updateRecord: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USERS_URL}/updaterecords/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteRecord: builder.mutation({
            query: (id)=> ({
                url: `${USERS_URL}/deleterecords/${id}`,
                method: 'DELETE'
            })
        }),
    })
});


export const {
    useInsertRecordMutation,
    useViewRecordsQuery,
    useGetRecordsByEmailQuery,
    useUpdateRecordMutation,
    useDeleteRecordMutation
} = recordApiSlice;
