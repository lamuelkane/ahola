
export const nextmonth = (val) => ({
    type: 'MONTH_INCREASE',
    payload: val
})

export const prevmonth = (val) => ({
    type: 'MONTH_DECREASE',
    payload: val
})

export const resetmonth = (val) => ({
    type: 'RESET_MONTH',
    payload: val
})

export const nextweek = (val) => ({
    type: 'WEEK_INCREASE',
    payload: val
})

export const prevweek = (val) => ({
    type: 'WEEK_DECREASE',
    payload: val
})

export const resetweek = (val) => ({
    type: 'RESET_WEEK',
    payload: val
})

