
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

export default function Homehero() {
  return (
    <div className={``}>
        <div className={styles.homehero}>
            <div className={`${styles.homeheroheader}`}>
            </div>
                <Header />
                <div className={`${styles.homeherotext}`}>
                    <h1 className={`${styles.homeheroh1}`}>Your Fluency Is Just A Few Lessons Away</h1>
                    <p className={`${styles.homeherop}`}>improve your English anytime, anywhere</p>
                    <p className={`${styles.homeherop}`}>Learn no matter your level A1, A2, B1, B2, C1, C2</p>
                    <button className={`${styles.homeherobutton} pointer`}>Explore Tutors</button>
                </div>
        </div>
    </div>
  )
}
