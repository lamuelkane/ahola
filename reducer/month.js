import dayjs from 'dayjs'

export const Month = (state=dayjs().month(), action) => {
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

export const week = (state=1, action) => {
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