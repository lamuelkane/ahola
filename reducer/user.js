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

export const Currency = (state="USD", action) => {
    switch (action.type) {
        case 'SET_CURRENCY':
            return ( action.payload)
        default:
            return state
    }
}  

export const Currencies = (state=null, action) => {
    switch (action.type) {
        case 'SET_CURRENCIES':
            return ( action.payload)
        default:
            return state
    }
}  
