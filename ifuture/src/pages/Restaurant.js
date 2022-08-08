import React, { useContext, useEffect, useState } from 'react'
import { Flex, Image, Heading, Text, Divider } from '@chakra-ui/react'
import Header from '../components/Header'
import RestaurantCardProfile from '../components/RestaurantCardProfile'
import { GlobalContext } from '../components/global/GlobalContext'
import ProductCard from '../components/ProductCard'
import ConfirmProduct from '../components/ConfirmProduct'
import Navbar from '../components/Navbar'


export default function Restaurant() {
    const { setConfirmProduct, confirmProduct, restaurantProducts, restaurantDetails } = useContext(GlobalContext)
    const productCategories = restaurantProducts.map((item) => {
        return item.category
    })

    let uniqueCategories = [...new Set(productCategories)]

    useEffect(() => {
        localStorage.setItem('restaurantDetails', JSON.stringify(restaurantDetails))
    }, [])

    return (
        <div>
            <Header name='Restaurante' onRestaurant={true}></Header>
            <RestaurantCardProfile></RestaurantCardProfile>
            {uniqueCategories.map((item) => {
                const products = restaurantProducts.filter((product) => {
                    return product.category === item
                })
                return <Flex flexDir={'column'}>
                    <Text fontFamily={'Roboto'} marginX={'1rem'} borderBottom={'1px solid black'} w={'90%'} h={'1.75rem'} marginBottom={'0.25rem'} marginTop={'1rem'}>{item}</Text>
                    {products.map((product) => {
                        return <Flex align={'center'} justify={'center'} flexDir={'column'}>
                            <ProductCard
                                photoUrl={product.photoUrl}
                                name={product.name}
                                price={product.price}
                                description={product.description}
                                ></ProductCard>
                        </Flex>
                    })}
                </Flex>
            })}
            <Navbar></Navbar>
        </div>
    )
}
