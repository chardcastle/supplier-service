import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { format } from 'date-fns';
import { useGetSuppliersListQuery } from "@/lib/redux/services/suppliersApi";
import React from "react";

interface Supplier {
    _id: string;
    SupplierId: number;
    Name: string;
    Address: string;
    CreatedByUser: string;
    CreatedOn: string;
}

interface SupplierData {
    [key: string]: Supplier;
}

const SupplierRows = (props: {data: SupplierData }) => {
    const { data } = props;
    return (
        <>
            {data && Object.entries(data).map(([key, { SupplierId, Name, Address, CreatedOn }]) => (
                <Tr key={key}>
                    <Td>{SupplierId}</Td>
                    <Td>{Name}</Td>
                    <Td>{Address}</Td>
                    <Td>{format(new Date(CreatedOn), "yyyy-MM-dd HH:mm:ss")}</Td>
                </Tr>
            ))}
        </>
    )
}

const List = () => {
    const { data, isLoading } = useGetSuppliersListQuery();

    // @ts-ignore
    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="overflow-x-auto">
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Supplier ID</Th>
                                <Th>Name</Th>
                                <Th>Address</Th>
                                <Th>Created on</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {isLoading && (<Tr><Td colSpan={4}>Loading</Td></Tr>)}
                            {data && (<SupplierRows data={data.data} />)}
                       </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default List;
