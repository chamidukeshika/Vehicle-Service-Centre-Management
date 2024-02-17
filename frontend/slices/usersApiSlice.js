import { apiSlice } from './apiSlice';

const USERURL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERURL}/auth`,
                method: 'POST',
                body:data
            })
        })
    })
})
 
export const { useLoginMutation } = usersApiSlice;