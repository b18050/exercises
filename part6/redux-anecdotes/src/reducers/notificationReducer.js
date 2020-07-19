const notification = 'So, You have  chosen death, Those bastards lied to me .'

const notificationReducer  = (state = notification , action ) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return state
        default:
            return state
    }
}

export const notify = () => {
    return {
      type: 'NOTIFICATION'
    }
  }

export default notificationReducer
