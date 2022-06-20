import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const phonebookApi = createApi({
  reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({ baseUrl:"https://61e42cd7fbee6800175eb21d.mockapi.io" }),
  tagTypes:['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
        query: () => '/contacts',
        providesTags:['Contacts']
    }),
      addContact: builder.mutation({
          query: (name, phone) => ({
              url: '/contacts',
              method: 'POST',
             body:name, phone
          }),
             invalidatesTags:['Contacts']
      }),
      deleteContact: builder.mutation({
          query: id => ({
              url: `/contacts/${id}`,
              method:'DELETE'
          }),
          invalidatesTags:['Contacts']
      })
  }),
})

export const selectContactsResult = phonebookApi.endpoints.getContacts.select();

export const { useGetContactsQuery, useDeleteContactMutation, useAddContactMutation } = phonebookApi;

