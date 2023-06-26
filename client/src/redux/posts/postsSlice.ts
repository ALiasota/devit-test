import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ILink {
  id: number
  linkPath: string
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL
  }),
  tagTypes: ['posts'],
  endpoints: build => ({
    fetchLinks: build.query<ILink[], void>({
      query: () => `/link`,
      providesTags: ['posts']
    }),
    addLink: build.mutation<ILink, Partial<ILink>>({
      query: newContact => ({
        url: `/link`,
        method: 'POST',
        body: newContact
      }),
      invalidatesTags: ['posts']
    }),
    delLink: build.mutation<{ message: string }, number>({
      query: id => ({
        url: `/link/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['posts']
    }),
    updateLink: build.mutation<ILink, ILink>({
      query: ({ id, linkPath }: { id: number; linkPath: string }) => ({
        url: `/link/${id}`,
        method: 'PUT',
        body: { linkPath }
      }),
      invalidatesTags: ['posts']
    })
  })
})

export const { useFetchLinksQuery, useAddLinkMutation, useDelLinkMutation, useUpdateLinkMutation } = postsApi
