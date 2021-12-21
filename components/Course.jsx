import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'


const Course = ({course}) => {
    const router = useRouter()


    return (
        <div onClick={e => router.push(`/tutors?teach=${course}&&lp=0&&hp=100&&country=all`)}>
            <div className={`flex align-center ${styles.course}`}>
                <img src='./images/teach.svg' alt='' className={`${styles.courseimg}`} />
                <span>{course}</span>
            </div>
        </div>
    )
}

export default Course
