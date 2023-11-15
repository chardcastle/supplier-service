import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Supplier {
    id: string,
    name: string
}

export const suppliersApi = createApi({
    reducerPath: 'suppliersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/suppliers/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')

            if (token) {
                headers.set('authorization', token)
            }

            return headers
        },
    }),
    endpoints: (builder) => {return {
        getSuppliersList: builder.query<Supplier[], void>({
            query: () => 'list',
        }),
        getSupplierById: builder.query<Supplier, string>({
            query: (supplierId) =>`view/${supplierId}`
        }),
        postSupplier: builder.mutation<Supplier, Partial<Supplier>>({
            query: (form) => ({
                url: 'create',
                method: 'post',
                body: form,
                headers: {
                    "Content-Type": "application/json;",
                }
            }),
        }),
        putSupplier: builder.mutation<Supplier, Partial<Supplier>>({
            query: (form: Partial<Supplier>) => ({
                url: `update/${form.id}`,
                method: 'put',
                body: form,
                headers: {
                    "Content-Type": "application/json;",
                }
            }),
        }),
    }},
})

// Export hooks for usage in functional components
export const {
    useGetSuppliersListQuery,
    useGetSupplierByIdQuery,
    usePostSupplierMutation,
    usePutSupplierMutation
} = suppliersApi
