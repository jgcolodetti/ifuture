import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from '../pages/Login';
import GlobalState from '../components/global/GlobalState';
import Signup from '../pages/Signup';
import RegisterAddress from '../pages/RegisterAddress';
import Feed from '../pages/Feed';
import Restaurant from '../pages/Restaurant';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalState>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>   
          <Route path='/register-address' element={<RegisterAddress />}></Route>
          <Route path='/feed' element={<Feed />}></Route>
          <Route path='/restaurant/:id' element={<Restaurant />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/profile/edit/user' element={<EditProfile />}></Route>
        </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router;