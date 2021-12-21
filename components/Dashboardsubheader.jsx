import React, {useState , useEffect} from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link'
import Badge from '@mui/material/Badge';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './Notification'
import axios from 'axios'



import styles from '../styles/Dashboard.module.css'

const Dashboardsubheader = () => {
    const [conversations, setconversations] = useState(0)
    const {user, sever, socket} = useSelector((state) => state);
    
    const getconverstions = async() => {
        try {
            const {data} = await axios.get(`${sever}/api/chats/conversations/${user?._id}`)
            let count = 0
            data.map(da => {
                if(user?.type === 'student'){
                    if(da.unread.student > 0) {
                        count += 1
                    }
                }
                else {
                    if(da.unread.tutor > 0) {
                        count += 1
                    }
                }
            })
            setconversations(count)
        } catch (error) {
            // alert(error)
            Notification({
                title:"Error",
                message:`an error ocurred while getting conversations`,
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
        socket.on('getconversations', () => {
            getconverstions()
        })
    }, [])

    useEffect(() => {
        if(user){
            getconverstions()
        }
    }, [user])
    
    return user?.type === 'student' ? (
        <div className={`${styles.dashboardsubheader}`}>
            <div className={`flex align-center`}>
                <div className={`margin-right`}>{
                    conversations > 0 ? <Badge badgeContent={conversations} color="secondary"  anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                   <Link href='/messages'>Messages</Link>
                </Badge> :
                    <Link href='/messages'>Messages</Link>
                }</div>
                <div  className={`margin-right`}><Link href='/calender'>Calender</Link></div>
                <div  className={`margin-right`}><Link href='/my_tutors'>tutors</Link></div>
                <div  className={`margin-right`}><Link href='/my_profile'>Profile</Link></div>
            </div>
            <div className={`hidexs`} >
                    <div className="margin-right  flex align-center padding-right border-right">
                            <span >profile is live</span>
                            <KeyboardArrowDownIcon />
                    </div>
            </div>
        </div>
    ) :  (
        <div className={`${styles.dashboardsubheader}`}>
            <div className={`flex align-center`}>
            <div className={`margin-right`}>{
                    conversations > 0 ? <Badge badgeContent={conversations} color="secondary"  anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                   <Link href='/messages'>Messages</Link>
                </Badge> :
                    <Link href='/messages'>Messages</Link>
                }</div>
                <div  className={`margin-right`}><Link href='/calender'>Calender</Link></div>
                <div  className={`margin-right`}><Link href='/my_students'>students</Link></div>
                <div  className={`margin-right`}><Link href='/my_profile'>Profile</Link></div>
            </div>
            <div className={`hidexs`} >
                    <div className="margin-right  flex align-center padding-right border-right">
                            <span >profile is live</span>
                            <KeyboardArrowDownIcon />
                    </div>
            </div>
        </div>
    )
}

export default Dashboardsubheader
