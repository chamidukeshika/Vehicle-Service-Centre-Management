import { apiSlice } from "./apiSlice";
const EQUIP_URL = '/api/orders';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        inserto: builder.mutation({
            query: (data) => ({
                url: `${EQUIP_URL}/addorder`,
                method: 'POST',
                body: data
            })
        }),
        viewo: builder.query({
            query: () => ({
                url: `${EQUIP_URL}/getorder`,
                method: 'GET'
            })
        }),
        updateo: builder.mutation({
            query: ({id, data}) => ({
                url: `${EQUIP_URL}/updateorder/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteo: builder.mutation({
            query: (id) => ({
                url: `${EQUIP_URL}/deleteorder/${id}`, // assuming delete endpoint is /api/admin/equipments/delete/:id
                method: 'DELETE'
            })
        })
    })
})

export const {
    useInsertoMutation,
    useViewoQuery,
    useUpdateoMutation,
    useDeleteoMutation
} = orderApiSlice;
