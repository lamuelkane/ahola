import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

import styles from '../styles/Messages.module.css'

const Message = ({own}) => {
    return (
        <div className={`${styles.message} ${own? styles.own : ''}`}>
           {!own? <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar> :
            <Avatar sx={{ bgcolor: deepPurple[500] }}>N</Avatar>}
            <div className={`${styles.messagebody} ${own? styles.ownbody : ''}`}>
                <div>this is another sample message</div>
                <small className={styles.messagebodytime}>21:55</small>
            </div>
        </div>
    )
}

export default Message
