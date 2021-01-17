const initialState = ''

export const setNotification = (content,time) => {
    return async dispatch => {
        await dispatch({
            type: 'SET',
            data: {content}
        }) 
        setTimeout(() => {
            dispatch({
                type: 'REMOVE',
            })
        },time * 1000)
    }
}

export const hideNotification = () => {
    return {
        type: 'REMOVE'
    }
} 

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch(action.type){
        case 'SET': {
            const newState = action.data.content || initialState
            return newState

        }
        case 'REMOVE': {
            const newState = ''
            return newState
        }
        default:
            return state
    }
    
  }
  
  export default notificationReducer 