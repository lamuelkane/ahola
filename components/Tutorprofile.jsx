
import Paper from '@mui/material/Paper';
import styles from '../styles/Tutor.module.css'
import Tutordetails from './Tutordetails';
import Rating from '@mui/material/Rating';
import { useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { troncate } from './Troncate';



const Tutorprofile = ({open, setOpen, teacher, setteacher}) => {
    const {user} = useSelector((state) => state);
    const router = useRouter()


    return (
        <div className={`${styles.tutor}`}>
            <Paper>
                <div className={`flex align-cnter ${styles.tutorsmallscreen} nowrap justify-beteen padding`}>
                    <div className={`${styles.tutorabout}`}>
                        <Link href={`/tutor?id=${teacher._id}`}><img src={teacher.image} alt="" className={`${styles.tutorimg} rounded`} /></Link>
                        <div className={` ${``} flex column justify-center align-center padding-right`}>
                            <h2 className={`font-bold text-indigo-700`}>{teacher.firstname}</h2>
                            <div className={`text-xs`}>{teacher.subject} Tutor <small className={`text-indigo-700`}>{teacher.rate}/hr</small></div>
                            <div className={`text-xs`}>{teacher.lessons.length} lessons</div>

                            <button className={`${styles.bookbtn}  text-xs `} onClick={e => {
                                if(user?.type !== 'student'){
                                    router.push('/student_register')
                                    return
                                }else{
                                    setOpen(true)
                                    setteacher(teacher)
                                    return
                                }
                            
                            }}>book a lesson</button>
                        </div>
                    </div>
                    <div className={`${styles.tutorinfo} padding-right`}>
                            <div className={`text-xs mt-2`}>{troncate(teacher.description, 500)}
                            </div>
                            <Rating name="read-only" value={4} readOnly />
                            <div>
                                <span>Also speaks :</span>
                                <span className={`text-xs text-indigo-700`}> French</span>
                                <span className={`text-xs text-indigo-700`}> German</span>
                                <span className={`text-xs text-indigo-700`}> Spanish</span>
                            </div>
                        </div>
                            <Tutordetails teacher={teacher} />
                </div>
            </Paper>
        </div>
    )
}

export default Tutorprofile
