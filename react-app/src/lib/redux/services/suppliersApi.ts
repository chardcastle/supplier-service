import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Supplier {
    _id: string;
    SupplierId: number;
    Name: string;
    Address: string;
    CreatedByUser: string;
    CreatedOn: string;
}

export interface SupplierData {
    [key: string]: Supplier;
}

export interface SupplierResponseData {
    data: SupplierData
}

const includeRefreshToken = (form: any) => {
    return { ...form, refreshToken: localStorage.getItem('refreshToken') };
}

export const suppliersApi = createApi({
    reducerPath: 'suppliersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/suppliers/',
        prepareHeaders: (headers) => {
            const authToken = localStorage.getItem('authToken')

            if (authToken) {
                headers.set('authorization', authToken)
            }

            return headers
        },
    }),
    endpoints: (builder) => {return {
        getSuppliersList: builder.query<SupplierResponseData, void>({
            query: () => 'list',
        }),
        getSupplierById: builder.query<{ data: Supplier }, string>({
            query: (supplierId) =>`view/${supplierId}`
        }),
        postSupplier: builder.mutation<Supplier, Partial<Supplier>>({
            query: (form) => ({
                url: 'create',
                method: 'post',
                body: includeRefreshToken(form),
                headers: {
                    "Content-Type": "application/json;",
                }
            }),
        }),
        putSupplier: builder.mutation<Supplier, Partial<Supplier>>({
            query: (form: Partial<Supplier>) => ({
                url: `update/${form._id}`,
                method: 'put',
                body: includeRefreshToken(form),
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
