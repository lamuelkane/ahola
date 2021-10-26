export const Month = (state, action) => {
    switch (action.type) {
        case 'MONTH_INCREASE':
            return ( action.payload)
        case 'MONTH_DECREASE':
            return (action.payload)
        case 'RESET_MONTH':
            return (action.payload)
        default:
            return state
    }
}  

export const week = (state, action) => {
    switch (action.type) {
        case 'WEEK_INCREASE':
            return ( action.payload)
        case 'WEEK_DECREASE':
            return (action.payload)
        case 'RESET_WEEK':
            return (action.payload)
        default:
            return state
    }
}  