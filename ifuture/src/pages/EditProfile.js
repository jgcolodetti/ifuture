import React, { useContext, useEffect } from 'react'
import { Flex, Button, Heading, Text, Input, FormControl, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import Header from '../components/Header'
import { goToLoginPage } from '../routes/coordinator'
import { useForm } from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../components/global/GlobalContext'

export default function EditProfile() {
    const { form, onChange } = useForm({ name: '', email: '', cpf: '' })
    const { errors, profile, editProfile } = useContext(GlobalContext)
    const navigate = useNavigate()

    useEffect(() => {
        !localStorage.getItem("token") && goToLoginPage(navigate)
    }, [])

    return (
        <div>
            <Header name={'Editar'} onEditProfile={true} />
            <Flex flexDir={'column'} padding={'1rem'} fontFamily={'Roboto'}>
                <FormControl id='name' isRequired isInvalid={errors.name}>
                    <FormHelperText marginBottom={'2px'} paddingLeft={'15px'}>Nome*</FormHelperText>
                    <Input placeholder={profile.name} value={form.name} _placeholder={{ color: 'black' }} h={'3.5rem'} onChange={onChange} type={'text'} name={'name'}></Input>
                    <FormErrorMessage>Nome inválido.</FormErrorMessage>
                </FormControl>
                <FormControl id='email' isRequired isInvalid={errors.email}>
                    <FormHelperText marginBottom={'2px'} paddingLeft={'15px'}>Email*</FormHelperText>
                    <Input placeholder={profile.email} value={form.email} _placeholder={{ color: 'black' }} h={'3.5rem'} onChange={onChange} type={'email'} name={'email'}></Input>
                    <FormErrorMessage>E-mail inválido.</FormErrorMessage>
                </FormControl>
                <FormControl id='cpf' isRequired isInvalid={errors.cpf}>
                    <FormHelperText marginBottom={'2px'} paddingLeft={'15px'}>CPF*</FormHelperText>
                    <Input placeholder={profile.cpf} value={form.cpf} _placeholder={{ color: 'black' }} h={'3.5rem'} onChange={onChange} type={'text'} name={'cpf'}></Input>
                    <FormErrorMessage>CPF inválido.</FormErrorMessage>
                </FormControl>
                <Button background={'#E8222E'} borderRadius={'0'} h={'2.625rem'} fontWeight={'400'} marginTop={'1rem'} onClick={() => editProfile(form)}>Salvar</Button>
            </Flex>
        </div>
    )
}
