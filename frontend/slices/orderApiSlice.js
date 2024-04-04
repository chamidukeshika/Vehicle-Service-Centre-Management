import { apiSlice } from "./apiSlice";
const EQUIP_URL = '/api/orders';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        insert: builder.mutation({
            query: (data) => ({
                url: `${EQUIP_URL}/addorder`,
                method: 'POST',
                body: data
            })
        }),
        view: builder.query({
            query: () => ({
                url: `${EQUIP_URL}/getorder`,
                method: 'GET'
            })
        }),
        update: builder.mutation({
            query: (id, data) => ({
                url: `${EQUIP_URL}/updateorder/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        delete: builder.mutation({
            query: (id) => ({
                url: `${EQUIP_URL}/deleteorder/${id}`, // assuming delete endpoint is /api/admin/equipments/delete/:id
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
} = orderApiSlice;
