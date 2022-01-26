import React, {useState, useReducer, useEffect} from  'react'
import GlobalContext from './Globalcontext'
import {Month, week} from '../reducer/month'
import dayjs from 'dayjs'
import { Eventmodal, Eventreducer, EventDayreducer } from "../reducer/Event";
import { User , Currency, Currencies, Courses} from "../reducer/user";
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {HYDRATE, createWrapper} from 'next-redux-wrapper'
import {io} from 'socket.io-client'
import thunkMiddleware from 'redux-thunk'


const Globalcontextwrapper = (props) => {
    return (
        <>
        
        </>
    )
}


const bindMiddlware = (middlware) => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middlware))
    }

    return applyMiddleware(...middlware)
}

const reducers = combineReducers({
    showeventmodal: Eventmodal,
    weekindex:week,
    monthindex: Month,
    events:Eventreducer,
    user:User,  
    eventday:EventDayreducer,
    sever:() => 'https://aholasever.herokuapp.com',
    // sever : () => 'http://localhost:5000',
    // sever2:() => 'http://localhost:5001',
    sever2: () => 'https://aholaimageupload.herokuapp.com',
    sever3: () => 'https://videosaverahola.herokuapp.com',
    // socket: () => io('ws://aholasocket.herokuapp.com'),
    socket: () => io('ws://localhost:8000'),
    Currency,
    Currencies,
    Courses
})




const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState
    }
    else{
        return reducers(state, action)
    }
}

const initStore = () => {
    return createStore(reducer, bindMiddlware([thunkMiddleware]))
}

export const Wrapper = createWrapper(initStore)

export default Globalcontextwrapper
