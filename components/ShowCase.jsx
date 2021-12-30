
import styles from '../styles/Home.module.css'
import Paper from '@mui/material/Paper';
import { motion } from "framer-motion"
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from 'react'

const ShowCase = ({showcase}) => {


    useEffect(() => {
        AOS.init({duration: 1000});
    }, [])


    return (
        <div className={`${styles.showcase} `} data-aos="fade-down">
            <Paper>
        <div className={`flex column  nowrap ${styles.showcaseinner} align-center`}>
            <img src="./images/one.svg" alt="" className={`${styles.showcaseimg}`} />
            <div className={`flex column`}>
                <h3 className={`${styles.showcaseh2} font-extrabold text-indigo-900 font-medium`}>{showcase?.title}</h3>
                <small className={`${styles.showcasediv} font-bold center`}>{showcase?.text}</small>
            </div>          
        </div>
    </ Paper>
    </div>
    )
}

export default ShowCase
