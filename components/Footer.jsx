import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Notification from './Notification';
import { useSelector } from 'react-redux'
import axios from 'axios'
import Link from 'next/link'
import {useRouter} from 'next/router'

const Footer = () => {
    const [subjects, setsubjects] = useState([])
  const {sever} = useSelector((state) => state);
  const router = useRouter()


    const getsubjects = async() => {
      try {
        const {data} = await axios.get(`${sever}/api/users/subjects`)
        setsubjects(data)
      } catch (error) {
        Notification({
          title:"Error",
          message:`an error ocurred getting courses`,
          type:"danger",
          container:"top-right",
          insert:"top",
          animationIn:"fadeInUp",
          animationOut:"fadeOut",
          duration:10000
        })
      }
    }



    useEffect(() => {
        getsubjects()
      }, [axios])


    return (
        <>
        <div className={`flex justify-between wrap bg-gray-700 text-white padding ${styles.Footer}`}>
            <img src="./images/logo.png" alt="" width='100' height='100' title="logo" className={styles.footerlogoimg} />
            <div></div>
        <div className={`center ${styles.contactus}`}>
                <h1 className={`text-red-700  text-2xl  margin-bottom`}>Learn Languages</h1>
                { 
                    subjects.filter(sub => sub.type === 'lang').map(e => <div key={e._id} className={`text-sm text-gray-400 ${styles.justify}`} style={{textAlign: 'start'}}>
                        <a href={`/tutors?teach=${e.subject}&&lp=0&&hp=100&&country=all`}>Learn {  e.subject  } online</a>
                    </div>)
                }
            </div>
            <div className={`center ${styles.contactus}`}>
                <h1 className={`text-red-700  text-2xl  margin-bottom`}>Learn Skills</h1>
                { 
                    subjects.filter(sub => sub.type === 'subj').map(e => <div key={e._id} className={`text-sm text-gray-400`} style={{textAlign: 'start'}}>
                        <a href={`/tutors?teach=${e.subject}&&lp=0&&hp=100&&country=all`}>Learn  {e.subject}  online</a>
                    </div>)
                }
            </div>
            <div className={`center ${styles.contactus}`}>
                <h1 className={`text-red-700  text-2xl  margin-bottom`}>Learn Skills</h1>
                { 
                    subjects.filter(sub => sub.type === 'skill').map(e => <div key={e._id} className={`text-sm text-gray-400`} style={{textAlign: 'start'}}>
                        <a href={`/tutors?teach=${e.subject}&&lp=0&&hp=100&&country=all`}>Learn {e.subject} online</a>
                    </div>)
                }
            </div>
            <div className={`center ${styles.contactus}`} style={{textAlign: 'start'}}>
                <h1 className={`text-red-700  text-2xl margin-bottom`}>Contact Us</h1>
                <h3>Need any help?</h3>
                <div>
               <span className="icon flex"><a href="https://www.facebook.com/"><img className={`${styles.footerimg}`} alt="Facebook" src="images/facebook2x.png" title="facebook"/></a>facebook</span>
               <span className="icon flex"><a href="https://www.twitter.com/"><img className={`${styles.footerimg}`} alt="Twitter" src="images/twitter2x.png" title="twitter"/></a>twitter</span>
               <span className="icon flex"><a href="https://www.instagram.com/"><img className={`${styles.footerimg}`} alt="Instagram" src="images/instagram2x.png" title="instagram"/></a>instagram</span>
               <span className="icon flex"><a href="mailto:info@ahola.ch"><img className={`${styles.footerimg}`} alt="Instagram" src="images/email.png" title="email"/></a>info@ahola.ch</span>
               </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        </>
    )
}

export default Footer
