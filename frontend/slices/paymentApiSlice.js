import { apiSlice } from "./apiSlice";

const PAYMENT_URL = '/api/payment';

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addp: builder.mutation({
            query: (data) => ({
                url: `${PAYMENT_URL}/add`,
                method: 'POST',
                body: data
            })
        }),
        viewp: builder.query({
            query: () => ({
                url:` ${PAYMENT_URL}/view`,
                method: 'GET'
            })
        }),
        updatep: builder.mutation({
            query: ({id, data}) => ({
                url: `${PAYMENT_URL}/update/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deletep: builder.mutation({
            query: (id) => ({
                url: `${PAYMENT_URL}/delete/${id}`,
                method: 'DELETE'
            })
        }),
        viewPaymentById: builder.query({
            query: (Id) => ({
                url: `${PAYMENT_URL}/getcusPayment/${Id}`, 
                method: 'GET'
            })
        }),

    })
})

export const {
    useAddpMutation,
    useViewpQuery,
    useUpdatepMutation,
    useDeletepMutation,
    useViewPaymentByIdQuery
} = paymentApiSlice;
