import React, { useContext } from 'react'
import { Flex, Image, Heading, Text } from '@chakra-ui/react'
import { GlobalContext } from './global/GlobalContext'


export default function RestaurantCard() {
    const { restaurants, filteredRestaurants, filteredCategory, categoryFiltered, getRestaurantDetails } = useContext(GlobalContext)
    return (
        <div>
            {categoryFiltered ? filteredCategory.map((item) => {
                return <Flex justify={'center'} flexDir={'column'} align={'center'} marginY={'0.5rem'} onClick={() => getRestaurantDetails(item.id)}>
                    <Image src={item.logoUrl} borderTopRadius={'10px'} h={'7.5rem'} w={'90%'} border={'1px solid #b8b8b8'} borderBottom={'0'}/>
                    <Flex flexDir={'column'} w={'90%'} paddingTop={'0.75rem'} paddingX={'1rem'} paddingBottom={'1rem'} borderTop={'0'} border={'1px solid #b8b8b8'} h={'4.25rem'} borderBottomRadius={'10px'}>
                        <Heading color={'#e8222e'} fontSize={'1rem'} fontWeight={'400'} fontFamily={'Roboto'} margin={0}>{item.name}</Heading>
                        <Flex justify={'space-between'} color={'#b8b8b8'}>
                            <Text fontFamily={'Roboto'}>{(item.deliveryTime - 10) + ' - ' + (item.deliveryTime + 10) + ' min'}</Text>
                            <Text fontFamily={'Roboto'}>{'Frete R$' + (item.shipping) + ',00'}</Text>
                        </Flex>
                    </Flex>
                </Flex>
            }) :
            filteredRestaurants.map((item) => {
                return <Flex justify={'center'} flexDir={'column'} align={'center'} marginY={'0.5rem'} onClick={() => getRestaurantDetails(item.id)}>
                    <Image src={item.logoUrl} borderTopRadius={'10px'} h={'7.5rem'} w={'90%'} border={'1px solid #b8b8b8'} borderBottom={'0'}/>
                    <Flex flexDir={'column'} w={'90%'} paddingTop={'0.75rem'} paddingX={'1rem'} paddingBottom={'1rem'} borderTop={'0'} border={'1px solid #b8b8b8'} h={'5rem'} borderBottomRadius={'10px'} gap={'0.5rem'}>
                        <Heading color={'#e8222e'} fontSize={'1rem'} fontWeight={'400'} fontFamily={'Roboto'} margin={0}>{item.name}</Heading>
                        <Flex justify={'space-between'} color={'#b8b8b8'}>
                            <Text fontFamily={'Roboto'}>{(item.deliveryTime - 10) + ' - ' + (item.deliveryTime + 10) + ' min'}</Text>
                            <Text fontFamily={'Roboto'}>{'Frete R$' + (item.shipping) + ',00'}</Text>
                        </Flex>
                    </Flex>
                </Flex>})}
        </div>
    )
}
