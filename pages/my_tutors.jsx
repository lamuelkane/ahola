import React, {useEffect, useContext, useState} from 'react'
import DashBoardHeader from '../components/DashBoardHeader'
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router'
import styles from '../styles/Studentdashboard.module.css'
import Dashboardsubheader from '../components/Dashboardsubheader'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {getaccuratehours2, checklessonstate, getlessonintimezone, getlessoninactualtime2} from '../components/utils'
import axios from 'axios'
import {setUser} from '../actions/User'
import Footer from '../components/Footer'
import Tutorpopup from '../components/Tutorpopup';
import Notification from '../components/Notification';

const Mytutor = () => {
    const dispatch = useDispatch()
    const {user, sever} = useSelector((state) => state);
    const [tutor, settutor] = useState(null)
    const [open, setOpen] = useState(false)
    const [teacher, setteacher] = useState({})
    const router = useRouter()

    const confirmlesson = async(tu, tut) => { 
      try{
        tu.lessons.find(les => les.id == tut.id).confirmed = true
        tu.currentearning += tut.rate 
        tu.totalearnings += tut.rate
        tu.students.find(stu => stu.id === user._id).hours -= 1
        tut.confirmed = true
        user.tutors.find(t => t.id == tut.tutor.id).hours -= 1
        const {data} = await axios.post(`${sever}/api/users/student/update`, user)
        const {data: res} = await axios.post(`${sever}/api/users/tutor/update`, tu)
        dispatch(setUser(sever, user))
      }
      catch(error) {
        Notification({
          title:"ERROR",
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

    const confirmlesson2 = (tut, lessons) => {
      lessons.map(l => {
        l.confirmed = true
        tut.currentearning += l.rate * 0.8
        tut.totalearnings += l.rate * 0.8
      })

    }
    
    const filterlessons = (user, lessons) => {
      lessons.map(les => {
        user.lessons = user.lessons.filter(le => le.id !== les.id)
      })
    }


    useEffect(() => {
        if(user){
          if(user?.type !== 'student') {
            router.push('/login')
          }
        }
    }, [user])

    return (
        <div>
            <div className="border">
                <DashBoardHeader />
            </div>
            <Dashboardsubheader />
            <Tutorpopup open={open} setOpen={setOpen} teacher={teacher} />
            <div className={`${styles.mytutorswrapper} text-sm`}>
              {
                user?.tutors.map(tut => (
                  <div className={`flex justify-between align-center border p-3`} key={tut.id}>
                        <div className={`flex align-center`}>
                            <div className={`margin-right`}>  <Avatar sx={{ bgcolor: deepPurple[500] }}>{tut.name.substring(0, 2)}</Avatar></div>
                            <div className={`margin-right`}>{tut.name}</div>
                            <div className={`margin-right`}>${tut.rate} per hour</div>
                        </div>
                        <div className={`margin-right`}>{tut.hours} hours left</div>
                        <div className={`flex`}>
                            <div className={`margin-right`}>
                              <Link href={`messages?convid=${tut.id + user._id}&&name=${tut.name}&&rcrid=${tut.id}`} >message </Link>
                            </div>
                            <div className={`margin-right pointer`} onClick={async(e) => {
                              try{
                                const {data} = await axios.get(`${sever}/api/users/tutor/${tut.id}`)
                                settutor(data)
                              }
                              catch(error) {
                                Notification({
                                  title:"ERROR",
                                  message:`An error occured`,
                                  type:"danger",
                                  container:"top-right",
                                  insert:"top",
                                  animationIn:"fadeInUp",
                                  animationOut:"fadeOut",
                                  duration:10000
                                })
                              }
                            }} >lessons</div>
                            <div className={`margin-right pointer`} onClick={async(e) => {
                              try{
                                const {data} = await axios.get(`${sever}/api/users/tutor/${tut.id}`)
                                setteacher(data)
                                setOpen(true)
                              }
                              catch(error) {
                                Notification({
                                  title:"ERROR",
                                  message:`An error occured`,
                                  type:"danger",
                                  container:"top-right",
                                  insert:"top",
                                  animationIn:"fadeInUp",
                                  animationOut:"fadeOut",
                                  duration:10000
                                })
                              }
                            }} >get more hours</div>
                            <div className={`margin-right pointer`} onClick={async(e) => {
                              try{
                                const {data} = await axios.get(`${sever}/api/users/tutor/${tut.id}`)
                                confirmlesson2(data, data.lessons.filter(le => le.student.id == user._id && !le.confirmed && checklessonstate(le)))
                                user.lessons.filter(le => le.tutor.id == data._id && !le.confirmed && checklessonstate(le)).map(l => {
                                  l.confirmed = true
                                })
                                
                                user.lessons.filter(le => le.tutor.id == data._id  && !checklessonstate(le)).map(l => {
                                  user.currentearning += l.rate
                                })
                                
                                filterlessons(user, user.lessons.filter(le => le.tutor.id === data._id  && !checklessonstate(le)))
                                filterlessons(data, data.lessons.filter(le => le.student.id === user._id  && !checklessonstate(le)))
                                
                                user.tutors = user.tutors.filter(t => t.id !== tut.id)
                                data.students = data.students.filter(st => st.id !== user._id)
                                

                                await axios.post(`${sever}/api/users/student/update`,  user)
                                await axios.post(`${sever}/api/users/tutor/update`, data)
                                Notification({
                                  title:"Success",
                                  message:`Successfully ended lessons with tutor ${data.firstname}`,
                                  type:"success",
                                  container:"top-right",
                                  insert:"top",
                                  animationIn:"fadeInUp",
                                  animationOut:"fadeOut",
                                  duration:10000
                                })
                              }
                              catch(error) {
                                Notification({
                                  title:"ERROR",
                                  message:`An error occured`,
                                  type:"danger",
                                  container:"top-right",
                                  insert:"top",
                                  animationIn:"fadeInUp",
                                  animationOut:"fadeOut",
                                  duration:10000
                                })
                              }
                            }} >stop lessons</div>
                        </div>
                  </div>
                ))
              }
            </div>
            { 
              tutor && <div className={`${styles.tutordetailswrapper}`}>
                <div className={`${styles.tutordetails}`}>
                    <div className={`${styles.tutordetailsclose} pointer`} onClick={e => settutor(null)}>
                      <CloseIcon />
                    </div>
                    <h1 className={`margin-left margin-top center text-xl`}>See more information about you and tutor {tutor.firstname}</h1>
                    <div className={`${styles.tutorlessonwrapper} text-sm`}>
                    {
                      user?.lessons.filter(les => les.tutor.id === tutor._id).map(tut => (
                        <div className={`flex justify-between align-center border p-3`} key={tut.id}>
                              <div className={`flex align-center`}>
                                  <div className={`margin-right`}>{getlessonintimezone(tut)} for $ {tut.rate.toFixed(2)} </div>
                              </div>
                              <div className={`flex`}>
                                  <div className={`margin-right`}>
                                  <FormControlLabel  control={<input type='checkbox' 
                                  className={`margin-right`}
                                  checked={tut.confirmed? true : false} 
                                  disabled={new Date(getlessonintimezone(tut)).getTime() > new Date().getTime() ? true : false || tut.confirmed? true : false}
                                   onClick={e => confirmlesson(tutor, tut)}/>} label="Confirmed" />
                                  </div>
                              </div>
                        </div>
                      ))
                   }
                    </div>
                </div>
              </div>
            }
            <Footer />
        </div>
    )
}

export default Mytutor
