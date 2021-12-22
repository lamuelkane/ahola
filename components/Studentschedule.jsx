import { v4 as uuidv4 } from 'uuid';
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import {setUser} from '../actions/User'
import {hideeventmodal} from '../actions/Event'
import CloseIcon from '@mui/icons-material/Close';
import {getlessoninactualtime, getlessoninactualtime2, getlessoninactualtime3, getlessonintimezone,} from './utils'
import axios from 'axios'
import Notification from '../components/Notification';
import {newlessonbooked, lessonrescheduled, lessoncancelled} from '../Templates/tutor'

const Studentschedule = ({weeks}) => {
    const [rate, setrate] = useState(0)
    const [tutor, settutor] = useState()
    const dispatch = useDispatch()
    const {user: student, eventday: day, sever} = useSelector((state) => state);

    const {timezone, firstname: name, _id : id} = student
    let lesson = {
        id: uuidv4(),
        student: {
            id,
            name,
        },
        tutor: tutor,
        day: day,
        timezone,
        rate
    }


    return !day?.exist ? ( <form className={`bg-white ontop rounded-lg shadow-2xl w-1/4 minw`}>
    <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
        <span className={`text-gray-400`}>lesson</span>
        <button className={` text-gray-400`}  onClick={e => {
            e.preventDefault()
            dispatch(hideeventmodal())
            }}><CloseIcon /> </button>
    </header>
    <div className={`p-3`}>
            <select name="" id="" className={`w-80 text-sm margin-auto`} onChange={e => {
                const {target : {value}} = e
                if(value !== 'select tutor'){
                settutor(value)
                const sample = student?.tutors.find(tut => tut.id === value).rate
                setrate(sample)
                }
                else{
                    settutor(null)
                }
            }}>
                 <option>select tutor</option>
                {
                    student?.tutors.map((tut) => (
                        <option value={tut.id} key={tut.id}>{tut.name}</option>
                    ))
                }
            </select>
        <div className="bg-blue-50 text-xs margin padding items-center flex justify-between p-3">
           Schedule new lesson for {day.daystring}
           {/* Schedule new lesson for {getlessoninactualtime2(lesson)} */}
        </div>
        <button onClick={async(e) => 
            {
                e.preventDefault()
                if(!tutor) {
                    Notification({
                        title:"Tutor Not Selected",
                        message:`Please Select A Tutor`,
                        type:"info",
                        container:"top-right",
                        insert:"top",
                        animationIn:"fadeInUp",
                        animationOut:"fadeOut",
                        duration:10000
                      })
                    return
                }
            try{
                console.log(day)
                // return
                const {data} = await axios.get(`${sever}/api/users/tutor/${tutor}`)
                const exist = true
                // const exist = data.availiability[0][dayjs(day.day).format('dd').toLowerCase()].find(h => h == day.hour)
                if(exist || exist == 0){
                    settutor({
                        id: data._id,
                        name: data.firstname
                    })
                    lesson.tutor = {
                        id: data._id,
                        name: data.firstname
                    }
                    student.lessons.push(lesson)
                    data.lessons.push(lesson)
                    const {data: res} = await axios.post(`${sever}/api/users/student/update`, student)
                    const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, data)
                    const sample =  await axios.post(`${sever}/api/users/lessonbooked`, {
                        template: newlessonbooked(data.firstname, student.firstname, data.rate, data.lessons.length),
                        email: data.email
                    })
                    console.log(lesson, student.lessons)
                    localStorage.setItem('user', JSON.stringify(student))
                    dispatch(setUser(sever))
                    Notification({
                        title:"Lesson Booked",
                        message:`successfully booked lesson with Tutor ${data.firstname}`,
                        type:"success",
                        container:"top-right",
                        insert:"top",
                        animationIn:"fadeInUp",
                        animationOut:"fadeOut",
                        duration:10000
                      })
                }
                else{
                    Notification({
                        title:"Tutor Unavailable",
                        message:`sorry, tutor is not available at that time`,
                        type:"info",
                        container:"top-right",
                        insert:"top",
                        animationIn:"fadeInUp",
                        animationOut:"fadeOut",
                        duration:10000
                      })
                }
            } catch(err) {
                alert(err)
                Notification({
                    title:"Error",
                    message:`An error occured`,
                    type:"info",
                    container:"top-right",
                    insert:"top",
                    animationIn:"fadeInUp",
                    animationOut:"fadeOut",
                    duration:10000
                  })
            }
        }
        } className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
            Schedule Lesson
        </button>
    </div>
</form>)
 : 
    ( <form className={`bg-white ontop rounded-lg shadow-2xl w-1/4 minw`}>
    <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
        <span className={`text-gray-400`}>lesson</span>
        <button className={` text-gray-400`}  onClick={e => {
            e.preventDefault()
            dispatch(hideeventmodal())
            }}><CloseIcon /> </button>
    </header>
    <div className={`p-3`}>
    <div className="bg-blue-50 text-sm margin padding items-center flex justify-between p-3">
           current lesson time {getlessonintimezone(student.lessons.find(les => les.id === day.exist))}
        </div>
        <div className="bg-blue-50 items-center flex justify-between p-3">
        <select name="" id="" className={`text-sm`} onChange={e => {
                // day.day = e.target.value
                day.day = getlessoninactualtime3(dayjs(e.target.value), day.hour)
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
                const les = student?.lessons.find(les => les.id == day.exist)
                les.day = day
                les.timezone = student.timezone
                const {data} = await axios.get(`${sever}/api/users/tutor/${les.tutor.id}`)
                data.lessons.find(l => l.id == les.id).day = day
                const {data: res} = await axios.post(`${sever}/api/users/student/update`, student)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, data)
                await axios.post(`${sever}/api/users/lessonrescheduled`, {
                    template: lessonrescheduled(data.firstname, student.firstname),
                    email: data.email
                  })
                localStorage.setItem('user', JSON.stringify(student))
                dispatch(setUser(sever))
                Notification({
                    title:"Lesson Rescheduled",
                    message:`successfully rescheduled lesson `,
                    type:"success",
                    container:"top-right",
                    insert:"top",
                    animationIn:"fadeInUp",
                    animationOut:"fadeOut",
                    duration:10000
                  })
            } catch(err) {
                alert(err)
                Notification({
                    title:"Error",
                    message:`An error Occured`,
                    type:"danger",
                    container:"top-right",
                    insert:"top",
                    animationIn:"fadeInUp",
                    animationOut:"fadeOut",
                    duration:10000
                  })
            }
        }
        } className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
            Reschedule Lesson
        </button>
        <button onClick={async(e) => 
            {
            e.preventDefault()
            try{
                const les = student?.lessons.find(les => les.id == day.exist)
               if (les) {
                const {data} = await axios.get(`${sever}/api/users/tutor/${les.tutor.id}`)
                data.lessons =  data.lessons.filter(l => l.id !== les.id)
                student.lessons = student.lessons.filter(l => l.id !== les.id)
                const {data: res} = await axios.post(`${sever}/api/users/student/update`, student)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, data)
                await axios.post(`${sever}/api/users/lessoncancelled`, {
                    template: lessoncancelled(data.firstname, student.firstname),
                    email: data.email
                  })
                localStorage.setItem('user', JSON.stringify(student))
                Notification({
                    title:"Lesson Cancelled",
                    message:`Lesson cancelled successfully`,
                    type:"success",
                    container:"top-right",
                    insert:"top",
                    animationIn:"fadeInUp",
                    animationOut:"fadeOut",
                    duration:10000
                  })
               }
               else{
                Notification({
                    title:"Error",
                    message:`Lesson not found`,
                    type:"danger",
                    container:"top-right",
                    insert:"top",
                    animationIn:"fadeInUp",
                    animationOut:"fadeOut",
                    duration:10000
                  })
               }
            } catch(err) {
                Notification({
                    title:"Error",
                    message:`An error occured`,
                    type:"danger",
                    container:"top-right",
                    insert:"top",
                    animationIn:"fadeInUp",
                    animationOut:"fadeOut",
                    duration:10000
                  })
            }
        }
        }  className="rounded px-3 mt-3 bg-red-500 hover:bg-red-200 w-full py-2 border-red-100">
            Cancel Lesson
        </button>
    </div>
</form>)


}

export default Studentschedule
