import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useSelector, useDispatch} from 'react-redux';
import DashBoardHeader from '../components/DashBoardHeader'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import Notification from '../components/Notification';
import ReactNotification from "react-notifications-component";
import axios from 'axios'
import {setUser} from '../actions/User'
import Header2 from '../components/Header2'


const Test = () => {
    const {weekindex, user} = useSelector((state) => state);

    const getaccuratehours2 = (lesson) => {
        if(lesson.toString().length == 1) {
          return '0' + lesson
        }

        return lesson
}
 const getlessonintimezone = (lesson) => {
    const month = dayjs(new Date(lesson.day.year, lesson.day.month , lesson.day.date)).format('MMM')
    const date = dayjs(new Date(lesson.day.year, lesson.day.month , lesson.day.date)).format('DD')
    const year = dayjs(new Date(lesson.day.year, lesson.day.month , lesson.day.date)).format('YYYY')
    const time = getaccuratehours2(lesson?.day?.hour)
    const les = lesson.day.day + " " + month + ' ' + date + ' ' + year + '  ' + time + ':00' +  '  ' + lesson?.timezone?.offset + ' ' + "(" + lesson?.timezone?.name + ')'
    // console.log(dayjs('Wed Dec 22 2021 12:00  GMT+14:00 (Pacific/Kiritimati)').tz('Pacific/Kiritimati').toLocaleString())
    console.log(les)
    // console.log(dayjs(les).toLocaleString(), new Date(les).toLocaleString(), les)
    // console.log(dayjs("2013-11-18 11:55").tz("America/Toronto"))
    return new Date(les).toString()
    
}
    // useEffect(() => {
    //    JSON.parse(localStorage.getItem('user'))?.lessons.map(les => {
    //        getlessonintimezone(les)
    //    })
    // }, [user])

    return (
        <>
          <Header2 />

            {
                user?.lessons.map(les => <div key={les._id}>{getlessonintimezone(les)}</div>)
            }
        </>
    )
}

export default Test
