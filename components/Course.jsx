import styles from '../styles/Home.module.css'


const Course = ({course}) => {
    return (
        <div>
            <div className={`flex align-center ${styles.course}`}>
                <img src='./images/teach.svg' alt='' className={`${styles.courseimg}`} />
                <span>{course}</span>
            </div>
        </div>
    )
}

export default Course
