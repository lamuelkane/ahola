import AdminHeader from '../components/AdminHeader'
import Table from '../components/Table'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Admin.module.css'
import Notification from '../components/Notification'




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
