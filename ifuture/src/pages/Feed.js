import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../components/global/GlobalContext'
import { Flex, Input, InputGroup, InputLeftElement, Text, Alert, Image, AlertTitle, AlertDescription, Spinner } from '@chakra-ui/react'
import RestaurantCard from '../components/RestaurantCard'
import { SearchIcon } from '@chakra-ui/icons'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { goToLoginPage } from '../routes/coordinator'
import Clock from '../img/clock.svg'


export default function Feed() {
    const { getRestaurants, restaurants, setSearchInput, category, filterCategory, searchInput, filteredRestaurants, getActiveOrder, activeOrder, activeOrderInfo, isLoading } = useContext(GlobalContext)
    const categories = ['Árabe', 'Asiática', 'Hamburguer', 'Italiana', 'Sorvetes', 'Carnes', 'Baiana', 'Petiscos', 'Mexicana']
    const navigate = useNavigate()
    const [newPrice, setNewPrice] = useState('')

    useEffect(() => {
        getRestaurants()
        !localStorage.getItem("token") && goToLoginPage(navigate)
    }, [])

    useEffect(() => {
        if (activeOrder && activeOrderInfo.totalPrice.toString().includes('.')) {
            setNewPrice(activeOrderInfo.totalPrice + '0')
        } else {
            setNewPrice(activeOrderInfo.totalPrice + '.00')
        }
    }, [activeOrderInfo])

    return (
        <Flex flexDir={'column'} fontFamily={'Roboto'}>
            <Header name='iFuture' onFeed={true}></Header>
            <Flex flexDir={'column'} fontFamily={'Roboto'} minH={'100vh'}>
                <InputGroup marginBottom={'10px'} w={'90%'} alignSelf={'center'} alignItems={'center'} justifyContent={'center'} marginY={'0.5rem'}>
                    <InputLeftElement
                        pointerEvents='none'
                        paddingY={'1.75rem'}
                        children={<SearchIcon color='#b8b8b8' />}
                    />
                    <Input value={searchInput} type='text' placeholder='Restaurante' _placeholder={{ color: '#d0d0d0' }} paddingY={'1.75rem'} onChange={(e) => setSearchInput(e.target.value)} />
                </InputGroup>
                <Flex overflow={'scroll'} overflowX={'scroll'} w={'100%'} h={'2.625rem'} alignItems={'center'} paddingX={'1rem'} gap={'3rem'} marginY={'0.5rem'}>
                    {categories.map((item) => {
                        return <>{(category === item) ? <Text color={'#e8222e'} onClick={() => filterCategory(item)}>{item}</Text> : <Text onClick={() => filterCategory(item)}>{item}</Text>}</>
                    })}
                </Flex>
                {isLoading ? <Spinner alignSelf={'center'} margin={'2rem'} size={'lg'} /> : <RestaurantCard></RestaurantCard>}
                {(filteredRestaurants.length === 0 && !isLoading) && <Text alignSelf={'center'} fontFamily={'Roboto'} paddingTop={'1rem'}>Não encontramos :(</Text>}
            </Flex>
            {(activeOrder) && <Alert
                position='sticky'
                variant='subtle'
                padding='1.5rem'
                height='7.35rem'
                bottom='49'
                background='#e8222e'
                opacity='0.9'
            >
                <Image src={Clock} />
                <Flex flexDir={'column'} justifyContent={'left'} marginLeft={'1.5rem'}>
                    <AlertTitle fontFamily={'Roboto'} fontSize={'1rem'} color={'white'} fontWeight={'400'}>
                        Pedido em andamento
                    </AlertTitle>
                    <AlertDescription fontFamily={'Roboto'}>
                        {activeOrderInfo.restaurantName}
                    </AlertDescription>
                    <AlertDescription fontFamily={'Roboto'} fontWeight={'bold'} >
                        SUBTOTAL R${newPrice}
                    </AlertDescription>
                </Flex>
            </Alert>}
            <Navbar page={'feed'}></Navbar>
        </Flex>
    )
}

