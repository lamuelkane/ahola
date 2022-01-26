import {useState, useEffect} from 'react'
import {getMonth} from '../components/utils'
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux';

import Studentschedule from './Studentschedule'
import Tutorschedule from './Tutorschedule'


const Eventmodal = () => {
    const [month, setmonth] = useState(getMonth())
    const [weeks, setweeks] = useState([])
    const [age, setAge] = useState('');
    const [tutor, settutor] = useState(null)
    const dispatch = useDispatch()
    const {weekindex, user, showeventmodal, eventday, sever} = useSelector((state) => state);


    const handleChange = (event) => {
      setAge(event.target.value);
    };

    useEffect(() => {
        localStorage.setItem('day', JSON.stringify(eventday))
        getweeks(weekindex)
    }, [eventday])


      let getweeks = (index) => {
          let weeks = []
        return  month.find((week, idx)=> {
           if(index == idx){
            // weeks.concat(month[idx].concat(month[idx + 1]).concat(month[idx + 2])).filter(day => new Date(day.toISOString()).getTime() > new Date().getTime())
               localStorage.setItem('weeks',  JSON.stringify(weeks.concat(month[idx].concat(month[idx + 1]).concat(month[idx + 2]))))
               const neweek = JSON.parse(localStorage.getItem('weeks')).filter(day => new Date(day).getTime() > new Date().getTime())
               localStorage.setItem('weeks', JSON.stringify(neweek))
               setweeks(neweek)
               return weeks.concat(month[idx + 1].concat(month[idx + 2]))
          }
           })
     }


    return (
        <>
    { showeventmodal &&   <div className={`h-screen fixed bg-transparent w-full left-0 top-0 flex justify-center items-center`}>
            {
            user?.type === 'student' ? <Studentschedule weeks={weeks} />
            : <Tutorschedule weeks={weeks} />
            }
        </div> }
        </>
    )
}

export default Eventmodal
