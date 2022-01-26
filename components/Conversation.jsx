import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux';
import {troncate} from './Troncate'
import ImageIcon from '@mui/icons-material/Image';
import { format, render, cancel, register } from 'timeago.js';
import styles from '../styles/Messages.module.css'
import Badge from '@mui/material/Badge';

const Conversation = ({con, active, Onclick}) => {

    const {user, sever} = useSelector((state) => state);
    

    return (
        <div className={`${styles.conversationwrapper} srollin ${active}`} onClick={Onclick}>
                <div className={`flex`}>
                    <div className={`margin-right`}>
                    {
                        user?.type ===  'student' ? con.unread.student > 0 ? <Badge badgeContent={con.unread.student} color="primary"  anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>{con.name.sender == user?.firstname ?  con.name.receiver.slice(0, 2) : con.name.sender.slice(0, 2) }</Avatar>
                    </Badge> : 
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>{con.name.sender == user?.firstname ?  con.name.receiver.slice(0, 2) : con.name.sender.slice(0, 2) }</Avatar>
                    :  con.unread.tutor > 0 ?  <Badge badgeContent={con.unread.tutor} color="primary"  anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>{con.name.sender == user?.firstname ?  con.name.receiver.slice(0, 2) : con.name.sender.slice(0, 2) }</Avatar>
                        </Badge> : 
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>{con.name.sender == user?.firstname ?  con.name.receiver.slice(0, 2) : con.name.sender.slice(0, 2) }</Avatar>
                    }
                    </div>
                    <div>
                        <div>{con.name.sender == user?.firstname ?  con.name.receiver : con.name.sender}</div>
                        <div className={`text-xs`}>{con.lastmessage.message? con.lastmessage.type === 'file'? <div><ImageIcon /> <span>  Image</span></div> : troncate(con.lastmessage.message, 30) : 'no messages yet'}</div>
                    </div>
                </div>
                  <small>{format(con.lastmessage?.createdAt)}</small>
        </div>
    )
}

export default Conversation
