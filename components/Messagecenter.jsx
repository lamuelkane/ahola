import Message from './Message'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import GlobalContext from '../context/Globalcontext';
import { useContext, useState, useEffect } from 'react';

import styles from '../styles/Messages.module.css'

const Messagecenter = ({conversationid, receiverid, }) => {
    
    const {user, sever} = useContext(GlobalContext)
    const [messages, setmessages] = useState()
    const [message, setmessage] = useState()


    const getmessages = async() => {
        try {
            const {data} = axios.get(`${sever}/api/chats/messages`)
            setmessages(data)
        } catch (error) {
            alert(error)
        }
    }


    useEffect(()=> {
        getmessages()
    }, [])

    return (
            <div className={`${styles.messagecenterwrapper}`}>
                    <div className={`${styles.chatheader}`}>
                        <h3 className='margin-left'>John do</h3>
                    </div>
                    <div className={styles.messagewrapper}>
                        <Message />
                        <Message />
                        <Message />
                        <Message own/>
                        <Message />
                        <Message />
                        <Message />
                        <Message own/>
                        <Message />
                        <Message />
                        <Message own/>
                        <Message />
                    </div>
                    <form className={`${styles.chatbottomwrapper}`}>
                        <div className={`${styles.chatbottom}`}>
                            <div  className={`${styles.chatbottomfilechooser}`}>
                                <AttachFileIcon />
                            </div>
                            <div  className={`${styles.chatbottomimojiicon}`}>
                                <AddReactionIcon />
                            </div>
                            <div className={`${styles.chatbottomtextareawrapper}`}>
                                 <textarea onChange={e => setmessage(e.target.velue)} placeholder='write something ...' rows='1' className={`${styles.chatbottomtextarea}`} name="" id="" max-rows='10'></textarea>
                            </div>
                            <button onClick= {
                                async() => {
                                    const mes = {
                                        conversationid,
                                        type:'',
                                        message,
                                        receiverid,
                                        senderid: user._id,
                                        members: []
                                    }
                                }
                            }  className={`${styles.chatbottomsendbtn}`}>
                                 <SendIcon />
                            </button>
                        </div>
                    </form>
                </div>
    )
}

export default Messagecenter
