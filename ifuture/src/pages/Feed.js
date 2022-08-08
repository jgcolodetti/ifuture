import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../components/global/GlobalContext'
import { Flex, Input, InputGroup, InputLeftElement, ButtonGroup, Text } from '@chakra-ui/react'
import RestaurantCard from '../components/RestaurantCard'
import { SearchIcon } from '@chakra-ui/icons'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'


export default function Feed() {
    const { getRestaurants, restaurants, setSearchInput, category, filterCategory, searchInput, filteredRestaurants } = useContext(GlobalContext)
    const categories = ['Árabe', 'Asiática', 'Hamburguer', 'Italiana', 'Sorvetes', 'Carnes', 'Baiana', 'Petiscos', 'Mexicana']
    const navigate = useNavigate()

    useEffect(() => {
        getRestaurants()
    }, [])
    
    return (
        <Flex flexDir={'column'} fontFamily={'Roboto'}>
            <Header name='iFuture' onFeed={true}></Header>
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
            <RestaurantCard></RestaurantCard>
            {filteredRestaurants.length === 0 && <Text alignSelf={'center'} fontFamily={'Roboto'} paddingTop={'1rem'}>Não encontramos :(</Text>}
            <Navbar page={'feed'}></Navbar>
        </Flex>
    )
}

