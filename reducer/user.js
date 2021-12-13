export const User = (state=null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return ( action.payload)
        case 'MONTH_DECREASE':
            return (action.payload)
        case 'RESET_MONTH':
            return (action.payload)
        default:
            return state
    }
}  