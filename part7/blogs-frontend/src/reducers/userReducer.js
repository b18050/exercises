export const initializeUser = (data) => {
    return {
        type: 'INIT_USER',
        data: data
    }
}

export const setUser = (data) => {
    return {
        type: 'SET_USER',
        data: data
    }
}

const userReducer = (state = null ,action) => {
    // console.log('state now',state)
    console.log(action)
    switch (action.type){
        case 'INIT_USER':
            return action.data
        case 'SET_USER':
            return action.data
        default:
            return state
    }
}

export default userReducer