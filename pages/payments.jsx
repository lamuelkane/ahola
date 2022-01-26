import * as React from 'react';
import {useContext, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import styles from '../styles/Admin.module.css'
import Paymentrequest from '../components/Paymentrequest'
import Notification from '../components/Notification'
import Head from 'next/head'
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer'


export default function Payment() {
  const [amt, setamt] = useState(0)
  const [paymentrequests, setpaymentrequests] = useState([])
  const {user, sever, socket, Courses} = useSelector((state) => state);

  const getpaymentrequests = async() => {
      try{
        const {data} = await axios.get(`${sever}/api/users/payment`)
        setpaymentrequests(data)
      } catch(error){
        alert(error)
      }
  }

  useEffect(() => {
    getpaymentrequests()
  }, [])

  return (
    <div>
        <div className="min-h-full">
          <Head>
                <title>Admin Dashboard</title>
                <link rel="icon" href="./images/logo1.png" />
                {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
            </Head>
        <AdminHeader />
        <main className={`${styles.main}`}>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Paymentrequest tutors={paymentrequests} gettutors={getpaymentrequests} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
