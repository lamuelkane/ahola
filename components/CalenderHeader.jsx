import React, {useContext} from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GlobalContext from '../context/Globalcontext'
import {nextmonth, prevmonth, resetmonth, prevweek, nextweek, resetweek} from '../actions/month'
import dayjs from 'dayjs'



const CalenderHeader = () => {

    const {setMonthindex, monthindex, weekindex, setweekindex} = useContext(GlobalContext)
  
    return (
        <header className={`px-4 py-2 flex items-center`}>
            <img src="./images/calenderlogo.png" className={`mr-2 w-12 h-12`} alt="" />
            <h1 className="mr-10 text-xl text-grey-500 font-bold">Calender</h1>
            <button onClick={e => setMonthindex(resetmonth(dayjs().month()))} className="border rounded py-2 px-4 mr-5">
                today
            </button>
            <button className="text-grey-600 mx-2" onClick={e => setweekindex(prevweek(weekindex  - 1))}>
                <ArrowBackIosIcon />
            </button>
            <button className="text-grey-600 mx-2" onClick={e => setweekindex(nextweek(weekindex + 1))}>
                <ArrowForwardIosIcon />
            </button>
            <h2 className={`ml-4 text-xl text-grey-500 -font-bold`}>
                {dayjs(new Date(dayjs().year(), monthindex)).format('MMMM YYYY')}
            </h2>
        </header>
    )
}

export default CalenderHeader
