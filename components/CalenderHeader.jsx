import React, {useContext} from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import GlobalContext from '../context/Globalcontext'
import {resetmonth, prevweek, nextweek} from '../actions/month'
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs'
import {getaccuratehours2, getlessonintimezone,  getlessoninactualtime2} from '../components/utils'
import Link from 'next/link'




const CalenderHeader = () => {
    const {weekindex, monthindex, user} = useSelector((state) => state);
    const dispatch = useDispatch()
    let getnextlesson = () => {
        const lesson = user?.lessons.filter(les => new Date(getlessonintimezone(les, user?.timezone)).getTime() > (new Date().getTime() - 3600000)).sort(function(a,b){
            return new Date(getlessonintimezone(a, user?.timezone)).getTime() - new Date(getlessonintimezone(b,  user?.timezone )).getTime()
        });
        return lesson ? lesson[0] : ''
    }
    return (
        <header className={`px-4 py-2 flex items-center border`}>
            <img src="./images/calenderlogo.png" className={`mr-2 w-12 h-12 hidexs`} alt="" />
            <h1 className="mr-10 text-xl text-grey-500 font-bold hidexs">Calender</h1>
            <h2 className={`ml-4 text-xs text-grey-500 -font-bold`}>
                {dayjs(new Date(dayjs().year(), monthindex)).format('MMMM YYYY')}
            </h2>
            <button className="text-grey-600 text-xs mx-2" onClick={e => dispatch(prevweek(weekindex  - 1))}>
                <ArrowBackIosIcon />
            </button>
            <button className="text-grey-600 mx-2" onClick={e => dispatch(nextweek(weekindex + 1))}>
                <ArrowForwardIosIcon />
            </button>
            <div>
                 { getnextlesson()?<div className={`flex text-xs align-center`}>  <h3 className={`margin-right`}>Next lesson </h3>
                    <div className="margin-right text-xs text-indigo-500">{new Date(getlessonintimezone(getnextlesson(), user?.timezone)).toLocaleString()}</div>
                     { new Date(getlessonintimezone(getnextlesson(), user?.timezone)).getTime() - new Date().getTime() < 300000 && <button onClick={e => {
                        //  console.log(new Date(getlessonintimezone(getnextlesson())).getTime() - new Date().getTime())
                     }} className="border rounded py-2 px-4 mr-5">
                         <a href={`https://aholalessons.netlify.app?id=${getnextlesson().id}&&user=${user?.firstname}`} rel='noreferrer' target="_blank" >Join lesson </a>
                    </button> } </div> 
            : <div className="margin-right text-xs">No Upcomming Lesson</div> }
            </div>
        </header>
    )
}

export default CalenderHeader
