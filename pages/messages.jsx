import React from 'react'
import DashBoardHeader from '../components/DashBoardHeader'
import Dashboardsubheader from '../components/Dashboardsubheader'


import Messagecenter from '../components/Messagecenter'
import Messagesend from '../components/Messagesend'
import styles from '../styles/Messages.module.css'
import Messagesstart from '../components/Messagesstart'


const Messages = () => {
    return (
        <div>
            <div className="border">
                <DashBoardHeader />
            </div>
            <Dashboardsubheader />
            <div className={`flex justify-between ${styles.messagescontainer}`}>
               <Messagesstart />
               <Messagecenter />
               <Messagesend />
            </div>
        </div>
    )
}

export default Messages
