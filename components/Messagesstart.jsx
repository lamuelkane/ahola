import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'
import Conversation from '../components/Conversation'
import styles from '../styles/Messages.module.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Notification from './Notification';
import { alpha } from '@mui/material';



const Messagesstart = ({receiverid, setreceiverid, conversationid, setconversationid}) => {
    const [conversations, setconversations] = useState([])
    const {user, sever, socket} = useSelector((state) => state);



    const getconverstions = async() => {
        try {
            const {data} = await axios.get(`${sever}/api/chats/conversations/${user?._id}`)
            setconversations(data)
        } catch (error) {
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
        if(user) getconverstions()
    }, [user])

    useEffect(() => {
        socket.on("message", data => {
            getconverstions()
            });
        socket.on('getconversations', data => {
            getconverstions()
        })
    }, [conversations])

    return (
             <div className={`${styles.messagestartwrapper} ${receiverid? 'left' : 'right'} `}>
                {/* <div className={`${styles.conversationsearchinput}`}>
                <TextField
                    id="input-with-icon-textfield"
                    label="Search Conversation"
                    fullWidth
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    }}
                    variant="standard"
                />
                </div> */}
                <div className={`flex justify-between ${styles.messagedisplay} border`}>
                    <span className={`${styles.display}`}>all</span>
                    <span className={`${styles.display}`}>unread</span>
                </div>

                <div className={`${styles.conversationswrapper}`}>
                    {
                        conversations.sort((a, b) => {
                            let older = new Date(a.lastmessage?.createdAt).getTime()
                                          let newer = new Date(b.lastmessage?.createdAt).getTime()
                                          return older > newer? -1 : 1
                        }).map(con => <Conversation Onclick={e => {
                            setconversationid(con.id)
                            setreceiverid(con.members.find(mem => mem !== user?._id))
                        }} active={con.id === conversationid? 'bg-gray-300' : ''} key={con._id} con={con} />)
                    }
                </div>


                </div>
                
    )
}

export default Messagesstart
