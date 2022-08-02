import React, { useContext, useState } from 'react'
import { Flex, Input, Button, Heading, Image, Text, FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import Logo from '../img/logo-future-eats-login.svg'
import { useForm } from '../hooks/useForm'
import { GlobalContext } from '../components/global/GlobalContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
    const { form, onChange } = useForm({ name: '', email: '', cpf: '', password: '' })
    const [confirmPassword, setConfirmPassword] = useState('')
    const { userSignup, errors } = useContext(GlobalContext)
    const navigate = useNavigate() 

    return (
        <Flex flexDir={'center'} justify={'center'} align={'center'} paddingTop={'5.5rem'} fontFamily={'Roboto'}>
            <Flex flexDir={'column'} gap={'1rem'} w={'90%'}>
                <Image src={Logo} w={'30%'} alignSelf={'center'} />
                <Heading alignSelf={'center'} fontSize={'1.125rem'} paddingY={'0.75rem'} fontWeight={'400'} fontFamily={'Roboto'}>Cadastrar</Heading>
                <FormControl id='name' isRequired isInvalid={errors.name}>
                    <FormHelperText marginBottom={'5px'}>Nome</FormHelperText>
                    <Input placeholder={'Nome e sobrenome'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'text'} name={'name'}></Input>
                    <FormErrorMessage>Campo deve ser preenchido.</FormErrorMessage>
                </FormControl>
                <FormControl id='email' isRequired isInvalid={errors.email}>
                    <FormHelperText marginBottom={'5px'}>Email</FormHelperText>
                    <Input placeholder={'email@email.com'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'email'} name={'email'}></Input>
                    <FormErrorMessage>Email inválido.</FormErrorMessage>
                </FormControl>
                <FormControl id='cpf' isRequired isInvalid={errors.cpf}>
                    <FormHelperText marginBottom={'5px'}>CPF</FormHelperText>
                    <Input placeholder={'000.000.000-00'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'text'} name={'cpf'}></Input>
                    <FormErrorMessage>Cpf inválido.</FormErrorMessage>
                </FormControl>
                <FormControl id='password' isRequired isInvalid={errors.password}>
                    <FormHelperText marginBottom={'5px'}>Senha</FormHelperText>
                    <Input placeholder={'Mínimo 6 caracteres'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'password'} name={'password'}></Input>
                    <FormErrorMessage>Senha inválida.</FormErrorMessage>
                </FormControl>
                <FormControl id='confirm-password' isRequired isInvalid={errors.confirmPassword}>
                    <FormHelperText marginBottom={'5px'}>Confirmar</FormHelperText>
                    <Input placeholder={'Confirme a senha anterior'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={(e) => setConfirmPassword(e.target.value)} type={'password'}></Input>
                    <FormErrorMessage>Senha inválida.</FormErrorMessage>
                </FormControl>
                <Button background={'#E8222E'} borderRadius={'0'} h={'2.625rem'} fontWeight={'400'} onClick={() => userSignup(form, confirmPassword)}>Criar</Button>
            </Flex>
        </Flex>
    )
}
