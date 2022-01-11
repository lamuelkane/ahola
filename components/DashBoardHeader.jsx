import styles from '../styles/Dashboard.module.css'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useContext, useEffect, useState} from 'react'
import { Fragment } from 'react'
import {removeUser, setUser} from '../actions/User'
import ReactNotification from "react-notifications-component";
import { useSelector, useDispatch } from 'react-redux';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {useRouter} from 'next/router'
import Link from 'next/link'

const  DashBoardHeader = () => {
    const dispatch = useDispatch()
    const {user, sever, socket} = useSelector((state) => state);
    const router = useRouter()
    const [show, setshow] = useState(false)

    const userNavigation = [
        { name: 'Your Profile', href: '/my_profile' },
      ]

      function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }


    useEffect(() => {
        dispatch(setUser(sever))
        setTimeout(() => {
            if(!localStorage.getItem('user')){
                router.push('/login')
            }
        }, 10000);
    }, [])

    useEffect(() => {
      if(user) {
        socket.emit("adduser", user?._id);
       }
    }, [user])
    return (
        <div>
            <div className="headerwrapeer">
                <div className={`w-100 ${styles.header} flex justify-between align-center`}>
                    <div className={` flex jsutify-between align-center`}>
                        <div className='flex align-center'>
                            <img src="./images/oleoscript.png" alt="" className={`${styles.logoimg}`} />
                        </div>
                      
                    </div>
                    <div className="styles header flex align-center padding-x margin-x">
                        <div className={`margin-right pointer ${styles.acountbalance} text-indigo-600 flex align-center padding-right border-right`}>
                           <div onClick={e => setshow(!show)}>
                           <AccountBalanceWalletIcon />
                            <span className={`hidexs`} >{user?.currentearning.toFixed(2)} USD</span>
                            <KeyboardArrowDownIcon />
                           </div>
                        {/* {show && <div className={styles.accountbalancedropdown}>
                            <div className={styles.accountbalancedropdowntitle}>Your balance</div>
                            <div className={styles.accountbalancedropdownfunds}>${user?.currentearning.toFixed(2)}</div>
                            <button className={`${styles.accountbalancedropdownbtn} text-sm`}>withdraw funds</button>
                        </div>} */}
                        </div>
                        <div className="margin-right flex align-center padding-right border-right">
                          {user?.firstname}
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
                            <Menu.Item>
                                  <div className={'block px-4 py-2 ml-3 margin-left text-sm textgray-700 cursor-pointer pointer'} onClick={e => {
                                    // dispatch(removeUser())
                                    localStorage.removeItem('user')
                                    router.push('/')
                                  }}>
                                   Sign outs
                                  </div>
                              </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                </div>
            </div>
            <ReactNotification />
        </div>
    )
}

export default DashBoardHeader
