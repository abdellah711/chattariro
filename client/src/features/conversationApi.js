import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SERVER_URL } from '../Constants/api'

export const convApi = createApi({
    reducerPath: 'conversation',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: SERVER_URL,
            prepareHeaders: (headers, { getState }) => {
                const token = getState().app.token
                headers.set('authorization', `Bearer ${token}`)
                return headers
            }
        }),
    endpoints: builder => ({
        getConversations: builder.query({
            query: ()=>'/conversations'
        }),
        createConversation: builder.mutation({
            query: () => ({
                url: '/conversations',
                method: 'POST',
                body: {
                    "users": [
                        "610febbeb099c030645d44ed"
                    ],
                    "last_msg": { "content": "Hello" }

                }
            })
        })
    })
})

export const { useGetConversationsQuery, useCreateConversationMutation } = convApi