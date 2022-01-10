import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
// import Notification from './Notification';
import { useSelector } from 'react-redux'
// import axios from 'axios'
// import Link from 'next/link'
import {useRouter} from 'next/router'

const Footer = () => {
    const [subjects, setsubjects] = useState([])
  const {Courses} = useSelector((state) => state);
  const router = useRouter()

    const translate = (text, lang) => {
        if(text === 'learn') {
            return router.locale  === 'en-US' ? 'learn'

            : router.locale === 'fr' ? 'apprendre'
            
            : router.locale === 'de' ?
                                      'lernen'
            : router.locale === 'es' ?
                                      'aprender'
            : router.locale === 'zh' ?
                                      '学习'
            :  'learn'
        }

        return router.locale  === 'en-US' ? 'online'

        : router.locale === 'fr' ? 'en ligne'
        
        : router.locale === 'de' ?
                                  'online'
        : router.locale === 'es' ?
                                  'en línea'
        : router.locale === 'zh' ?
                                  '在线的'
        :  'online'

    }

    useEffect(() => {
        if(Courses){
            setsubjects(Courses)
        }
      }, [Courses])


    return (
        <>
        <div className={`flex justify-between wrap bg-indigo-900 text-white padding ${styles.Footer}`}>
            <div></div>
            <div></div>
            <div></div>
        <div className={`center margin-bottom ${styles.contactus}`} style={{textAlign: 'start'}}>
                <h1 className={`text-white  text-xl  margin-bottom`}>
               { router.locale  === 'en-US' ? 'Learn Languages'

            : router.locale === 'fr' ? 'Apprendre des langues'
            
            : router.locale === 'de' ?
                                      'Sprachen lernen'
            : router.locale === 'es' ?
                                      'Aprender idiomas'
            : router.locale === 'zh' ?
                                      '学习语言'
            :  'Learn Languages'
        }</h1>
                { 
                    subjects.filter(sub => sub.type === 'lang').map(e => <div key={e._id} className={` text-gray-300 text-sm ${styles.justify}`} >
                        <a href={`/tutors?teach=${e.subject['en-US']}&&lp=0&&hp=100&&country=all`}>{translate('learn')} {  e.subject[router.locale]  } {translate('online')}</a>
                    </div>)
                }
            </div>
            <div className={`center margin-bottom ${styles.contactus}`} style={{textAlign: 'start'}}>
                <h1 className={`text-white  text-xl  margin-bottom`}>
                { router.locale  === 'en-US' ? 'Learn Subjects'

: router.locale === 'fr' ? 'Apprendre des matières'

: router.locale === 'de' ?
                          'Lernfächer'
: router.locale === 'es' ?
                          'Aprender materias'
: router.locale === 'zh' ?
                          '学习科目'
:  'Learn Subjects'
}
                </h1>
                { 
                    subjects.filter(sub => sub.type === 'subj').map(e => <div key={e._id} className={`text-sm text-gray-300`} >
                        <a href={`/tutors?teach=${e.subject['en-US']}&&lp=0&&hp=100&&country=all`}> {translate('learn')}  {e.subject[router.locale]}  {translate('online')} </a>
                    </div>)
                }
            </div>
            <div className={`center margin-bottom ${styles.contactus}`} style={{textAlign: 'start'}}>
                <h1 className={`text-white  text-xl  margin-bottom`}>
                { router.locale  === 'en-US' ? 'Learn Skills'

: router.locale === 'fr' ? 'Apprendre des compétences'

: router.locale === 'de' ?
                          'Fähigkeiten lernen'
: router.locale === 'es' ?
                          'Aprende habilidades'
: router.locale === 'zh' ?
                          '学习技能'
:  'Learn Skills'
}
                </h1>
                { 
                    subjects.filter(sub => sub.type === 'skill').map(e => <div key={e._id} className={`text-sm text-gray-300`} >
                        <a href={`/tutors?teach=${e.subject['en-US']}&&lp=0&&hp=100&&country=all`}> {translate('learn')} {e.subject[router.locale]} {translate('online')} </a>
                    </div>)
                }
            </div>
            <div className={`center margin-bottom ${styles.contactus}`} style={{textAlign: 'start'}}>
                <h1 className={`text-white  text-2xl margin-bottom`}>
                { router.locale  === 'en-US' ? 'Contact Us'

: router.locale === 'fr' ? 'Nous contacter'

: router.locale === 'de' ?
                          'Kontaktieren Sie uns'
: router.locale === 'es' ?
                          'Contacta con nosotros'
: router.locale === 'zh' ?
                          '联系我们'
:  'Contact Us'
}
                </h1>
                <div>
               <span className="icon flex"><a href="https://www.facebook.com/"><img className={`${styles.footerimg}`} alt="Facebook" src="images/facebook2x.png" title="facebook"/></a>
               facebook
               </span>
               <span className="icon flex"><a href="https://www.twitter.com/"><img className={`${styles.footerimg}`} alt="Twitter" src="images/twitter2x.png" title="twitter"/></a>
               { router.locale  === 'en-US' ? 'twitter'

: router.locale === 'fr' ? 'Twitter'

: router.locale === 'de' ?
                          'twittern'
: router.locale === 'es' ?
                          'gorjeo'
: router.locale === 'zh' ?
                          '推特'
:  'twitter'
}
               </span>
               <span className="icon flex"><a href="https://www.instagram.com/"><img className={`${styles.footerimg}`} alt="Instagram" src="images/instagram2x.png" title="instagram"/></a>instagram</span>
               <span className="icon flex"><a href="mailto:info@ahola.ch"><img className={`${styles.footerimg}`} alt="Instagram" src="images/email.png" title="email"/></a>info@ahola.ch</span>
               <span className="icon flex"><a href="https://www.instagram.com/"><img className={`${styles.footerimg}`} alt="Instagram" src="images/zoom.png" title="instagram"/></a>Zoom</span>
               <span className="icon flex"><a href="mailto:info@ahola.ch"><img className={`${styles.footerimg}`} alt="Instagram" src="images/youtube.png" title="email"/></a>Youtube</span>
               <span className="icon flex"><a href="https://wa.me/41791587777"><img className={`${styles.footerimg}`} alt="Instagram" src="images/whatsapp.png" title="whatsapp"/></a> 0041791587777</span>
               <span className="icon flex"><a href="https://join.skype.com/invite/ljrOZQel5nt0"><img className={`${styles.footerimg}`} alt="Instagram" src="images/skype.png" title="email"/></a>Skype</span>
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
