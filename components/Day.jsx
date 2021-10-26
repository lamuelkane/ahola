import React, {useContext, useEffect, useState} from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../context/Globalcontext'
import {addevent, remove, getevents} from '../actions/Event'

const Day = ({day, rowindx, row, hours}) => {
    const {events, setevents} = useContext(GlobalContext)

    const getnowclass = (index) => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? parseInt(dayjs().format('HH')) == index ? 'text-red-700 border-dashed border-2 border-red-600' : ' border-grey-200' : ' border-grey-200'
    }

    const geteventclass = (day, hour) => {
         let tur = events.find(e => e.day == day.toISOString() && e.i == hour)
         if(tur){
            return 'bg-blue-600'
         }
         return ''
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
                  <p onClick={e => {console.log(day, i)
                    const event = {
                        day,
                        i
                    }
                    setevents(addevent(events, event))
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
