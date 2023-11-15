'use client'

import { HeaderNavBar } from "@/app/components/Navigation/HeaderNavBar";
import { Divider, Heading, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

export default function Page() {
    return (
        <>
            <HeaderNavBar />
            <div className="py-8 flex items-center justify-center">
                <div className="bg-white p-4 shadow-md rounded-md">
                    <Heading as='h3' size='lg'>
                        About
                    </Heading>
                    <Divider orientation='horizontal' />
                    <p className={"py-2"}>This is just a collection of components that I might use later</p>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>To convert</Th>
                                    <Th>into</Th>
                                    <Th isNumeric>multiply by</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>inches</Td>
                                    <Td>millimetres (mm)</Td>
                                    <Td isNumeric>25.4</Td>
                                </Tr>
                                <Tr>
                                    <Td>feet</Td>
                                    <Td>centimetres (cm)</Td>
                                    <Td isNumeric>30.48</Td>
                                </Tr>
                                <Tr>
                                    <Td>yards</Td>
                                    <Td>metres (m)</Td>
                                    <Td isNumeric>0.91444</Td>
                                </Tr>
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>To convert</Th>
                                    <Th>into</Th>
                                    <Th isNumeric>multiply by</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}
