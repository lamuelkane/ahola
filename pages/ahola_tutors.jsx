import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer'
import Notification from '../components/Notification';
import styles from '../styles/Admin.module.css'
import Tutortable from '../components/Tutortable'
import Head from 'next/head'

const ahola_tutors = () => {
    const {sever} = useSelector((state) => state);
    const [tutors, settutors] = useState([])
    const gettutors = async() => {
      try {
        const {data} = await axios.get(`${sever}/api/users/tutors`)
        settutors(data)
      } catch (error) {
        Notification({
          title:"Error",
          message:`an error ocurred while getting tutors`,
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
        gettutors()
    }, [])
    return (
        <div>
          <Head>
                <title>Ahola Tutors</title>
                <link rel="icon" href="./images/logo1.png" />
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script>
            </Head>
            <AdminHeader />
            <main className={`${styles.main}`}>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            
            {/* Replace with your content */}
            <Tutortable tutors={tutors} gettutors={gettutors} />
            {/* /End replace */}
          </div>
        </main>
        <Footer />
        </div>
    )
}

export default ahola_tutors
