import React, { useContext, useEffect } from 'react'
import { Flex, Image, Heading, Text, Divider } from '@chakra-ui/react'
import { GlobalContext } from '../components/global/GlobalContext'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

export default function Cart() {

    const { getProfile, profile, restaurantDetails } = useContext(GlobalContext)
    useEffect(() => {
        getProfile()
    }, [])

    return (
        <Flex flexDir={'column'} minH={'100vh'}>
            <Header name={'Meu carrinho'}></Header>
            <Flex w={'100%'} flexDir={'column'} h={'4.75rem'} padding={'1rem'} background={'#eeeeee'} fontFamily={'Roboto'}>
                <Text color={'#b8b8b8'}>Endereço de entrega</Text>
                <Text>{profile.address}</Text>
            </Flex>
            <Flex flexDir={'column'}>
                <Heading color={'#e8222e'} fontSize={'1rem'} fontWeight={'400'} fontFamily={'Roboto'} margin={0}>{restaurantDetails.name}</Heading>
            </Flex>
            <Navbar page={'cart'}></Navbar>
        </Flex>
    )
}
