import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ErrNotif = styled.div`
background: red;
border: solid;
padding: 20;
borderWidth: 1;
display: flex;
justify-content: center;
`

const Notif = styled.div`
background: green;
border: solid;
padding: 20;
borderWidth: 1;
display: flex;
justify-content: center;
`

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)
  if(notification.message && notification.error === false){
    return(
      <Notif>
        <div name='notification'>
          {notification.message}
        </div>
      </Notif>)}
  if(notification.message && notification.error === true) {
    return(
      <ErrNotif>
        <div name='notification'>
          {notification.message}
        </div>
      </ErrNotif>
    )
  } else {
    return(
      <div></div>)
  }
}

export default Notification