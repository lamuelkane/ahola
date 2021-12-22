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


const Header2 = () => {
    const {weekindex, user} = useSelector((state) => state);

    const getaccuratehours2 = (lesson) => {
        if(lesson.toString().length == 1) {
          return '0' + lesson
        }

        return lesson
}
    
    const getlessonintimezone = (lesson) => {
        const year2 = dayjs(lesson.day.day).year()
        const month2 = dayjs(lesson.day.day).month()
        const day1 = dayjs(lesson.day.day).date()

        console.log(dayjs(lesson.day.day).year(), dayjs(lesson.day.day).month(), dayjs(lesson.day.day).date())

        const day = dayjs(new Date(year2, month2 , day1)).format('ddd')
        const month = dayjs(new Date(year2, month2 , day1)).format('MMM')
        const date = dayjs(new Date(year2, month2 , day1)).format('DD')
        const year = dayjs(new Date(year2, month2 , day1)).format('YYYY')
        const time = getaccuratehours2(lesson?.day?.hour)
        const les = day + " " + month + ' ' + date + ' ' + year + ' ' + time + ':00' +  '  ' + lesson?.timezone?.offset + ' ' + "(" + lesson?.timezone?.name + ')'
        return new Date(les).toLocaleString()
    }

    useEffect(() => {
       JSON.parse(localStorage.getItem('user'))?.lessons.map(les => {
           getlessonintimezone(les)
       })
    }, [user])

    return (
        <>
                test
        </>
    )
}

export default Header2
