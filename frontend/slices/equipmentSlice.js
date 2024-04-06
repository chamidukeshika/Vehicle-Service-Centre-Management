import { apiSlice } from "./apiSlice";
const EQUIP_URL = '/api/admin/equipments';

export const equipApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        insert: builder.mutation({
            query: (data) => ({
                url: `${EQUIP_URL}/additem`,
                method: 'POST',
                body: data
            })
        }),
        view: builder.query({
            query: () => ({
                url: `${EQUIP_URL}/`,
                method: 'GET'
            })
        }),
        update: builder.mutation({
            query: (id, data) => ({
                url: `${EQUIP_URL}/update/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        delete: builder.mutation({
            query: (id) => ({
                url: `${EQUIP_URL}/delete/${id}`, // assuming delete endpoint is /api/admin/equipments/delete/:id
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
} = equipApiSlice;
