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
import Notification from '../components/Notification';
import Pagination from '@mui/material/Pagination'
import Head from 'next/head'

const Mytutor = () => {
    const {user, sever} = useSelector((state) => state);
    const [tutor, settutor] = useState(null)
    const router = useRouter()
    const [pageNumber, setpageNumber] = useState(1)
    const [productperpage, setproductperpage] = useState(5)
    let pagesVited = (pageNumber - 1) * productperpage

    const handleChange = (event, value) => {
      setpageNumber(value)
    };

    useEffect(() => {
        if(user){
          if(user?.type !== 'teacher') {
            router.push('/login')
          }
        }
    }, [user])

    return (
        <div>
          <Head>
                <title>Students</title>
                <link rel="icon" href="./images/logo1.png" />
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script>
            </Head>
            <div className="border">
                <DashBoardHeader />
            </div>
            <Dashboardsubheader />
            <div className={`${styles.mytutorswrapper} text-sm`} style={{minHeight: '50vh'}}>
              {
                user?.students.slice(pagesVited, pagesVited + 5).map(tut => (
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
            <div className='flex justify-center align-center margin-top'>
             <Pagination count={Math.round(user?.students.length / 5)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary" />
          </div>
            { 
              tutor && <div className={`${styles.tutordetailswrapper}`}>
                <div className={`${styles.tutordetails}`}>
                    <div className={`${styles.tutordetailsclose} pointer`} onClick={e => settutor(null)}>
                      <CloseIcon />
                    </div>
                    <h1 className={`margin-left margin-top center text-xl`}>See more information about you and student {tutor.firstname}</h1>
                    <div className={`${styles.tutorlessonwrapper} text-sm`}>
                    {
                      user?.lessons.filter(les => les.student.id === tutor._id).map(tut => (
                        <div className={`flex justify-between align-center border p-3`} key={tut.id}>
                              <div className={`flex align-center`}>
                                  <div className={`margin-right`}>{new Date(getlessonintimezone(tut)).toLocaleString()} { '    ' }      at $ {tut.rate.toFixed(2)} </div>
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
