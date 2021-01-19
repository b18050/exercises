export const setNotification = (message,type) => {
  return {
      type: 'SET',
      data: {message,type}
    }
}

export const hideNotification = () => {
  return {
      type: 'REMOVE'
  }
} 

const notificationReducer = (state = [], action) => {
    console.log('state now',state)
    console.log(action)
    switch (action.type) {
      case 'SET':
        const newState = {
          message : action.data.message,
          type : action.data.type
        }
        console.log(newState)
        return newState
      case 'REMOVE':
        const nState = {
          message : '',
          type : null
        }
        return nState
      default:
        return state
    }
  }
export default notificationReducer