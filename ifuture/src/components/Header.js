import React from 'react'
import { Flex, Text, Image, Grid } from '@chakra-ui/react'
import BackArrow from '../img/back.svg'
import { goToFeedPage } from '../routes/coordinator'
import { useNavigate } from 'react-router-dom'

export default function Header({name, onRestaurant, onFeed}) {

  const navigate = useNavigate()

  return (
    <Grid boxShadow={'0 0.5px 0 0 rgba(0, 0, 0, 0.25)'} h={'2.75rem'} templateColumns={'1fr 5fr 1fr'} alignItems={'center'} justifyItems={'center'}>
        {onRestaurant && <Image src={BackArrow} onClick={() => goToFeedPage(navigate)}/>}
        {!onRestaurant && <div></div>}
        <Text fontFamily={'Roboto'}>{name}</Text>
    </Grid>
  )
}
