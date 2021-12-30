import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from 'react'





const Course = ({course}) => {
    const router = useRouter()   

    useEffect(() => {
        AOS.init({duration: 1000});
    }, [])

    return (
        <div onClick={e => router.push(`/tutors?teach=${course}&&lp=0&&hp=100&&country=all`)} 
        data-aos="fade-up"
        // data-aos-offset="200"
        // data-aos-delay="50"
        // data-aos-duration="1000"
        // data-aos-easing="ease-in-out"
        >
            <div className={`flex wrap align-center bg-gray-500 ${styles.course}`}>
                <img src='./images/teach.svg' alt='' className={`${styles.courseimg}`} />
                <span>{course}</span>
            </div>
        </div>
    )
}

export default Course
