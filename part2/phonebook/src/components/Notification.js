import React from 'react'

const Notification = ({ message, isError }) => {
    if(message===''){
        return null
    }
    if(message!=='' && isError===false)
        return(
            <div className="message">
                {message}
            </div>
            )
    else {
        return(
            <div className="error">
                {message}
            </div>
        )
    }
}

export default Notification