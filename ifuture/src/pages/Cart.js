import React, { useContext, useEffect } from 'react'
import { Flex, Image, Heading, Text, RadioGroup, Radio, Button } from '@chakra-ui/react'
import { GlobalContext } from '../components/global/GlobalContext'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ProductCardCart from '../components/ProductCardCart'

export default function Cart() {

    const { getProfile, profile, restaurantDetails, setRestaurantDetails, cartProducts, setCartProducts } = useContext(GlobalContext)
    useEffect(() => {
        getProfile()
        if (localStorage.getItem('cartProducts')) {
            setCartProducts(JSON.parse(localStorage.getItem('cartProducts')))
        }
        if (localStorage.getItem('restaurantDetails')) {
            setRestaurantDetails(JSON.parse(localStorage.getItem('restaurantDetails')))
        }
    }, [])

    const cartProductPrices = cartProducts.map((item) => { return (item.price * item.quantity) })
    const totalPrice = cartProductPrices.reduce((partialSum, a) => partialSum + a, 0).toFixed(1)


    return (
        <Flex flexDir={'column'} >
            <Header name={'Meu carrinho'}></Header>
            <Flex flexDir={'column'} minH={'100vh'}>
                <Flex w={'100%'} flexDir={'column'} h={'4.75rem'} padding={'1rem'} background={'#eeeeee'} fontFamily={'Roboto'}>
                    <Text color={'#b8b8b8'}>Endereço de entrega</Text>
                    <Text>{profile.address}</Text>
                </Flex>
                <Flex flexDir={'column'} padding={'1rem'} gap={'0.2rem'}>
                    <Heading color={'#e8222e'} fontSize={'1rem'} fontWeight={'400'} fontFamily={'Roboto'} margin={0}>{cartProducts.length > 0 && restaurantDetails.name}</Heading>
                    <Text color={'#b8b8b8'} fontFamily={'Roboto'}>{cartProducts.length > 0 && restaurantDetails.address}</Text>
                    <Text fontFamily={'Roboto'} color={'#b8b8b8'}>{cartProducts.length > 0 && (restaurantDetails.deliveryTime - 10) + ' - ' + (restaurantDetails.deliveryTime + 10) + ' min'}</Text>
                    {cartProducts.length > 0 ? cartProducts.map((product) => {
                        return <ProductCardCart
                            photoUrl={product.photoUrl}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            quantity={product.quantity}
                        />
                    }) :
                        <Text fontFamily={'Roboto'} align={"center"} >Carrinho vazio.</Text>}
                    <Text alignSelf={'flex-end'} fontFamily={'Roboto'} marginTop={'0.5rem'}>Frete R${cartProducts.length > 0 ? restaurantDetails.shipping + ',00' : '0.00'}</Text>
                    <Flex justify={'space-between'} fontFamily={'Roboto'}>
                        <Text>SUBTOTAL</Text>
                        <Text color={'#e8222e'} fontSize={'1.125rem'} fontWeight={'bold'}>R${(totalPrice.toString().includes('.')) ? (totalPrice + '0') : (totalPrice + '.00')}</Text>
                    </Flex>
                    <Text fontFamily={'Roboto'} borderBottom={'1px solid black'} paddingBottom={'0.2rem'}>Forma de pagamento</Text>
                    <RadioGroup defaultValue={'1'} display={'flex'} flexDir={'column'} fontFamily={'Roboto'} marginTop={'0.5rem'} gap={'0.4rem'}>
                        <Radio value={'1'} colorScheme={'red'} size={'lg'} >Dinheiro</Radio>
                        <Radio value={'2'} colorScheme={'red'} size={'lg'} >Cartão de crédito</Radio>
                    </RadioGroup>
                    <Button background={'#E8222E'} borderRadius={'0'} h={'2.625rem'} fontWeight={'400'} fontFamily={'Roboto'} marginTop={'1rem'}>Confirmar</Button>
                </Flex>
            </Flex>
            <Navbar page={'cart'}></Navbar>
        </Flex>
    )
}
