import React, {useEffect, useState, useRef} from 'react'
import {io} from 'socket.io-client'

import DashBoardHeader from '../components/DashBoardHeader'
import Dashboardsubheader from '../components/Dashboardsubheader'
import Messagecenter from '../components/Messagecenter'
import Messagesend from '../components/Messagesend'
import styles from '../styles/Messages.module.css'
import Messagesstart from '../components/Messagesstart'


const Messages = () => {
    // const socket = io('ws://localhost:8000/')

    useEffect(() => {
        // socket.on("connect", () => {
        //   // either with send()
        //   socket.send("Hello!");
        
        //   // or with emit() and custom event names
        //   socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
        // });
        
        // // handle the event sent with socket.send()
        // socket.on("message", data => {
        //   console.log(data);
        // });
        
        // // handle the event sent with socket.emit()
        // socket.on("greetings", (elem1, elem2, elem3) => {
        //   console.log(elem1, elem2, elem3);
        // });
    }, [])
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
