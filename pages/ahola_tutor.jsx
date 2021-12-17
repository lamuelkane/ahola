import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import RegisteredTutor from '../components/RegisteredTutor'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer'
import axios from 'axios'
import styles from '../styles/Admin.module.css'
import Notification from '../components/Notification';


const Registered_tutors = () => {
    const router = useRouter()
    const [tutor, settutor] = useState({})
    const {sever} = useSelector((state) => state);
    const {id} = router.query

    const gettutor = async() => {
        try {
            const {data} = await axios.get(`${sever}/api/users/tutor/${id}`)
            settutor(data)
        } catch (error) {
            Notification({
                title:"Error",
                message:`an error ocurred while getting tutor information`,
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
       if(id){
        gettutor()
       }
    }, [id])

    return (
        <div>
            <AdminHeader />
            <div className={`${styles.main} w-80 margin-auto margin-top`}>
                 <RegisteredTutor tutor={tutor} />
            </div>
            <Footer />
        </div>
    )
}

export default Registered_tutors
