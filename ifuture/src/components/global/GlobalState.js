import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from './GlobalContext'
import { baseURL } from '../../constants/baseURL'
import { goToFeedPage, goToRestaurantPage } from '../../routes/coordinator'
import { Navigate, useNavigate } from 'react-router-dom'

export default function GlobalState(props) {
    const [errors, setErrors] = useState({ email: false, password: false, name: false, cpf: false, confirmPassword: false, street: false, city: false, state: false, number: false, neighbourhood: false })
    const [user, setUser] = useState({})
    const [restaurants, setRestaurants] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [category, setCategory] = useState('')
    const [categoryFiltered, setCategoryFiltered] = useState(false)
    const [restaurantDetails, setRestaurantDetails] = useState({})
    const [restaurantProducts, setRestaurantProducts] = useState([])
    const [profile, setProfile] = useState({})
    const [cartProducts, setCartProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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
                localStorage.setItem('token', res.data.token)
                setErrors({ email: false, password: false })
                goToFeedPage(navigate)
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
        setIsLoading(true)
        axios.get(baseURL + '/restaurants', {
            headers: {
                auth: localStorage.getItem('token')
            }
        })
            .then((res) => {
                setRestaurants(res.data.restaurants)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const filterCategory = (categoryInput) => {
        setCategory(categoryInput)
        if (categoryInput === category) {
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

    const getRestaurantDetails = (id) => {
        axios.get(baseURL + `/restaurants/${id}`, {
            headers: {
                auth: localStorage.getItem('token')
            }
        })
            .then((res) => {
                setRestaurantDetails(res.data.restaurant)
                setRestaurantProducts(res.data.restaurant.products)
                goToRestaurantPage(navigate, id)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getProfile = () => {
        axios.get(baseURL + '/profile', {
            headers: {
                auth: localStorage.getItem('token')
            }
        })
            .then((res) => {
                setProfile(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const placeOrder = (paymentMethod, restaurantId) => {
        if (cartProducts.length === 0) {
            return
        }
        const products = cartProducts.map((item) => {
            let obj = {
                id: item.id,
                quantity: item.quantity
            }
            return obj
        })
        console.log(products)
        const body = {
            products: products,
            paymentMethod: paymentMethod
        }
        axios.post(baseURL + `/restaurants/${restaurantId}/order`, body, {
            headers: {
                auth: localStorage.getItem('token')
            }
        })
        setCartProducts([])
        localStorage.setItem('cartProducts', JSON.stringify([]))
        const cartProductsNames = cartProducts.map((item) => {
            return item.name
        })
        for (let i = 0; i < cartProductsNames.length; i++) {
            localStorage.removeItem(cartProductsNames[i].name)
        }
    }

    const [activeOrderInfo, setActiveOrderInfo] = useState({})
    const [activeOrder, setActiveOrder] = useState(false)

    const getActiveOrder = () => {
        axios.get(baseURL + '/active-order', {
            headers: {
                auth: localStorage.getItem('token')
            }
        }).then((res) => {
            if (res.data.order !== null) {
                setActiveOrder(true)
            } else {
                setActiveOrder(false)
            }
            setActiveOrderInfo(res.data.order)
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getProfile()
            getActiveOrder()
        }
    }, [])

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
        categoryFiltered,
        getRestaurantDetails,
        restaurantDetails,
        restaurantProducts,
        getProfile,
        profile,
        cartProducts,
        setCartProducts,
        setRestaurantDetails,
        placeOrder,
        getActiveOrder,
        activeOrder,
        activeOrderInfo,
        isLoading,
    }

    return (<Provider value={values}>{props.children}</Provider>)
}
