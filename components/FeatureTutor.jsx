import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'
import AOS from 'aos';
import Tutorpopup from './Tutorpopup';
import 'aos/dist/aos.css';
import {useEffect, useState} from 'react'





const FeatureTutor = ({tutor}) => {
    const router = useRouter()   
    const [teach, setteacher] = useState({})
    const [open, setOpen] = useState(false)


    useEffect(() => {
        AOS.init({duration: 1000});
    }, [])

    return (
      <>
          <Tutorpopup open={open} setOpen={setOpen} teacher={tutor} />
            <div className={`${styles.featuretutor}`} >
                <img src={tutor.image} className={`${styles.featuretutorimg}`} />
                <div className={`${styles.featuretutorbody}`}>
                    <h2 className={``} >{tutor.firstname} {tutor.lastname}</h2>
                    <p className={`text-xs text-indigo-500`}>${tutor?.rate?.toFixed(2)}</p>
                    <p className={``}>{tutor?.subject} Tutor</p>
                    <button className={`${styles.featuretutorbtn} pointer bg-indigo-900`} onClick={e => setOpen(true)}>Book Lesson</button>
                </div>
            </div>
      </>
    )
}

export default FeatureTutor
