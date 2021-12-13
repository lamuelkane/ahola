import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import {useRef, useEffect} from 'react'

import styles from '../styles/Messages.module.css'

const Message = ({own, message}) => {

    const messref = useRef()

    useEffect(() => {
        messref.current?.scrollIntoView({behavior: 'smooth'})
    }, [])

    return (
        <div className={`${styles.message} ${own? styles.own : ''}`} ref={messref}>
           {!own? <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar> :
            <Avatar sx={{ bgcolor: deepPurple[500] }}>N</Avatar>}
            <div className={`${styles.messagebody} ${own? styles.ownbody : ''}`}>
                <div className={`text-sm`}>{message.message}</div>
                <small className={`${styles.messagebodytime} text-xs`}>21:55</small>
            </div>
        </div>
    )
}

export default Message
