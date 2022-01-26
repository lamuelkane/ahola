import AdminHeader from '../components/AdminHeader'
import Table from '../components/Table'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Admin.module.css'
import Notification from '../components/Notification'
import Head from 'next/head'




export default function Example() {
  const {sever} = useSelector((state) => state);
  const [tutors, settutors] = useState([])
  const gettutors = async() => {
    try {
      const {data} = await axios.get(`${sever}/api/users/registeredtutors`)
      settutors(data)
    } catch (error) {
      Notification({
        title:"Error",
        message:`an error ocurred while getting registered tutors`,
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
  }, [sever])

  return (
    <>
      <div className="min-h-full">
          <Head>
                <title>Admin Dashboard</title>
                <link rel="icon" href="./images/logo1.png" />
                {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
            </Head>
        <AdminHeader />
        <main className={`${styles.main}`}>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Table tutors={tutors} gettutors={gettutors} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
