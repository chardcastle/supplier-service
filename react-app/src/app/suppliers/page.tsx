'use client'

import { HeaderNavBar } from "@/app/components/Navigation/HeaderNavBar";
import { Divider, Heading, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import List from "@/app/components/Supplier/List";

export default function Page() {
    return (
        <>
            <HeaderNavBar />
            <div className="py-8 flex items-center justify-center">
                <div className="bg-white p-4 shadow-md rounded-md">
                    <Heading as='h3' size='lg'>
                        Suppliers
                    </Heading>
                    <Divider orientation='horizontal' />
                    <p className={"py-2"}>List of suppliers:</p>
                    <List />
                </div>
            </div>
        </>
    )
}
