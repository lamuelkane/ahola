import React, {useContext, useEffect, useState} from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../context/Globalcontext'
import {addevent, remove, getevents,  showeventmodalaction, hideeventmodal } from '../actions/Event'
import moment from 'moment-timezone'

const Day = ({day, rowindx, row, hours}) => {
    const {events, setevents, seteventday, eventday, setshoweventmodal, user} = useContext(GlobalContext)
    const [lessonid, setlessonid] = useState(false)

    const getlessonintimezone = (lesson) => {
      const year = parseInt(lesson.day.day.slice(0, 4))
      const month = parseInt(lesson.day.day.slice(5, 8)) - 1
      const day1 = parseInt(lesson.day.day.slice(8, 10))
      
      return new Date(year, month , day1, parseInt(getaccuratehours2(lesson))).toLocaleString('en-us', {timeZone: lesson.timezone.name, })
  }

  const getaccuratehours2 = (lesson) => {
          if(lesson.day.hour.toString().length == 1) {
            return '0' + lesson.day.hour
          }

          return lesson.day.hour
}

    const getnowclass = (index) => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? parseInt(dayjs().format('HH')) == index ? 'text-red-700 border-dashed border-2 border-red-600' : ' border-grey-200' : ' border-grey-200'
    }

    const geteventclass = (day, hour) => {
        for(let i = 0; i < user.lessons.lenght; i++){
          const lesson = user.lessons[i]
        if(lesson.day.day == day.toISOString() && new Date(getlessonintimezone(lesson)).getHours() == hour) {
          alert('working')
          return 'bg-blue-600'
        }
          return ''
        }
        //  let tur = user.lessons.find(e => e.day.day == day.toISOString() && e.day.hour == hour)
        //  if(tur){
        //     return 'bg-blue-600'
        //  }
        //  return ''
    }

    useEffect(() => {
        setevents(getevents())
    }, [events])



    return (
      <div>
        {
             hours.map((h, i) => (
                <div key={i} className={`border cursor-pointer  ${geteventclass(day, i)}  hover:bg-blue-200 flex flex-col ${getnowclass(i)}`}>
                <header className={`flex flex-col items-center`}></header>
                  <p onClick={e => {
                    // const event = {
                    //     day,
                    //     i
                    // }
                    // setevents(addevent(events, event))
                    seteventday({
                      type: 'SET_DAY',
                      payload: {
                        day,
                        hour: i,
                        exist: user.lessons.find(e => e.day.day == day.toISOString() && e.day.hour == i) ? user.lessons.find(e => e.day.day == day.toISOString() && e.day.hour == i).id : false
                      }
                    })

                    setshoweventmodal(showeventmodalaction())
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
