import Message from './Message'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import GlobalContext from '../context/Globalcontext';
import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/Messages.module.css'

const Messagecenter = ({conversationid, receiverid}) => {
    
    const {user, sever} = useContext(GlobalContext)
    const [messages, setmessages] = useState([])
    const message = useRef()
    const [type, settype] = useState('text')

    const router = useRouter()


    const getmessages = async() => {
        if(conversationid){
            try {
                const {data} = await axios.get(`${sever}/api/chats/messages/${conversationid}`)
                setmessages(data)
            } catch (error) {
                alert(error)
            }
        }
    }

    const sendmessage = async(e) => {
        e.preventDefault()
        const mes = {
            conversationid,
            type,
            message : message.current.value,
            receiverid,
            senderid: user?._id,
            members: [receiverid, user?._id]
        }

        try {
            const {data} = await axios.post(`${sever}/api/chats/message/save`, mes)
            const {data : res} = await axios.get(`${sever}/api/chats/conversation/${conversationid}`)
            res.lastmessage = data
            await axios.post(`${sever}/api/chats/conversation/update`, res)
            message.current.value = ''
            getmessages()
        } catch (error) {
            alert(error)
        }
        
    }

    let sendimage = async(e) => {
        var bodyFormData = new FormData();
        let i = e.target.files[0]
        bodyFormData.append('picture', i); 
        try {
          const {data} = await axios({
            method: "post",
            url: `${sever}/api/users/upload`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          setmessage(`${sever}/uploads/${data.filename}`)
          settype('file')
        } catch (error) {
          alert('an error ocurred while uploading image')
        }
}


    useEffect(()=> {
        getmessages()
    }, [conversationid])



    return (
            <div className={`${styles.messagecenterwrapper}`}>
                    <div className={`${styles.chatheader}`}>
                        <h3 className='margin-left'>John do</h3>
                    </div>
                    <div className={styles.messagewrapper}>
                        {
                            messages?.map(mess => <Message key={mess._id} own={mess.senderid === user?._id}  notification={mess.type === 'notification'} message={mess} />)
                        }
                    </div>
                    <form className={`${styles.chatbottomwrapper}`}>
                        <div className={`${styles.chatbottom}`}>
                            <div  className={`${styles.chatbottomfilechooser}`}>
                                <label htmlFor="file" style={{cursor: 'pointer'}}>
                                     <AttachFileIcon />
                                </label>
                                <input type="file" accept="image/*" onChange={sendimage} style={{display: 'none'}} name="file" id="file" />
                            </div>
                            <div  className={`${styles.chatbottomimojiicon}`}>
                                <AddReactionIcon />
                            </div>
                            <div className={`${styles.chatbottomtextareawrapper}`}>
                                 <textarea onInput={e => {
                                     settype('text')
                                 }} ref={message}  placeholder='enter text' rows='1' className={`${styles.chatbottomtextarea}`} name="" id="" max-rows='10'></textarea>
                            </div>
                            <button onClick={sendmessage}  className={`${styles.chatbottomsendbtn}`}>
                                 <SendIcon />
                            </button>
                        </div>
                    </form>
                </div>
    )
}

export default Messagecenter
