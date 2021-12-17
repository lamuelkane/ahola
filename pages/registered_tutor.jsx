import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import RegisteredTutor from '../components/RegisteredTutor'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/Footer'
import axios from 'axios'

const Registered_tutors = () => {
    const router = useRouter()
    const [tutor, settutor] = useState({})
    const {sever} = useSelector((state) => state);
    const {id} = router.query

    const gettutor = async() => {
        try {
            const {data} = await axios.get(`${sever}/api/users/registeredtutor/${id}`)
            settutor(data)
        } catch (error) {
            alert(error)
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
            <div className="w-80 margin-auto margin-top">
                 <RegisteredTutor tutor={tutor} />
            </div>
            <Footer />
        </div>
    )
}

export default Registered_tutors
