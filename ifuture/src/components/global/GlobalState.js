import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from './GlobalContext'
import { baseURL } from '../../constants/baseURL'
import { goToFeedPage } from '../../routes/coordinator'
import { Navigate, useNavigate } from 'react-router-dom'

export default function GlobalState(props) {
    const [errors, setErrors] = useState({ email: false, password: false, name: false, cpf: false, confirmPassword: false, street: false, city: false, state: false, number: false, neighbourhood: false })
    const [user, setUser] = useState({})
    const [restaurants, setRestaurants] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [category, setCategory] = useState('')
    const [categoryFiltered, setCategoryFiltered] = useState(false)
    const navigate = useNavigate()
    const userLogin = (form) => {
        if (form.email === '' || !form.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setErrors({ email: true })
            return
        }
        if (form.password === '' || (form.password.length < 6)) {
            setErrors({ password: true })
            return
        }
        axios.post(baseURL + '/login', form)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                setErrors({ email: false, password: false })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const userSignup = (form, confirmPassword) => {
        if (form.name === '') {
            setErrors({ name: true })
            return
        }
        if (form.email === '' || !form.email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setErrors({ email: true })
            return
        }
        if (form.cpf === '' || form.cpf.length !== 14) {
            setErrors({ cpf: true })
            return
        }
        if (form.password === '' || (form.password.length < 6)) {
            setErrors({ password: true })
            return
        }
        if (confirmPassword !== form.password) {
            setErrors({ confirmPassword: true })
            return
        }
        axios.post(baseURL + '/signup', form)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                setErrors({ name: false, email: false, password: false, cpf: false, confirmPassword: false })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const registerAddress = (form) => {
        if (form.street === '') {
            setErrors({ street: true })
            return
        }
        if (form.number === '') {
            setErrors({ number: true })
            return
        }
        if (form.neighbourhood === '') {
            setErrors({ neighbourhood: true })
            return
        }
        if (form.city === '') {
            setErrors({ city: true })
            return
        }
        if (form.state === '') {
            setErrors({ state: true })
            return
        }

        axios.put(baseURL + '/address', form, {
            headers: {
                auth: localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                setErrors({ street: false, number: false, neighbourhood: false, city: false, state: false })
                setUser(res.data.user)
                goToFeedPage(navigate)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getRestaurants = () => {
        axios.get(baseURL + '/restaurants', {
            headers: {
                auth: localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res.data)
            setRestaurants(res.data.restaurants)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const filterCategory = (categoryInput) => {
        setCategory(categoryInput)
        if( categoryInput === category) {
            setCategoryFiltered(false)
            setCategory('')
            return
        }
        setCategoryFiltered(true)
    }

    const filteredRestaurants = restaurants.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase())
    })

    const filteredCategory = filteredRestaurants.filter((item) => {
        return item.category === category
    })

    const Provider = GlobalContext.Provider
    const values = {
        userLogin,
        errors,
        userSignup,
        registerAddress,
        getRestaurants,
        restaurants,
        filteredRestaurants,
        setSearchInput,
        filterCategory,
        category,
        filteredCategory,
        categoryFiltered
    }

    return (<Provider value={values}>{props.children}</Provider>)
}
