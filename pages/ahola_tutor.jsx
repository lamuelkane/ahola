import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import RegisteredTutor from '../components/RegisteredTutor'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer'
import axios from 'axios'
import styles from '../styles/Admin.module.css'
import Notification from '../components/Notification';
import Head from 'next/head'


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
            <Head>
                <title>Tutor Information</title>
                <link rel="icon" href="./images/logo1.png" />
                {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
            </Head>
            <AdminHeader />
            <div className={`${styles.main} w-80 margin-auto margin-top`}>
                 <RegisteredTutor tutor={tutor} hide />
            </div>
            <Footer />
        </div>
    )
}

export default Registered_tutors
