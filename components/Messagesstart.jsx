import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment'

import Conversation from '../components/Conversation'
import styles from '../styles/Messages.module.css'


const Messagesstart = () => {
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
