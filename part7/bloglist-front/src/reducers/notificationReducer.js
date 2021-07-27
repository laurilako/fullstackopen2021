const initialState = {message: null, error: null}
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

export const setNotification = (message, error, time) => {
  if(timeout) {window.clearTimeout(timeout)}
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: {message: message, error: error}
    })
    timeout = setTimeout(() => {
      dispatch({
        type: 'SET',
        data: {message: null, error: null}
      })
    }, time*1000)
  }
}

export default notificationReducer