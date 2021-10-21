
import styles from '../styles/Home.module.css'
import Paper from '@mui/material/Paper';
import { motion } from "framer-motion"

const ShowCase = () => {
    return (
        <motion.div
            animate={{
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
            }}
            >
        <div className={`${styles.showcase} `}>
            <Paper>
        <div className={`flex nowrap ${styles.showcaseinner} align-center`}>
            <img src="./images/one.svg" alt="" className={`${styles.showcaseimg}`} />
            <div className={`flex column`}>
                <h3 className={`${styles.showcaseh2} font-medium text-black`}>1-on-1 lessons with experts</h3>
                <small className={`${styles.showcasediv} center`}>Have 1-on-1 lessons with our proven best Tutors and attain your goals in no time</small>
            </div>          
        </div>
    </ Paper>
    </div>
</ motion.div>
    )
}

export default ShowCase
