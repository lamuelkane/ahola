export const showeventmodalaction = () => ({
    type:'SHOW',
    payload: true
})

export const hideeventmodal = () => ({
    type:'HIDE',
    payload: false
})


export const addevent = (events, event) => {
    events = [...events, event]
    localStorage.setItem('events', JSON.stringify(events))
    return {
        type:'ADD_EVENT',
        payload: events
    }
}

export const remove = (events, id) => {
    events = events.filter(ev => ev.id !== id)
    localStorage.setItem('events', JSON.stringify(events))
    return {
        type:'REMOVE_EVENT',
        payload: events
    }
}

export const getevents = () => {
   let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')): []
    return {
        type:'REMOVE_EVENT',
        payload: events
    }
}