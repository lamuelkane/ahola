export const User = (state=null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return ( action.payload)
        case 'REMOVE_USER':
            return (action.payload)
        default:
            return state
    }
}  