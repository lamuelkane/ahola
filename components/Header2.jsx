import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useSelector, useDispatch} from 'react-redux';
import DashBoardHeader from '../components/DashBoardHeader'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import Notification from '../components/Notification';
import ReactNotification from "react-notifications-component";
import axios from 'axios'
import {setUser} from '../actions/User'


const Header2 = () => {
    const [show, setshow] = useState(false)
    const [courses, setcourses] = useState([])
    const {user, sever} = useSelector((state) => state);
     const dispatch = useDispatch()

    useEffect(() => {
        if(!user) {
          dispatch(setUser(sever))
        }
    }, [user])


    const getsubjects = async() => {
        try {
          const {data} = await axios.get(`${sever}/api/users/subjects`)
          setcourses(data)
        } catch (error) {
          Notification({
            title:"Error",
            message:`an error ocurred while saving conversation`,
            type:"danger",
            container:"top-right",
            insert:"top",
            animationIn:"fadeInUp",
            animationOut:"fadeOut",
            duration:10000
          })
        }
      }

        useEffect(() => {
            getsubjects()
        }, [])

    return (
        <>
        <div className={`flex align-center ${styles.homeheader}`}>
            <Link href='/'>
                <img src="./images/logo.png" alt=""  className={`${styles.homeimg} pointer`} />
            </Link>
            <div className={`${styles.headerlarge} text-gray-500`}>
                <span className={`${styles.homenaveitem} ${styles.coursesholder}`}>
                    <Link href='/tutors'>tutors</Link>
                    <div className={`${styles.courses} bg-gray-500`}>
                        {
                            courses.map(sub =>  <span className={`text-gray-100 text-sm`}><Link href={`tutors?teach=${sub.subject}&&country=all&&lp=0&&hp=100`} key={sub._id}>{sub.subject}</Link></span>)
                        }
                    </div>
                </span>
                <span className={`${styles.homenaveitem}`}><Link href='/tutor_register'>register</Link></span>
                <span className={`${styles.homenaveitem}`}><Link href='/student_register'>courses</Link></span>
                <span className={`${styles.homenaveitem}`}><Link href='/login'>login</Link></span>
            </div>
            {!show ? <div className={`hide showxs pointer`} onClick={e => setshow(true)}>
                <ReorderIcon />
            </div> :
            <div className={`hide showxs pointer`} onClick={e => setshow(false)}>
                <CloseIcon />
            </div> }
        </div>
            <div className={`${styles.headersmall} bg-gray-500  ${show ? 'showsidebar' : 'sidebar'}`}>
                <soan className={`${styles.homenaveitem}`}><Link href='/tutors'>Tutors</Link></soan>
                <span className={`${styles.homenaveitem}`}><Link href='/tutor_register'>Register</Link></span>
                <span className={`${styles.homenaveitem}`}><Link href='/login'>Login</Link></span>
                <span className={`${styles.homenaveitem} text-indigo-700`}>Feature Languages</span>
                {
                courses.filter(course => course.type === 'lang').slice(0, 6).map(co => <span className={`${styles.homenaveitems} margin-left text-gray-200 text-sm`}><Link href={`tutors?teach=${co.subject}&&country=all&&lp=0&&hp=100`}>{co.subject}</Link></span>)
                }
                <span className={`${styles.homenaveitem} text-indigo-700`}>Feature Subjects</span>
                {
                courses.filter(course => course.type === 'subj').slice(0, 6).map(co => <span className={`${styles.homenaveitems} margin-left text-gray-200 text-sm`}><Link href={`tutors?teach=${co.subject}&&country=all&&lp=0&&hp=100`}>{co.subject}</Link></span>)
                }
                <span className={`${styles.homenaveitem} text-indigo-700`}>Feature Skills</span>
                {
                courses.filter(course => course.type === 'skill').slice(0, 6).map(co => <span className={`${styles.homenaveitems} margin-left text-gray-200 text-sm`}><Link href={`tutors?teach=${co.subject}&&country=all&&lp=0&&hp=100`}>{co.subject}</Link></span>)
                }
            </div>
        <ReactNotification />
        </>
    )
}

export default Header2
