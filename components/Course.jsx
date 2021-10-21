import styles from '../styles/Home.module.css'


const Course = () => {
    return (
        <div>
            <div className={`flex align-center ${styles.course}`}>
                <img src='./images/teach.svg' alt='' className={`${styles.courseimg}`} />
                <span>English</span>
            </div>
        </div>
    )
}

export default Course
