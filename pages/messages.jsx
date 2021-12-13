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


const Messages = () => {
    const socket = useRef()
    const router = useRouter()

    const [receiverid, setreceiverid] = useState('')
    const [conversationid, setconversationid] = useState('')
    const [message, setmessage] = useState()
    const {rcrid, name, convid} = router.query
    const {user, sever} = useSelector((state) => state);


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
        socket.current = io('ws://localhost:8000/')
        // handle the event sent with socket.current.send()
        socket.current.on("message", data => {
            setmessage(true)
        });
        
        // handle the event sent with socket.current.emit()
        socket.current.on("greetings", (elem1, elem2, elem3) => {
          console.log(elem1, elem2, elem3);
        });
    }, [])

    useEffect(() => {
       if(user) {
        socket.current?.emit("adduser", user?._id);
       }
    }, [user, socket])

    useEffect(() => {
       if(message) {
        socket.current.emit('sendmessage', receiverid)
       }
    }, [message])

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
               <Messagecenter socket={message} setsocket={setmessage} receiverid={receiverid} setreceiverid={setreceiverid}  conversationid={conversationid} setconversationid={setconversationid} />
               { user?.type === 'teacher' && receiverid &&
               <Messagesend receiverid={receiverid} setreceiverid={setreceiverid}  conversationid={conversationid} setconversationid={setconversationid} />}
            </div>
        </div>
    )
}

export default Messages
