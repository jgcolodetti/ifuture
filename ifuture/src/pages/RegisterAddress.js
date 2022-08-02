import React, { useContext, useState } from 'react'
import { Flex, Input, Button, Heading, Image, Text, FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import { useForm } from '../hooks/useForm'
import { GlobalContext } from '../components/global/GlobalContext'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterAddress() {
  const { form, onChange } = useForm({ street: '', number: '', neighbourhood: '', city: '', state: '', complement: '' })
  const { errors, registerAddress } = useContext(GlobalContext)
  const navigate = useNavigate()

  return (
    <Flex flexDir={'center'} justify={'center'} align={'center'} paddingTop={'5.5rem'} fontFamily={'Roboto'}>
      <Flex flexDir={'column'} gap={'1rem'} w={'90%'}>
        <Heading alignSelf={'center'} fontSize={'1.125rem'} paddingY={'0.75rem'} fontWeight={'400'} fontFamily={'Roboto'}>Meu endereço</Heading>
        <FormControl id='street' isRequired isInvalid={errors.street}>
          <FormHelperText marginBottom={'5px'}>Logradouro</FormHelperText>
          <Input placeholder={'Rua / Av.'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'text'} name={'street'}></Input>
          <FormErrorMessage>Campo deve ser preenchido.</FormErrorMessage>
        </FormControl>
        <FormControl id='number' isRequired isInvalid={errors.number}>
          <FormHelperText marginBottom={'5px'}>Número</FormHelperText>
          <Input placeholder={'Número'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'number'} name={'number'}></Input>
          <FormErrorMessage>Campo deve ser preenchido.</FormErrorMessage>
        </FormControl>
        <FormControl id='complement'>
          <FormHelperText marginBottom={'5px'}>Complemento</FormHelperText>
          <Input placeholder={'Apto./Bloco'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'text'} name={'complement'}></Input>
        </FormControl>
        <FormControl id='neighbourhood' isRequired isInvalid={errors.neighbourhood}>
          <FormHelperText marginBottom={'5px'}>Bairro</FormHelperText>
          <Input placeholder={'Bairro'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'text'} name={'neighbourhood'}></Input>
          <FormErrorMessage>Campo deve ser preenchido.</FormErrorMessage>
        </FormControl>
        <FormControl id='city' isRequired isInvalid={errors.city}>
          <FormHelperText marginBottom={'5px'}>Cidade</FormHelperText>
          <Input placeholder={'Cidade'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'text'} name={'city'}></Input>
          <FormErrorMessage>Campo deve ser preenchido.</FormErrorMessage>
        </FormControl>
        <FormControl id='state' isRequired isInvalid={errors.state}>
          <FormHelperText marginBottom={'5px'}>Estado</FormHelperText>
          <Input placeholder={'Estado'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'text'} name={'state'}></Input>
          <FormErrorMessage>Campo deve ser preenchido.</FormErrorMessage>
        </FormControl>
        <Button background={'#E8222E'} borderRadius={'0'} h={'2.625rem'} fontWeight={'400'} onClick={() => registerAddress(form)}>Criar</Button>
      </Flex>
    </Flex>
  )
}
