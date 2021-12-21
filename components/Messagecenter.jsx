import Message from './Message'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
import { useContext, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Emojipicker from './Emojipicker'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from '../styles/Messages.module.css'
import Notification from './Notification';

const Messagecenter = ({conversationid, receiverid, setreceiverid}) => {
    const [messages, setmessages] = useState([])
    const message = useRef()
    const {user, sever, sever2, socket} = useSelector((state) => state);
    const [type, settype] = useState('text')
    const [showimoji, setshowimoji] = useState(false)
    const [file, setfile] = useState(false)
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        message.current.focus()
        const start = message.current.value.substring(0, message.current.selectionStart)
        const end = message.current.value.substring(message.current.selectionStart)
        const msg = start + emojiObject.emoji + end
        message.current.value = msg
      };

    const router = useRouter()


    const getmessages = async(send) => {
        if(conversationid){
            try {
                const {data} = await axios.get(`${sever}/api/chats/messages/${conversationid}`)
                if(!send){
                    const {data : res} = await axios.get(`${sever}/api/chats/conversation/${conversationid}`)
                    if(user?.type === 'student'){
                        if(res.unread.student <= 0) {

                        }
                        else {
                            res.unread.student  = 0
                            await axios.post(`${sever}/api/chats/conversation/update`, res)
                        }
                    }
                    else {
                        if(res.unread.tutor <= 0) {

                        }
                        else {
                            res.unread.tutor  = 0
                            await axios.post(`${sever}/api/chats/conversation/update`, res)
                        }
                    }
                }
                setmessages(data)
                socket.emit('conversationchanged', receiverid)
            } catch (error) {
                Notification({
                    title:"Error",
                    message:`an error ocurred while getting messages`,
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

    const sendmessage = async(e, file) => {
        e?.preventDefault()
        const mes = {
            conversationid,
            type: file || type,
            message : message.current.value,
            receiverid,
            senderid: user?._id,
            members: [receiverid, user?._id]
        }

        try {
            const {data} = await axios.post(`${sever}/api/chats/message/save`, mes)
            const {data : res} = await axios.get(`${sever}/api/chats/conversation/${conversationid}`)
            res.lastmessage = data
            user?.type === 'student'? res.unread.tutor += 1 : res.unread.student += 1
            await axios.post(`${sever}/api/chats/conversation/update`, res)
            message.current.value = ''
            setshowimoji(false)
            socket.emit('sendmessage', receiverid)
            getmessages(true)
        } catch (error) {
            Notification({
                title:"Error",
                message:`an error ocurred while sending message`,
                type:"danger",
                container:"top-right",
                insert:"top",
                animationIn:"fadeInUp",
                animationOut:"fadeOut",
                duration:10000
              })
        }
        
    }

    let sendimage = async(e) => {
        e?.preventDefault()
        var bodyFormData = new FormData();
        bodyFormData.append('file', file); 
        try {
          const {data} = await axios({
            method: "post",
            url: `${sever2}/upload`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          message.current.value = (`${sever2}/image/${data.filename}`)
          settype('file')
          setshowimoji(false)
          sendmessage(e, 'file')
          setfile(false)
        } catch (error) {
            Notification({
                title:"Error",
                message:`an error ocurred while sending image`,
                type:"danger",
                container:"top-right",
                insert:"top",
                animationIn:"fadeInUp",
                animationOut:"fadeOut",
                duration:10000
              })
        }
}

    useEffect(()=> {
        getmessages()
    }, [conversationid])

    useEffect(() => {
        socket.on("message", data => {
                  getmessages()
            });
    }, [])
    
    useEffect(() => {
        let prevkey = ''
        let third = ''
        const listener = event => {
            if (prevkey  === "ShiftLeft" || prevkey  === "ShiftRight") {
                prevkey = event.code
                return
              }
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            sendmessage();
          }
          prevkey = event.code
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, []);

    return (
            <div className={`${styles.messagecenterwrapper}  ${receiverid? 'right' : 'left'}`}>
                    <div className={`${styles.chatheader}`} onClick={e => setreceiverid('')}>
                        <div className="margin-left flex">
                        <ArrowBackIosIcon />
                        <h3 className=''>Back</h3>
                        </div>
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
                                <input type="file" accept="image/*" onChange={e => {
                                    setfile(e.target.files[0])
                                }} style={{display: 'none'}} name="file" id="file" />
                            </div>
                            <div  className={`${styles.chatbottomimojiicon}`} onClick={e => setshowimoji(!showimoji)}>
                                <AddReactionIcon />
                            </div>
                           { showimoji && <Emojipicker chosenEmoji={chosenEmoji} onEmojiClick={onEmojiClick} />}
                                <div className={`${styles.chatbottomtextareawrapper} ${file ? 'show' : 'hide'}`}>
                                   {file && <img src={URL.createObjectURL(file)} alt="" className={`${styles.chatbottomimgareawrapper}`} />}
                                </div>
                            <div className={`${styles.chatbottomtextareawrapper}  ${file ? 'hide' : 'show'} `}>
                                 <textarea onInput={e => {
                                     settype('text')
                                 }} ref={message}  placeholder='enter text' rows='1' className={`${styles.chatbottomtextarea} focus:ring-transparent`} name="" id="" max-rows='10'></textarea>
                            </div>
                            {file ? <button onClick={sendimage}  className={`${styles.chatbottomsendbtn}`}>
                                 <SendIcon />
                            </button> : <button onClick={sendmessage}  className={`${styles.chatbottomsendbtn}`}>
                                 <SendIcon />
                            </button>}
                        </div>
                    </form>
                </div>
    )
}

export default Messagecenter
