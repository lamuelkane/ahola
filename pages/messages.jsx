import React, {useEffect, useState, useContext, useRef} from 'react'
import { useRouter } from 'next/router';
import {io} from 'socket.io-client'

import DashBoardHeader from '../components/DashBoardHeader'
import Dashboardsubheader from '../components/Dashboardsubheader'
import Messagecenter from '../components/Messagecenter'
import Messagesend from '../components/Messagesend'
import styles from '../styles/Messages.module.css'
import Messagesstart from '../components/Messagesstart'
import GlobalContext from '../context/Globalcontext'
import axios from 'axios';


const Messages = () => {
    // const socket = io('ws://localhost:8000/')
    const {user, sever} = useContext(GlobalContext)
    const router = useRouter()

    const [receiverid, setreceiverid] = useState('')
    const [conversationid, setconversationid] = useState('')
    const {rcrid, name, convid} = router.query


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
                        alert(err)
                    }
                }
            } catch (error) {
                alert(error)
            }
        }
    }

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

    useEffect(() => {
        getidfromrouter()
    }, [rcrid, convid, name])



    return (
        <div>
            <div className="border">
                <DashBoardHeader />
            </div>
            <Dashboardsubheader />
            <div className={`flex justify-between ${styles.messagescontainer}`}>
               <Messagesstart receiverid={receiverid} setreceiverid={setreceiverid} conversationid={conversationid} setconversationid={setconversationid} />
               <Messagecenter receiverid={receiverid} setreceiverid={setreceiverid}  conversationid={conversationid} setconversationid={setconversationid} />
               { user?.type === 'teacher' &&
               <Messagesend receiverid={receiverid} setreceiverid={setreceiverid}  conversationid={conversationid} setconversationid={setconversationid} />}
            </div>
        </div>
    )
}

export default Messages
