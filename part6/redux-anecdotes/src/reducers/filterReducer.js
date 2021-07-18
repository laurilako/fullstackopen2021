const initialFilter = ['']

const filterReducer = (state = initialFilter, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'FILTERCHANGE': {
            return action.data
        }
        default:
            return state
    }
}

export const filterAction = (filter) => {
    return {
    type: 'FILTERCHANGE',
    data: filter
}}


export default filterReducer