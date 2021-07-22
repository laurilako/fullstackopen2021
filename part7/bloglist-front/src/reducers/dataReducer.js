import userService from '../services/users'

const dataReducer = (state = null, action) => {
  switch (action.type) {
  case 'GET': {
    return action.data
  }
  default: {
    return state
  }
  }
}


export const initData = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'GET',
      data: data
    })
  }
}

export default dataReducer