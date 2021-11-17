import React, {useState, useReducer, useEffect} from  'react'
import GlobalContext from './Globalcontext'
import {Month, week} from '../reducer/month'
import dayjs from 'dayjs'
import { Eventmodal, Eventreducer, EventDayreducer } from "../reducer/Event";
import { User } from "../reducer/user";

const Globalcontextwrapper = (props) => {
    const [monthindex, setMonthindex] = useReducer(Month, dayjs().month())
    const [showeventmodal, setshoweventmodal] = useReducer(Eventmodal, false)
    const [weekindex, setweekindex] = useReducer(week, 0)
    const [events, setevents] = useReducer(Eventreducer, [])
    const [user, setuser] = useReducer(User, null)
    const [eventday, seteventday] = useReducer(EventDayreducer, null)
    

    return (
        <GlobalContext.Provider value={{
            monthindex,
            setMonthindex,
            showeventmodal,
            setshoweventmodal,
            weekindex,
            setweekindex,
            events,
            setevents,
            sever:'http://localhost:5000',
            user,
            setuser,
            eventday,
            seteventday,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default Globalcontextwrapper
