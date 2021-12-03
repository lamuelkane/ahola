import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'
import Conversation from '../components/Conversation'
import styles from '../styles/Messages.module.css'
import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import GlobalContext from '../context/Globalcontext'


const Messagesstart = ({receiverid, setreceiverid, conversationid, setconversationid}) => {
    const [conversations, setconversations] = useState([])
    const {sever, user} = useContext(GlobalContext)


    const getconverstions = async() => {
        try {
            const {data} = await axios.get(`${sever}/api/chats/conversations/${user?._id}`)
            setconversations(data)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getconverstions()
    }, [])


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
                    {
                        conversations.map(con => <Conversation Onclick={e => {
                            setconversationid(con.id)
                            setreceiverid(con.members.find(mem => mem !== user?._id))

                        }} active={con.id === conversationid? 'bg-gray-300' : ''} key={con._id} con={con} />)
                    }
                </div>


                </div>
                
    )
}

export default Messagesstart
