export const Eventmodal = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return ( action.payload)
        case 'HIDE':
            return (action.payload)
        default:
            return state
    }
}  

export const Eventreducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            return ( action.payload)
        case 'REMOVE_EVENT':
            return (action.payload)
        default:
            return state
    }
}  