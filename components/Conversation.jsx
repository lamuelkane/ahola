import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';

import styles from '../styles/Messages.module.css'

const Conversation = ({con, active, Onclick}) => {

    const {user, sever} = useSelector((state) => state);
    

    return (
        <div className={`${styles.conversationwrapper} ${active}`} onClick={Onclick}>
                <div className={`flex`}>
                    <div className={`margin-right`}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{con.name.sender == user?.firstname ?  con.name.receiver.slice(0, 2) : con.name.sender.slice(0, 2) }</Avatar>
                    </div>
                    <div>
                        <div>{con.name.sender == user?.firstname ?  con.name.receiver : con.name.sender}</div>
                        <div className={`text-xs`}>{con.lastmessage.message? con.lastmessage.type === 'file'? 'image' : con.lastmessage.message : 'no messages yet'}</div>
                    </div>
                </div>
                  <small>mon</small>
        </div>
    )
}

export default Conversation
