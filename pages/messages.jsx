import React, {useEffect, useState, useRef} from 'react'
import { useRouter } from 'next/router';
import {io} from 'socket.io-client'
import { useSelector } from 'react-redux';
import DashBoardHeader from '../components/DashBoardHeader'
import Dashboardsubheader from '../components/Dashboardsubheader'
import Messagecenter from '../components/Messagecenter'
import Messagesend from '../components/Messagesend'
import styles from '../styles/Messages.module.css'
import Messagesstart from '../components/Messagesstart'
import axios from 'axios';
import Notification from '../components/Notification';
import Head from 'next/head'


const Messages = () => {
    const router = useRouter()
    const [receiverid, setreceiverid] = useState('')
    const [conversationid, setconversationid] = useState('')
    const [message, setmessage] = useState('')
    const {rcrid, name, convid} = router.query
    const {user, sever,} = useSelector((state) => state);


    const getidfromrouter = async() => {
        if(rcrid && user && name && convid){
            try {
                const {data} = await axios.get(`${sever}/api/chats/conversation/${convid}`)
                if(data.id){
                   setconversationid(data.id)
                   setreceiverid(data.members.find(mem => mem !== user?._id))
                }
                else{
                    try {
                        const {data} = await axios.post(`${sever}/api/chats//conversation/save`, {
                            members : [rcrid, user?._id],
                            name: {
                                sender: user?.firstname,
                                receiver: name,
                            },
                            id: convid,
                            lastmessage: {
                                message: null
                            }
                        })
                        setconversationid(convid)
                        setreceiverid(rcrid)
                    } catch (error) {
                        Notification({
                            title:"Error",
                            message:`an error ocurred while saving conversation`,
                            type:"danger",
                            container:"top-right",
                            insert:"top",
                            animationIn:"fadeInUp",
                            animationOut:"fadeOut",
                            duration:10000
                          })
                    }
                }
            } catch (error) {
                Notification({
                    title:"Error",
                    message:`an error ocurred while getting conversation`,
                    type:"danger",
                    container:"top-right",
                    insert:"top",
                    animationIn:"fadeInUp",
                    animationOut:"fadeOut",
                    duration:10000
                  })
            }
        }
    }

    useEffect(() => {
        getidfromrouter()
    }, [rcrid, convid, name])

    return (
        <div>
            <Head>
                <title>Messages</title>
                <meta name="description" content="View your messages" />
                <link rel="icon" href="./images/logo1.png" />
                {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
            </Head>
            <div className="border">
                <DashBoardHeader />
            </div>
            <Dashboardsubheader />
            <div className={`flex justify-between ${styles.messagescontainer}`}>
               <Messagesstart receiverid={receiverid} setreceiverid={setreceiverid} conversationid={conversationid} setconversationid={setconversationid} />
               { 
               !receiverid?
            <div className={`${styles.messagecenterwrapper} hides`}> 
                <div className={`${styles.noidwrapper} flex justify-center align-center w-100`}>
                    <span className={`${styles.noidtext} text-5xl`}>Click on a conversation to view messages</span>
                </div>
            </div>
            :
            <Messagecenter  receiverid={receiverid} setreceiverid={setreceiverid}  conversationid={conversationid} setconversationid={setconversationid} />}
               { user?.type === 'teacher' && receiverid &&
               <Messagesend receiverid={receiverid} setreceiverid={setreceiverid}  conversationid={conversationid} setconversationid={setconversationid} />}
            </div>
        </div>
    )
}

export default Messages
