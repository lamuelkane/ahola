import React, {useState, useReducer, useEffect} from  'react'
import GlobalContext from './Globalcontext'
import {Month, week} from '../reducer/month'
import dayjs from 'dayjs'
import { Eventmodal, Eventreducer } from "../reducer/Event";

const Globalcontextwrapper = (props) => {
    const [monthindex, setMonthindex] = useReducer(Month, dayjs().month())
    const [showeventmodal, setshoweventmodal] = useReducer(Eventmodal, false)
    const [weekindex, setweekindex] = useReducer(week, 0)
    const [events, setevents] = useReducer(Eventreducer, [])
    

    return (
        <GlobalContext.Provider value={{
            monthindex,
            setMonthindex,
            showeventmodal,
            setshoweventmodal,
            weekindex,
            setweekindex,
            events,
            setevents
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default Globalcontextwrapper
