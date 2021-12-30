import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import axios from 'axios';


const Test = () => {
    const {user, sever, socket} = useSelector((state) => state);

      const userNavigation = [
        { name: 'Dashboard', href: '/dashboard', current: true },
        { name: 'Students', href: '/ahola_students', current: false },
        { name: 'Tutors', href: '/ahola_tutors', current: false },
        { name: 'Admins', href: '/ahola_admins', current: false },
        // { name: 'courses', href: '/courses', current: false },
      ]

      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    useEffect(() => {
       
    }, [])

    return (
        <>
           <button onClick={async(e) => {
             try {
              //  axios.post(`https://login.sandbox.payoneer.com/api/v2/oauth2/token`)
             } catch (error) {
               alert(error)
             }
           }}>click</button>
        </>
    )
}

export default Test
