import React, { useEffect, useState} from 'react'
import dayjs from 'dayjs'
import {getlessonintimezone} from './utils'
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
         let les = user?.lessons.find(e => new Date(getlessonintimezone(e)).getDate() == new Date(day.toISOString()).getDate() &&  new Date(getlessonintimezone(e)).getHours() == hour)
         if(les){
          if(new Date(getlessonintimezone(les)).getTime() < new Date().getTime()) {
            if(les.confirmed){
              return 'bg-blue-900 cursor-not-allowed hover:bg-blue-900'
            }
            return 'bg-yellow-400 hover:bg-yellow-500'
          }
            return 'bg-green-600 hover:bg-green-500'
         }
         if (new Date(getlessonintimezone({
          day: {
            day : day.toISOString(),
            hour
          },
          timezone: user?.timezone
        })).getTime() < new Date().getTime() && !les) {
          return 'cursor-not-allowed'
        }
         return 'hover:bg-blue-200'
    }

    const geteventname = (day, hour) => {
      let les = user?.lessons.find(e => new Date(getlessonintimezone(e)).getDate() == new Date(day.toISOString()).getDate() &&  new Date(getlessonintimezone(e)).getHours() == hour)
      if(les){
       if (user?.type === 'student') {
         return les.tutor.name
       }
         return les.student.name
      }
      return ''
 }

 const getaccuratehours2 = (lesson) => {
  if(lesson?.toString()?.length == 1) {
    return '0' + lesson
  }

  return lesson
}

 const getlessonintimezone2 = (lesson) => {
  const year2 = parseInt(lesson?.day?.day?.slice(0, 4))
  const month2 = parseInt(lesson?.day?.day?.slice(5, 8)) - 1
  const day1 = parseInt(lesson?.day?.day?.slice(8, 10)) 

  const day = dayjs(new Date(year2, month2 , day1)).format('ddd')
  const month = dayjs(new Date(year2, month2 , day1)).format('MMM')
  const date = dayjs(new Date(year2, month2 , day1)).format('DD')
  const year = dayjs(new Date(year2, month2 , day1)).format('YYYY')
  const time = getaccuratehours2(lesson?.day?.hour)
  const les = day + " " + month + ' ' + date + ' ' + year + ' ' + time + ':00' +  '  ' + lesson?.timezone?.offset + ' ' + "(" + lesson?.timezone?.name + ')'
   console.log(new Date(les.toString()), les, lesson?.day?.day, day, month, year, date)
  return new Date(les).toLocaleString()
}

   useEffect(() => {
    getlessonintimezone2(user?.lessons[0])
   }, [user])

    return (
      <div>
        {
             hours.map((h, i) => (
                <div key={i} className={`border cursor-pointer ${styles.calenderday} ${geteventclass(day, i)}  flex flex-col ${getnowclass(i)}`}>
                <header className={`flex flex-col items-center ${styles.eventname} text-white text-sm`}>{geteventname(day, i)}</header>
                  <p onClick={e => {
                    const les =  user?.lessons.find(e => new Date(getlessonintimezone(e)).getDate() == new Date(day.toISOString()).getDate() &&  new Date(getlessonintimezone(e)).getHours() == i)
                    if (new Date(getlessonintimezone({
                      day: {
                        day : day.toISOString(),
                        hour: i
                      },
                      timezone: user?.timezone
                    })).getTime() < new Date().getTime() && !les) {
                      return
                    }
                    if(les){
                      if (new Date(getlessonintimezone(les)).getTime() < new Date().getTime()) {
                      if(les?.confirmed){
                        return
                      } 
                    }
                    }
                    dispatch({
                      type: 'SET_DAY',
                      payload: {
                        day,
                        hour: i,
                        exist: les?.id || false
                      }
                    })
                    dispatch(showeventmodalaction())
                }} className={`text-xs font-thin text-opacity-5 p-6 my-1 text-center`}>
                      {h}
                  </p>
            </div>  
        )) 
        }
      </div>
    ) 

}
      
export default Day
