const initialnotification = 'So, You have  chosen death, Those bastards lied to me .'

const notificationReducer  = (state = initialnotification , action) => {
    switch(action.type) {
        case 'VOTE_NOTIFY':
            const message = action.data.message
            const newState = message
            return newState
        case 'CREATE_NOTIFY':
            const content = action.data.content
            const newcontent = content
            return newcontent
    default:
        return state
    }
}

export const notify_vote = message => {
    return {
      type: 'VOTE_NOTIFY',
      data: { message }
    }
  }

export const notify_create = content => {
    return {
      type: 'CREATE_NOTIFY',
      data: { content }
    }
}

export default notificationReducer
