import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from '../Constants/api'

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({baseUrl:SERVER_URL}),
    endpoints: builder =>({
        auth: builder.mutation({
            query: ({isLogin,formData}) =>({
                url:`user/${isLogin?'signin':'signup'}`,
                method: 'POST',
                body:formData
            })
        })
    })
})

export const { useAuthMutation } = authApi