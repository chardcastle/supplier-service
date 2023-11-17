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
import { useGetSuppliersListQuery, SupplierData, Supplier } from "@/lib/redux/services/suppliersApi";
import React from "react";

const SupplierRow = ({ supplier: { _id, Name, Address, CreatedOn }}: { supplier: Supplier}) => {
    return (
        <Tr>
            <Td>{_id}</Td>
            <Td>{Name}</Td>
            <Td>{Address}</Td>
            <Td>{format(new Date(CreatedOn), "yyyy-MM-dd HH:mm:ss")}</Td>
        </Tr>
    )
}

const List = () => {
    const { data, isLoading} = useGetSuppliersListQuery();

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
                            {data && Object.entries(data.data).map(([key, supplier]) => (
                                <SupplierRow key={key} supplier={supplier} />
                            ))}
                       </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default List;
