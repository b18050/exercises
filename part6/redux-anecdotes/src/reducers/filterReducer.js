const filterReducer  = (state = [] , action) => {
    switch(action.type) {
        case 'FILTER':
            const message = action.data.message
            const newState = `${message}`
            return newState
    default:
        return state
    }
}

export default filterReducer