
import styles from '../styles/Home.module.css'

const ShowCase = () => {
    return (
        <div className={`flex nowrap ${styles.showcase} align-center`}>
            <img src="./images/heros.jpg" alt="" className={`${styles.showcaseimg}`} />
            <div className={`flex column`}>
                <h3 className={`${styles.showcaseh2}`}>1-on-1 lessons with experts</h3>
                <div className={`${styles.showcasediv} center`}>Have 1-on-1 lessons with our proven best Tutors and attain your goals in no time</div>
            </div>
        </div>
    )
}

export default ShowCase
