// appointmentSlice.js
import { apiSlice } from "./apiSlice";

const APPOINT_URL = '/api/app';

const appointApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        insertApp: builder.mutation({
            query: (data) => ({
                url: `${APPOINT_URL}/addapp`,
                method: 'POST',
                body: data
            })
        }),
        viewApp: builder.query({
            query: () => ({
                url: `${APPOINT_URL}/view`,
                method: 'GET'
            })
        }),
        //me tika
        viewAppById: builder.query({
            query: (Id) => ({
                url: `${APPOINT_URL}/viewapp/${Id}`,
                method: 'GET'
            })
        }),
        //methanta
        updateApp: builder.mutation({
            query: ({ id, data }) => ({
                url: `${APPOINT_URL}/update/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteApp: builder.mutation({
            query: (id) => ({
                url: `${APPOINT_URL}/delete/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useInsertAppMutation,
    useViewAppQuery,
    useUpdateAppMutation,
    useDeleteAppMutation,
    useViewAppByIdQuery
} = appointApiSlice;
