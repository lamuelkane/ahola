import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Fragment } from 'react'
import ReactNotification from "react-notifications-component";
import { Menu, Transition } from '@headlessui/react'


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
           <div>
                <div className={`flex align-center justify-between ${styles.homeheader}`}>
                    <div className={`flex align-center `}>
                        <Link href='/'>
                            <img src="./images/logo.png" alt=""  className={`${styles.homeimg} pointer`} />
                        </Link>
                        <div className={`${styles.headerlarge} text-gray-500`}>
                            <span className={`${styles.homenaveitem} p-2 bg-gray-900 text-white text-sm`}><Link href='/dashboard'>Dashboard</Link></span>
                            {/* <span className={`${styles.homenaveitem} hover:bg-gray-700 hover:text-white p-2 px-4`}>
                                <Link href='/tutors'>tutors</Link>
                            </span> */}
                            <span className={`${styles.homenaveitem} hover:bg-gray-700 hover:text-white p-2 px-4`}><Link href='/ahola_tutors'>Tutors</Link></span>
                            <span className={`${styles.homenaveitem} hover:bg-gray-700 hover:text-white p-2 px-4`}><Link href='/ahola_students'>Students</Link></span>
                        </div>
                    </div>
                        <Menu as="div" className="ml-3 relative">
                                <div>
                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src={user?.image} alt="" />
                                </Menu.Button>
                                </div>
                                <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <Menu.Items className="origin-top-right absolute flex column align-center justify-center right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                        <div className={classNames(
                                            active ? 'bg-gray-100' : '',
        -                                    'block px-4 py-2 text-sm textgray-700'
                                        )}>
                                            <Link
                                            href={item.href}
                                            >
                                            {item.name}
                                            </Link>
                                        </div>
                                        )}
                                    </Menu.Item>
                                    ))}
                                </Menu.Items>
                                </Transition>
                        </Menu>
                </div>
           </div>
           
        <header className="bg-red-500 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl text-white font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <ReactNotification />
        </>
    )
}

export default Test
