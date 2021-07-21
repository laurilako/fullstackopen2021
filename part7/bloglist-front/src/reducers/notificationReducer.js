const initialState = null
let timeout = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type){
  case 'SET': {
    return state = action.data
  }
  default:
    return state
  }
}

export const setNotification = (message, time) => {
  if(timeout) {window.clearTimeout(timeout)}
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: message
    })
    timeout = setTimeout(() => {
      dispatch({
        type: 'SET',
        data: null
      })
    }, time*1000)
  }
}

export default notificationReducer