import React from 'react'

import { Alert } from '@material-ui/lab'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  console.log(notification)
  if ( notification.length == 0 || notification.message === '' ) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div>
    <Alert severity={notification.type}>
        {notification.message}
    </Alert>
    
  </div>
}

export default Notification