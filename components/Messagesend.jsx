import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DetailsIcon from '@mui/icons-material/Details';
import PublicIcon from '@mui/icons-material/Public';
import InsightsIcon from '@mui/icons-material/Insights';
import axios from 'axios'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Messages.module.css'

const Messagesend = ({receiverid}) => {
    const {user, sever} = useSelector((state) => state);
    const [receiver, setreceiver] = useState({})

    const getreceiver = async( ) => {
       try {
        const {data} = await axios.get(`${sever}/api/users/${user.type == 'teacher' ? 'student' : 'tutor'}/${receiverid}`)
        setreceiver(data)
       } catch (error) {
           alert(error)
       }
    }

    useEffect(() => {
        if(receiverid) {
            getreceiver()
        }
    }, [receiverid])


    return (
        <div className={`${styles.messageendwrapper}`}>
            <div className={`${styles.messageendhead} flex`}>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>{receiver?.firstname?.substring(0, 2)}</Avatar>
                <div className={`${styles.messagendheaditem} flex column`}>
                    <b>{receiver.firstname}</b>
                    <small>This is your student. Below you can find details about the type of lessons and student’s contacts</small>
                </div>
                <b>${user?.students.find(stu => stu.id === receiver._id)?.rate.toFixed(2)}</b>
            </div>
            <div>
                <div className={`${styles.studentdetailsitem}`}>
                    <div  className={`flex algin-center`}>
                        <PublicIcon />
                        <b className={`${styles.studentinfodes}`}>students timezone</b>
                    </div>
                    <span className={`text-sm`}>{receiver.timezone?.name}</span>
                    <span className={`text-sm`}>{receiver.timezone?.offset}</span>
                </div>
                <div className={`${styles.studentdetailsitem}`}>
                    <div className={`flex algin-center`}>
                        <QueryBuilderIcon /> 
                        <b className={`${styles.studentinfodes}`}>Hours left</b></div>
                    <div className={`text-sm`}>{user?.students.find(stu => stu.id == receiver._id)?.hours} hours</div>
                </div>
                <div className={`${styles.studentdetailsitem}`}>
                    <div className={`flex algin-center`}>
                        <ImportContactsIcon />
                        <b className={`${styles.studentinfodes}`}>Subject</b></div>
                    <div className={`text-sm`}>English Language</div>
                </div>
            </div>
        </div>
    )
}

export default Messagesend
