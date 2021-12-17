import React, {useEffect, useState, useContext} from 'react'
import Day from './Day'
import dayjs from 'dayjs'
import GlobalContext from '../context/Globalcontext'
import { useSelector, useDispatch } from 'react-redux';
import {nextmonth, prevmonth, resetmonth, prevweek, nextweek, resetweek} from '../actions/month'

const Month = ({month}) => {
    const [week, setweek] = useState([])
    const dispatch = useDispatch()
    const {weekindex} = useSelector((state) => state);

  let getweek = (index) => {
     return  month.find((week, idx)=> {
        if(index == idx){
            return week
       }
        })
  }

useEffect(() => {
    setweek(getweek(weekindex))
}, [weekindex])

useEffect(() => {
   month.filter((week, idx)=> {
    if(week.find(da => da.format('DD-MM-YY') === dayjs().format('DD-MM-YY'))) {
        dispatch(nextweek(idx))
    }
})
let weeks = Array.from(month[0], (wk) => (
    {
        day: wk.format('dd'),
        date: wk.format('DD')
    }
))
}, [])

    return (
        <div className={`flex-1  grid grid-cols-7 `}>
            {week[0] ? week.map((row, i) => (
                <React.Fragment key={i}>
                    {i === 0 && week[0] && week.map(d => (
                            <p key={d} className="text-sm ml-1  text-indigo-500">{d.format('dd')}-{d.format('DD')}</p>
                    ))}
                        <Day day={row} key={i} rowindx={i} row={row} hours={Array.from(Array(24), (_, i) => i.toString().length > 1 ?  i + ':00' : '0' + i + ':00' )} />
                </React.Fragment>
            )) : <></>}
        </div>
    )
}
export default Month
