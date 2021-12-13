import React, {useContext} from 'react'
import Createeventbutton from './Createeventbutton'
import dayjs from 'dayjs'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {nextmonth, prevmonth, resetmonth} from '../actions/month'
import GlobalContext from '../context/Globalcontext'
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Sidebar = () => {

    const dispatch = useDispatch()
    const {monthindex} = useSelector((state) => state);
    // console.log(dayjs().year(), dayjs().month(), dayjs(new Date(dayjs().year(), dayjs().month(), -1)));

    return (
        <div className={`border p-5 w-64`}>
          <h2>Color Assignments</h2>
          <div className="text-yellow-400">unconfirmed lessons</div>
          <div className="text-green-600">future lessons</div>
          <div className="text-blue-900">confirmed lessons</div>
        </div>
    )
}

export default Sidebar
