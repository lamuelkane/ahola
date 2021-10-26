import React, {useContext} from 'react'
import Createeventbutton from './Createeventbutton'
import dayjs from 'dayjs'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {nextmonth, prevmonth, resetmonth} from '../actions/month'
import GlobalContext from '../context/Globalcontext'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Sidebar = () => {

    const {setMonthindex, monthindex} = useContext(GlobalContext)
    // console.log(dayjs().year(), dayjs().month(), dayjs(new Date(dayjs().year(), dayjs().month(), -1)));

    return (
        <div className={`border p-5 w-64`}>
            <Createeventbutton />
            <div>
            <span></span>
            <button className="text-grey-600 mx-2" onClick={e => console.log(monthindex, dayjs())}>
                <ArrowBackIosIcon />
            </button>
            <button className="text-grey-600 mx-2"  onClick={e => console.log(monthindex, dayjs(new Date()).week())}>
                <ArrowForwardIosIcon />
            </button>
             </div>
        </div>
    )
}

export default Sidebar
