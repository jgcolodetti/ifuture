import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

export default function Header() {
  return (
    <Flex boxShadow={'0 0.5px 0 0 rgba(0, 0, 0, 0.25)'} justify={'center'} h={'2.75rem'} align={'center'}>
        <Text fontFamily={'Roboto'}>Ifuture</Text>
    </Flex>
  )
}
