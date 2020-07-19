const initialnotification = 'So, You have  chosen death, Those bastards lied to me .'

const notificationReducer  = (state = initialnotification , action) => {
    switch(action.type) {
        default:
            return state
    }
}

export const notify = message => {
    return {
      type: 'NOTIFICATION',
      data: { message }
    }
  }

export default notificationReducer
