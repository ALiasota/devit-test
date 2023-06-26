import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import storage from 'redux-persist/lib/storage'

export interface IUser {
  name: string
  id: string
}

export interface IUserFormData {
  name: string
  password: string
}

export interface IAuth {
  user: IUser
  token: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await storage.getItem('persist:token')
      if (typeof token === 'string') {
        headers.set('Authorization', token)
      }
      return headers
    }
  }),
  tagTypes: ['auth'],
  endpoints: build => ({
    fetchUser: build.query<IUser, void>({
      query: () => `/auth/user`,
      providesTags: ['auth']
    }),
    register: build.mutation<IAuth, IUserFormData>({
      query: userFormData => ({
        url: `/auth/register`,
        method: 'POST',
        body: userFormData
      }),
      invalidatesTags: ['auth']
    }),
    login: build.mutation<IAuth, IUserFormData>({
      query: id => ({
        url: `/auth/login`,
        method: 'POST'
      }),
      invalidatesTags: ['auth']
    }),
    logout: build.mutation<IAuth, { name: string }>({
      query: ({ name }) => ({
        url: `/auth/logout`,
        method: 'POST',
        body: { name }
      }),
      invalidatesTags: ['auth']
    })
  })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useFetchUserQuery } = authApi
