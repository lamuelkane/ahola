export const Eventmodal = (state=false, action) => {
    switch (action.type) {
        case 'SHOW':
            return ( action.payload)
        case 'HIDE':
            return (action.payload)
        default:
            return state
    }
}  



export const Eventreducer = (state= null, action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            return ( action.payload)
        case 'REMOVE_EVENT':
            return (action.payload)
        default:
            return state
    }
}  



export const EventDayreducer = (state=null, action) => {
    switch (action.type) {
        case 'SET_DAY':
            return ( action.payload)
        default:
            return state
    }
}

