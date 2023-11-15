'use client'
import { Badge, Box, Button, Container, OrderedList, List, ListItem, Card, CardHeader, CardBody, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { ListIcon } from '@chakra-ui/react'
import { MdCheckCircle, MdSettings } from 'react-icons/md'
import { HeaderNavBar } from "@/app/components/Navigation/HeaderNavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

export default function Page() {

    return (
        <>
            <HeaderNavBar />
            <div className="py-8 flex items-center justify-center">
                <div className="bg-white p-4 shadow-md rounded-md">
                    <Heading as='h3' size='lg'>
                       About
                    </Heading>
                    <p>The supplier service is just a playground and MERN proof of concept.</p>
                    <p>This is just a collection of components that I might use later</p>
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

                    <List spacing={3}>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Assumenda, quia temporibus eveniet a libero incidunt suscipit
                        </ListItem>
                        <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                        </ListItem>
                        {/* You can also use custom icons from react-icons */}
                        <ListItem>
                            <ListIcon as={MdSettings} color='green.500' />
                            Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                        </ListItem>
                    </List>

                    <OrderedList>
                        <ListItem>Lorem ipsum dolor sit amet</ListItem>
                        <ListItem>Consectetur adipiscing elit</ListItem>
                        <ListItem>Integer molestie lorem at massa</ListItem>
                        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                    </OrderedList>

                    <Container maxW='container.sm' className="p-4 shadow-md rounded-md">
                        <Box maxW='32rem'>
                            <Heading mb={4}>Modern online and offline payments for Africa</Heading>
                            <Text fontSize='xl'>
                                Paystack helps businesses in Africa get paid by anyone, anywhere in the
                                world
                            </Text>
                            <Button size='lg' bg="teal" colorScheme='green' mt='24px'>
                                Create a free account
                            </Button>
                        </Box>
                    </Container>

                    <Grid
                        h='200px'
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(5, 1fr)'
                        gap={4}
                    >
                        <GridItem rowSpan={2} colSpan={1} />
                        <GridItem colSpan={3}>
                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                <Box p='6' bg='tomato'>
                                    <Box display='flex' alignItems='baseline'>
                                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                                            New
                                        </Badge>
                                        <Box
                                            color='white'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            textTransform='uppercase'
                                            ml='2'
                                        >
                                            The quick brown fox jumped over the lazy dog.
                                        </Box>
                                    </Box>
                                    <Container maxW='container.lg'>
                                        "container.sm" Container
                                    </Container>
                                </Box>
                            </Box>
                            <Box maxW='lg' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                <Box p='6'>
                                    <Box display='flex' alignItems='baseline'>
                                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                                            New
                                        </Badge>
                                        <Box
                                            color='white'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            textTransform='uppercase'
                                            ml='2'
                                        >
                                            <p>Big time?Big time?Big time?Big time?Big time?Big time?Big time?Big time?Big time?Big time?Big time?Big time?</p>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                        </GridItem>
                    </Grid>
                </div>
            </div>
        </>
    )
}

