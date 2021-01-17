const initialState = ''
export const filterAnecdote = (msg) => {
    return {
      type: 'SET_FILTER',
      data: {msg}
    }
}

const filterReducer = (state = initialState, action ) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type){
        case 'SET_FILTER':{
            const msg = action.data.msg
            const newState = msg
            return newState
        }
        default:
            return state
    }
    
}

export default filterReducer