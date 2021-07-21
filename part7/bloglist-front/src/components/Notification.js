import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('NOTIFICATION', notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification){
    return(
      <div name='notification' style={style}>
        {notification}
      </div>
    )
  } else {
    return(
      <div></div>)
  }
}

export default Notification