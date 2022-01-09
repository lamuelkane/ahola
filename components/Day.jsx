import React, { useEffect, useState} from 'react'
import dayjs from 'dayjs'
import {getaccuratehours2, getlessoninactualtime3, getlessonintimezone} from './utils'
import {showeventmodalaction} from '../actions/Event'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Dashboard.module.css'


const Day = ({day, rowindx, row, hours}) => {
    const [lessonid, setlessonid] = useState(false)
    const dispatch = useDispatch()
    const {weekindex, user} = useSelector((state) => state);

    const getnowclass = (index) => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? parseInt(dayjs().format('HH')) == index ? 'text-red-700 border-dashed border-2 border-red-600' : ' border-grey-200' : ' border-grey-200'
    }

    const geteventclass = (day, hour) => {
         let les = user?.lessons.find(e => new Date(getlessonintimezone(e, user?.timezone)).getDate() == day.date() &&  new Date(getlessonintimezone(e, user?.timezone)).getHours() == hour)
         if(les){
          if(new Date(getlessonintimezone(les, user?.timezone)).getTime() < new Date().getTime()) {
            if(les.confirmed){
              return 'bg-blue-900  hover:bg-blue-900'
            }
            return 'bg-yellow-400 hover:bg-yellow-500'
          }
            return 'bg-green-600 hover:bg-green-500'
         }
         
         return 'hover:bg-blue-200'
    }

    const geteventname = (day, hour) => {
      let les = user?.lessons.find(e => new Date(getlessonintimezone(e, user?.timezone)).getDate() == new Date(day.toISOString()).getDate() &&  new Date(getlessonintimezone(e, user?.timezone)).getHours() == hour)
      if(les){
       if (user?.type === 'student') {
         return les.tutor.name
       }
         return les.student.name
      }
      return ''
    }
    return (
      <div>
        {
             hours.map((h, i) => (
                <div key={i} className={`border cursor-pointer ${styles.calenderday} ${geteventclass(day, i)}  flex flex-col ${getnowclass(i)}`}>
                <header className={`flex flex-col items-center ${styles.eventname} text-white text-sm`}>{}</header>
                  <p onClick={e => {
                    const les =  user?.lessons.find(e => new Date(getlessonintimezone(e, user?.timezone)).getDate() == new Date(day.toISOString()).getDate() &&  new Date(getlessonintimezone(e, user?.timezone)).getHours() == i)
                    if(les){
                      if (new Date(getlessonintimezone(les, user?.timezone)).getTime() < new Date().getTime()) {
                      if(les?.confirmed){
                        return
                      } 
                    }
                    }
                    dispatch({
                      type: 'SET_DAY',
                      payload:{
                        day: day.format('ddd'),
                        date: day.date(),
                        month: day.month(),
                        year: day.year(),
                        hour: i,
                        daystring: getlessoninactualtime3(day, i),
                        exist: les?.id || false
                      }
                    })
                    dispatch(showeventmodalaction())
                }} className={`text-xs font-thin ps text-opacity-5 p-6 my-1 text-center`}>
                      {geteventname(day, i) || h}
                  </p>
            </div>  
        )) 
        }
      </div>
    ) 

}
      
export default Day
