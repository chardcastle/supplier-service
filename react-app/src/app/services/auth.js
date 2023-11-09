import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const investmentOptionsApi = createApi({
    reducerPath: 'investmentOptionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
        prepareHeaders: () => {
            // Set authentication header and return headers
        },
    }),
    endpoints: (builder) => {return {
        postLogin: builder.query({
            query: (form) => {return {
                url: 'auth/login',
                method: "post",
                body: form,
                headers: {
                    "Content-Type": "application/json;",
                }
            }},
        }),
        getSuppliers: builder.query({
            query: () => {return `suppliers/list`}
        })
    }},
})

// Export hooks for usage in functional components
export const { usePostLoginQuery, useGetSuppliersQuery } = investmentOptionsApi