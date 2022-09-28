import React, { useEffect, useState } from 'react'
import { Flex, Image, Heading, Text, Divider, Grid } from '@chakra-ui/react'

export default function OrderHistoryCard({ totalPrice, restaurantName, expiresAt, createdAt }) {
    const options = { year: "numeric", month: "short", day: "numeric" }
    const [newPrice, setNewPrice] = useState('')

    useEffect(() => {
        setNewPrice(totalPrice.toFixed(1).replace('.', ',') + '0')
    }, [])

    return (
        <Flex marginX={'1rem'} marginY={'0.3rem'} border={'1px solid #b8b8b8'} flexDir={'column'} padding={'1rem'} borderRadius={'8px'} fontFamily={'Roboto'} gap={'0.3rem'}>
            <Text color={'#e8222e'}>{restaurantName}</Text>
            <Text fontSize={'0.75rem'}>{new Date(createdAt).toLocaleDateString('pt-br', options)}</Text>
            <Text fontWeight={'bold'}>SUBTOTAL R${newPrice}</Text>
        </Flex>
    )
}
