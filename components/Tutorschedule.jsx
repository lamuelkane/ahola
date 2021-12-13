import { v4 as uuidv4 } from 'uuid';
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {setUser} from '../actions/User'
import {hideeventmodal} from '../actions/Event'
import CloseIcon from '@mui/icons-material/Close';
import {getlessoninactualtime, getaccuratehours2, getlessonintimezone} from './utils'
import axios from 'axios'

const Tutorschedule = ({weeks}) => {
     
    const {user: tutor, eventday: day, sever} = useSelector((state) => state);
    const {timezone, firstname: name, _id : id} = tutor

      const [student, setstudent] = useState()
      const [rate, setrate] = useState(0)
      const dispatch = useDispatch()

    const lesson = {
        id: uuidv4(),
        tutor: {
            id,
            name,
        },
        student,
        day: day,
        timezone,
        rate
    }


    return !day?.exist ? ( <form className={`bg-white ontop rounded-lg shadow-2xl w-1/4`}>
    <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
        <span className={`text-gray-400`}>lesson</span>
        <button className={` text-gray-400`}  onClick={e => {
            e.preventDefault()
            dispatch(hideeventmodal())
            }}><CloseIcon /> </button>
    </header>
    <div className={`p-3`}>
            <select name="" id="" className={`w-80 margin-auto`} onChange={e => {
                const {target : {value}} = e
                console.log(value)
                if(value !== 'select student'){
                    const stuu = {
                        name: tutor?.students.find(st => st.id == value).name,
                        id: tutor?.students.find(st => st.id == value).id
                    }
                    setstudent(stuu)
                const sample = tutor?.students.find(stu => stu.id === value).rate
                setrate(sample)
                }
                else{
                    setstudent(null)
                }
            }}>
                <option>select student</option>
                {
                    tutor?.students.map((stu) => (
                        <option value={stu.id} key={stu.id}>{stu.name}</option>
                    ))
                }
            </select>
        <div className="bg-blue-50 items-center margin text-sm flex justify-between p-3">
           Schedule new lesson for {getlessoninactualtime(lesson)} 
        </div>
        <button onClick={async(e) => 
            {e.preventDefault()
                if (!student) {
                    alert('please select a student')
                    return
                }
            try{
                const {data} = await axios.get(`${sever}/api/users/student/${student.id}`)
                setstudent({
                    id: data._id,
                    name: data.firstname
                })
                tutor.lessons.push(lesson)
                data.lessons.push(lesson)
                const {data: res} = await axios.post(`${sever}/api/users/student/update`, data)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, tutor)
                localStorage.setItem('user', JSON.stringify(tutor))
                dispatch(setUser(sever))
                alert('everything went fine')
            } catch(err) {
              alert(err)
            }
        }
        } className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
            Schedule Lesson
        </button>
    </div>
</form>) : ( <form className={`bg-white ontop rounded-lg shadow-2xl w-1/4`}>
    <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
        <span className={`text-gray-400`}>lesson</span>
        <button className={` text-gray-400`}  onClick={e => {
            e.preventDefault()
           dispatch(hideeventmodal())
            }}><CloseIcon /> </button>
    </header>
    <div className={`p-3`}>
            <div className="bg-blue-50 text-sm margin padding items-center flex justify-between p-3">
                current lesson time {getlessonintimezone(tutor.lessons.find(les => les.id === day.exist))}
                </div>
        <div className="bg-blue-50 items-center flex justify-between p-3">
        <select name="" className={`text-sm`} id="" onChange={e => {
                day.day = e.target.value
            }}>
                {weeks.map((d, i) => (
                    <option key={i} value={d}>{dayjs(d).format('dd')}-{dayjs(d).format('DD')}</option>
                ))}
            </select>
            <select name="" className={`text-sm`} id="" onChange={e => {
                    day.hour = parseInt(e.target.value)
            }}>
                {Array.from(Array(24), (_, i) => i.toString().length > 1 ?  i + ':00' : '0' + i + ':00' ).map((h, dex )=> (
                    <option key={dex} value={dex}>{h}</option>
                ))}
            </select>
        </div>
        <button onClick={async(e) => 
            {e.preventDefault()
            try{
                const les = tutor?.lessons.find(les => les.id == day.exist)
                les.day = day
                les.timezone = tutor.timezone
                const {data} = await axios.get(`${sever}/api/users/student/${les.student.id}`)
                data.lessons.find(l => l.id == les.id).day = day
                const {data: res} = await axios.post(`${sever}/api/users/student/update`, data)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, tutor)
                localStorage.setItem('user', JSON.stringify(tutor))
                alert('everything went fine')
            } catch(err) {
              alert(err)
            }
            
        }
        } className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
            Reschedule Lesson
        </button>
        <button onClick={async(e) => 
            {e.preventDefault()
            try{
                const les = tutor?.lessons.find(les => les.id == day.exist)
                console.log(les)
                if (les) {
                    const {data} = await axios.get(`${sever}/api/users/student/${les.student.id}`)
                    data.lessons =  data.lessons.filter(l => l.id !== les.id)
                    tutor.lessons = tutor.lessons.filter(l => l.id !== les.id)
                    const {data: res} = await axios.post(`${sever}/api/users/student/update`, data)
                    const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, tutor)
                    localStorage.setItem('user', JSON.stringify(tutor))
                    alert('everything went fine')
                   }
                   else{
                       console.log('lesson not found')
                   }
            } catch(err) {
              alert(err)
            }
        }
        }  className="rounded px-3 mt-3 bg-red-500 hover:bg-red-200 w-full py-2 border-red-100">
            Cancel Lesson
        </button>
    </div>
</form>) 
}

export default Tutorschedule
