import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import {useRef, useEffect} from 'react'
import { format, render, cancel, register } from 'timeago.js';
import styles from '../styles/Messages.module.css'

const Message = ({own, message}) => {

    const updatedstring = message.message.split(' ').map(str => {
        if(str.includes('.')){
            const link = str.includes('http')? str : `https://${str}`
        return `<a href='${link}' class='link' target='_blank' >${str} </a>`
    }
    
    return str 
    })

    const checkiflink = () => {
        let str = ''
        for (let index = 0; index < updatedstring.length; index++) {
                   
                    const element = updatedstring[index];
                    str += "  " + element 
        }
        return str
    }

    const messref = useRef()

    useEffect(() => {
        messref.current?.scrollIntoView({behavior: 'smooth'})
    }, [])

    return (
        <div className={`${styles.message} ${own? styles.own : ''}`} ref={messref}>
           {!own? <Avatar sx={{ bgcolor: deepOrange[500] }}>AH</Avatar> :
            <Avatar sx={{ bgcolor: deepPurple[500] }}>AH</Avatar>}
            {message.type === 'text' ? <div className={`${styles.messagebody} ${own? styles.ownbody : ''}`}>
                <div className={`text-sm ${styles.messagetext}`}  dangerouslySetInnerHTML={{ __html: checkiflink() }}></div>
                <small className={`${styles.messagebodytime} text-xs`}>{format(message.createdAt)}</small>
            </div> : <div className={`${styles.messagebody} ${own? styles.ownbody : ''}`}>
                <img src={message.message} alt="" heigth='100' width='100' />
                <small className={`${styles.messagebodytime} text-xs`}>{format(message.createdAt)}</small>
            </div> }
        </div>
    )
}

export default Message
