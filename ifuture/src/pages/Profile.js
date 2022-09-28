import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { GlobalContext } from '../components/global/GlobalContext'
import { Flex, Image, Text, Divider } from '@chakra-ui/react'
import EditIcon from '../img/edit.svg'
import { goToLoginPage, goToEditProfilePage } from '../routes/coordinator'
import { useNavigate } from 'react-router-dom'
import OrderHistoryCard from '../components/OrderHistoryCard'


function Profile() {
  const navigate = useNavigate()
  const { profile, orders } = useContext(GlobalContext)

  useEffect(() => {
    !localStorage.getItem("token") && goToLoginPage(navigate)
  }, [])

  return (
    <div>
      <Header name={'Meu Perfil'} />
      <Flex flexDir={'column'} minH={'100vh'} fontFamily={'Roboto'}>
        <Flex flexDir={'column'} padding={'1rem'} gap={'0.3rem'}>
          <Flex justify={'space-between'}>
            <Text>{profile.name}</Text>
            <Image src={EditIcon} onClick={() => goToEditProfilePage(navigate)} _hover={{cursor: 'pointer'}} />
          </Flex>
          <Text>{profile.email}</Text>
          <Text>{profile.cpf}</Text>
        </Flex>
        <Flex flexDir={'column'} background={'#eeeeee'} padding={'1rem'} gap={'0.3rem'}>
          <Flex justify={'space-between'}>
            <Text color={'#b8b8b8'}>Enderço cadastrado</Text>
            <Image src={EditIcon} />
          </Flex>
          <Text>{profile.address}</Text>
        </Flex>
        <Flex flexDir={'column'} padding={'1rem'} gap={'0.3rem'} paddingBottom={'0.3rem'}>
          <Text>Histórico de pedidos</Text>
          <Divider borderBottomWidth={'1px'} opacity={'1'} borderColor={'black'} />
        </Flex>
        <Flex flexDir={'column'}>
          {orders.length > 0 ?
            orders.map((item) => {
              return <OrderHistoryCard 
                totalPrice={item.totalPrice}
                restaurantName={item.restaurantName}
                createdAt={item.createdAt}
                expiresAt={item.expiresAt}
                />
            }) :
            <Text alignSelf={'center'}>Você não realizou nenhum pedido.</Text>
          }
        </Flex>
      </Flex>
      <Navbar page={'profile'} />
    </div>
  )
}

export default Profile