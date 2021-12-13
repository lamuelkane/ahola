import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';



import styles from '../styles/Dashboard.module.css'

const Dashboardsubheader = () => {
    const {user, sever} = useSelector((state) => state);

    return user?.type === 'student' ? (
        <div className={`${styles.dashboardsubheader}`}>
            <div className={`flex align-center`}>
                <div className={`margin-right`}><Link href='/messages'>Messages</Link></div>
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
                <div className={`margin-right`}><Link href='/messages'>Messages</Link></div>
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
