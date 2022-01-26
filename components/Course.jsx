import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'


const Course = ({course}) => {
    const router = useRouter()   
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
