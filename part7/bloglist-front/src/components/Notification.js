import React from 'react'

const Notification = ({ message, error }) => {
  if(message===null){
    return null
  }
  if(message!==null && error===false){
    return(
      <div className="message">
        {message}
      </div>
    )
  } else {
    return(
      <div className="error">
        {message}
      </div>
    )
  }
}

export default Notification