
import styles from '../styles/Home.module.css'
import Paper from '@mui/material/Paper';
import { motion } from "framer-motion"

const ShowCase = ({showcase}) => {
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
        <div className={`flex column  nowrap ${styles.showcaseinner} align-center`}>
            <img src="./images/one.svg" alt="" className={`${styles.showcaseimg}`} />
            <div className={`flex column`}>
                <h3 className={`${styles.showcaseh2} font-extrabold text-indigo-700 font-medium`}>{showcase?.title}</h3>
                <small className={`${styles.showcasediv} center`}>{showcase?.text}</small>
            </div>          
        </div>
    </ Paper>
    </div>
</ motion.div>
    )
}

export default ShowCase
