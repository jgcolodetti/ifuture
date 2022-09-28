export const goToLoginPage = (navigate) => {
    navigate('/login')
}

export const goToSignUpPage = (navigate) => {
    navigate('/signup')
}

export const goToAddressPage = (navigate) => {
    navigate('/address')
}

export const goToFeedPage = (navigate) => {
    navigate('/feed')
}

export const goToRestaurantPage = (navigate, id) => {
navigate(`/restaurant/${id}`)
}

export const goToCartPage = (navigate) => {
    navigate('/cart')
}

export const goToProfilePage = (navigate) => {
    navigate('/profile')
}

export const goToEditProfilePage = (navigate) => {
    navigate('/profile/edit/user')
}
