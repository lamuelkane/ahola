import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from '../styles/Tutor.module.css'
import Tutordetails from './Tutordetails';
import Rating from '@mui/material/Rating';

const Tutorprofile = () => {
    return (
        <div className={`${styles.tutor}`}>
            <Paper>
                <div className={`flex align-cnter wrap justify-between padding`}>
                    <div>
                        <img src="./images/maleteacher.jpg" alt="" className={`${styles.tutorimg}`} />
                    </div>
                    <div className={`border-right ${styles.tutorinfo} padding-right`}>
                        <h2>Fabrice the nerd</h2>
                        <Rating name="read-only" value={4} readOnly />
                        <div>English Tutor <small>16/hr</small></div>
                        <span>Also speaks :</span>
                        <span>French</span>
                        <div className={`margin-bottom`}>144 lessons</div>
                        <Button variant="outlined">Book A Lesson</Button>
                    </div>

                            <Tutordetails />
                </div>
            </Paper>
        </div>
    )
}

export default Tutorprofile
