import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

import styles from '../styles/Messages.module.css'

const Conversation = () => {
    return (
        <div className={`${styles.conversationwrapper}`}>
                <div className={`flex`}>
                    <div className={`margin-right`}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                    </div>
                    <div>
                        <div>John Do</div>
                        <div>this is a sample message</div>
                    </div>
                </div>
                  <small>mon</small>
        </div>
    )
}

export default Conversation
