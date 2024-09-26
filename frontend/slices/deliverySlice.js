import { apiSlice } from "./apiSlice";

const DELIVERY_URL = '/api/delivery'; // Assuming the delivery API endpoint

export const deliveryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    insertDelivery: builder.mutation({
      query: (data) => ({
        url: `${DELIVERY_URL}/adddelivery`,
        method: 'POST',
        body: data
      })
    }),
    viewDeliveries: builder.query({
      query: () => ({
        url: `${DELIVERY_URL}/getdelivery`,
        method: 'GET'
      })
    }),
    updateDelivery: builder.mutation({
      query: ({ id, data }) => ({
        url: `${DELIVERY_URL}/updatdelivery/${id}`,
        method: 'PUT',
        body: data
      })
    }),
    deleteDelivery: builder.mutation({
      query: (id) => ({
        url: `${DELIVERY_URL}/deleteorder/${id}`, // Assuming delete endpoint is /api/delivery/delete/:id
        method: 'DELETE'
      })
    }),
    
    // Added the viewCusById query endpoint
    viewCusById: builder.query({
      query: (Id) => ({
          url: `${DELIVERY_URL}/getcusDelivery/${Id}`,
          method: 'GET'
      })
    }),
  })
});

export const {
  useInsertDeliveryMutation,
  useViewDeliveriesQuery,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
  useViewCusByIdQuery // Added missing export
} = deliveryApiSlice;
