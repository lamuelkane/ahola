import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'
import Conversation from '../components/Conversation'
import styles from '../styles/Messages.module.css'
import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import GlobalContext from '../context/Globalcontext'


const Messagesstart = () => {
    const [conversations, setconversations] = useState([])
    const {sever, user} = useContext(GlobalContext)


    const getconverstions = async() => {
        try {
            const {data} = await axios.get(`${sever}/api/chats/conversation/${user._id}`)
            setconversations(data)
        } catch (error) {
            alert(error)
        }
    }

    const saveconverstion = async(receiverid) => {
        const conversation = {
            members: [user._id, receiverid],
            lastmessage: {}
        }
        try {
            const {data} = await axios.post(`${sever}/api/chats/conversation/save`, conversation)
            console.log(data)
        } catch (error) {
            alert(error)
        }
    }

    return (
             <div className={`${styles.messagestartwrapper}`}>
                <div className={`${styles.conversationsearchinput}`}>
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
                </div>
                <div className={`flex justify-between ${styles.messagedisplay} border`}>
                    <span className={`${styles.display}`}>all</span>
                    <span className={`${styles.display}`}>unread</span>
                </div>

                <div className={`${styles.conversationswrapper}`}>
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                </div>


                </div>
                
    )
}

export default Messagesstart
