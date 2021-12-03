import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DetailsIcon from '@mui/icons-material/Details';
import PublicIcon from '@mui/icons-material/Public';
import InsightsIcon from '@mui/icons-material/Insights';

import styles from '../styles/Messages.module.css'

const Messagesend = ({receiverid, setreceiverid}) => {
    return (
        <div className={`${styles.messageendwrapper}`}>
            <div className={`${styles.messageendhead} flex`}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>N</Avatar>
                <div className={`${styles.messagendheaditem} flex column`}>
                    <b>John Do</b>
                    <small>This is your student. Below you can find details about the type of lessons and student’s contacts</small>
                </div>
                
                <b>$5.00</b>
            </div>
            <div>
                <div className={`${styles.studentdetailsitem}`}>
                    <div  className={`flex algin-center`}>
                        <PublicIcon />
                        <b className={`${styles.studentinfodes}`}>students timezone</b>
                    </div>
                    <div>America/Santo_Domingo GMT -4:00</div>
                </div>
                <div className={`${styles.studentdetailsitem}`}>
                    <div className={`flex algin-center`}>
                        <QueryBuilderIcon /> 
                        <b className={`${styles.studentinfodes}`}>Hours left</b></div>
                    <div>3 hours</div>
                </div>
                <div className={`${styles.studentdetailsitem}`}>
                    <div className={`flex algin-center`}>
                        <ImportContactsIcon />
                        <b className={`${styles.studentinfodes}`}>Subject</b></div>
                    <div>English Language</div>
                </div>
            </div>
        </div>
    )
}

export default Messagesend
