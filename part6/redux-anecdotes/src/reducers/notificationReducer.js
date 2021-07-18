const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type){
        case 'VOTE_NOTIFICATION': {
            return state = `you voted '${action.data.content}'`
        }
        case 'NEW_NOTIFICATION': {
            return state = `you added '${action.data.content}'`
        }
        case 'NULL': {
            return state = null
        }
        default:
            return state
    }
}

export const nullNotification = () => {
    return {
        type: 'NULL',
        data: null
    }
}

export const onCreation = (content) => {
    return {
        type: 'NEW_NOTIFICATION',
        data: { content }
    }
}

export const onVote = (content) => {
    return {
    type: 'VOTE_NOTIFICATION',
    data: { content } }
}

export default notificationReducer