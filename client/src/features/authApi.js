import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000/user'}),
    endpoints: builder =>({
        auth: builder.mutation({
            query: ({isLogin,formData}) =>({
                url:isLogin?'signin':'signup',
                method: 'POST',
                body:formData
            })
        })
    })
})

export const { useAuthMutation } = authApi