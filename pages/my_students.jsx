import React, {useEffect, useState} from 'react'
import DashBoardHeader from '../components/DashBoardHeader'
import Dashboardsubheader from '../components/Dashboardsubheader'
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router'
import styles from '../styles/Studentdashboard.module.css'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {getlessonintimezone, checklessonstate} from '../components/utils'
import axios from 'axios'
import Footer from '../components/Footer'
import {setUser} from '../actions/User'
import Notification from '../components/Notification';

const Mytutor = () => {
    const {user, sever} = useSelector((state) => state);
    const [tutor, settutor] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if(user){
          if(user?.type !== 'teacher') {
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
            <div className={`${styles.mytutorswrapper} text-sm`} style={{minHeight: '50vh'}}>
              {
                user?.students.map(tut => (
                  <div className={`flex justify-between align-center border p-3`} key={tut.id}>
                        <div className={`flex align-center`}>
                            <div className={`margin-right`}>  <Avatar sx={{ bgcolor: deepPurple[500] }}>{tut.name.slice(0, 2)}</Avatar></div>
                            <div className={`margin-right`}>{tut.name}</div>
                            <div className={`margin-right`}>${tut.rate} per hour</div>
                        </div>
                        <div className={`margin-right`}>{tut.hours} hours left</div>
                        <div className={`flex`}>
                            <div className={`margin-right`}>
                              <Link href={`messages?convid=${user._id + tut.id}&&name=${tut.name}&&rcrid=${tut.id}`} >message </Link>
                            </div>
                            <div className={`margin-right pointer`} onClick={async(e) => {
                              try{
                                const {data} = await axios.get(`${sever}/api/users/student/${tut.id}`)
                                settutor(data)
                              }
                              catch(error) {
                                Notification({
                                  title:"Error",
                                  message:`an error ocurred`,
                                  type:"danger",
                                  container:"top-right",
                                  insert:"top",
                                  animationIn:"fadeInUp",
                                  animationOut:"fadeOut",
                                  duration:10000
                                })
                              }
                            }} >lessons</div>
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
                      user?.lessons.filter(les => les.student.id === tutor._id).map(tut => (
                        <div className={`flex justify-between align-center border p-3`} key={tut.id}>
                              <div className={`flex align-center`}>
                                  <div className={`margin-right`}>{getlessonintimezone(tut)} { '    ' }      at $ {tut.rate.toFixed(2)} </div>
                              </div>
                              <div className={`flex`}>
                                  <div className={`margin-right`}>
                                    { 
                                        checklessonstate(tut) ? <div className={`${tut.confirmed? 'text-teal-500': 'text-red-500'}`}>{tut.confirmed? 'paid' + tut.rate : 'not confirmed'}</div> : 'pending...'
                                    }   
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
