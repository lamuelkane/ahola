
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from '../styles/Tutor.module.css'
import Tutordetails from './Tutordetails';
import Tutorpopup from '../components/Tutorpopup';
import Rating from '@mui/material/Rating';

const Tutorprofile = ({open, setOpen, teacher, setteacher}) => {
    return (
        <div className={`${styles.tutor}`}>
            {/* <Tutorpopup open={open} setOpen={setOpen} teacher={teacher} /> */}
            <Paper>
                <div className={`flex align-cnter ${styles.tutorsmallscreen} nowrap justify-beteen padding`}>
                    <div className={`${styles.tutorabout}`}>
                        <img src={teacher.image} alt="" className={`${styles.tutorimg} rounded`} />
                        <div className={` ${``} flex column justify-center align-center padding-right`}>
                            <h2 className={`font-bold text-indigo-700`}>{teacher.firstname}</h2>
                            <div className={`text-xs`}>{teacher.subject} Tutor <small className={`text-indigo-700`}>{teacher.rate}/hr</small></div>
                            <div className={`text-xs`}>144 lessons</div>

                            <button className={`${styles.bookbtn}  text-xs `} onClick={e => {
                            setOpen(true)
                            setteacher(teacher)
                            }}>book a lesson</button>
                        </div>
                    </div>
                    <div className={`${styles.tutorinfo} padding-right`}>
                            <div className={`text-xs mt-2`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ex,
                                 voluptatibus quibusdam numquam consequatur fugiat. Facere autem quam
                                 magnam assumenda eveniet rem sed odit dolor sit amet consectetur adipisicing elit. Dolorum ex,
                                 voluptatibus quibusdam numquam consequatur fugiat. Facere autem quam
                                 magnam assumenda eveniet rem sed odit dolor sit amet consectetur adipisicing elit. Dolorum ex,
                                 voluptatibus quibusdam numquam consequatur fugiat. Facere autem quam
                                 magnam assumenda eveniet rem sed odit 
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
