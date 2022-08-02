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
        </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router;