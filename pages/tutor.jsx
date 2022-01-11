import Rating from '@mui/material/Rating';
import styles from '../styles/Tutor2.module.css'
import StarRateIcon from '@mui/icons-material/StarRate';
import {useRouter} from 'next/router'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import React, {useEffect, useState} from 'react'
import {setUser} from '../actions/User'
import Tutorpopup from '../components/Tutorpopup';
import Footer from '../components/Footer'
import Header2 from '../components/Header2';
import Notification from '../components/Notification';
import Head from 'next/head'

const Tutor = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const reverseString = (str) => {
        return str?.split("").reverse().join("");
    }
    const [open, setOpen] = useState(false)
    const {id} = router.query
    const {sever, user} = useSelector((state) => state);
    const [tutor, settutor] = useState({})

    
  const checkvideolink = (link) => {
    if (link?.includes('youtube.com')) {
        return true
    }
    return false
  }

    const tutorvideo = () => {
        let str = reverseString(tutor.video)
        let sub = checkvideolink(tutor.video) ? str.substring(0, str.indexOf("=")) : str.substring(0, str.indexOf("/"))

        return reverseString(sub)
    }
     const gettutor = async () => {
         try {
            const {data} = await axios.get(`${sever}/api/users/tutor/${id}`)
            settutor(data)
         } catch (error) {
             Notification({
                title:"Error",
                message:`an error ocurred while getting tutor information`,
                type:"danger",
                container:"top-right",
                insert:"top",
                animationIn:"fadeInUp",
                animationOut:"fadeOut",
                duration:10000
              })
         }
     }

     const getvilbleperiod = (avail, interval) => {
        for (let i = 0; i < interval.length; i++) {
          const element = interval[i];
          for (let j = 0; j < avail.length; j++) {
            const el = avail[j];
            if(element === el) return true
            
          }
        }
    
        return false
     }

     const week = [
        '',
        'mo',
        'tu',
        'we',
        'th',
        'fr',
        'sa',
        'su'
      ]
    
      const hoursgroup = [
        {
          interval: [0, 1, 2, 3],
          value: '00-04'
        },
        {
          interval: [4, 5, 6, 7],
          value: '04-08'
        },
        {
          interval: [8, 9, 10, 11],
          value: '08-12'
        },
        {
          interval: [12, 13, 14, 15],
          value: '12-16'
        },
        {
          interval: [16, 17 , 18, 19],
          value: '16-20'
        },
        {
          interval: [20, 21, 22, 23],
          value: '20-23'
        },
       
      ]

    useEffect(() => {
        dispatch(setUser())
        gettutor()
    }, [])

    return (
        <div>
            <Head>
                <title>Tutor Profile</title>
                {/* <meta name="description" content="Learn Any language with ease" /> */}
                <link rel="icon" href="./images/logo1.png" />
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script>
            </Head>
            <Tutorpopup open={open} setOpen={setOpen} teacher={tutor} />
            <div className="border">
                <Header2 />
            </div>
            { 
            tutor.firstname  && <div>
                <div className={`${styles.tutoriframeholdeer}`}>
                    <iframe className={`${styles.tutoriframe}`} src={`${ checkvideolink(tutor.video)? `https://www.youtube.com/embed/${tutorvideo()}` : `https://player.vimeo.com/video/${tutorvideo()}`}`} frameborder="0"></iframe>
                </div>
                <div>
                    <div className={`${styles.tutorsubjumb} flex wrap justify-between`}>
                        <div className={`flex column align-center ${styles.tutorimgholder}`}>
                            <img className={`${styles.tutorimg}`}  src={tutor.image} alt="profileimage" />
                            <div className={`flex column align-center`} >
                                <div>
                                    <span>{tutor.firstname}</span> {' '}
                                    <span>{tutor.lastname}</span>
                                </div>
                                <div>
                                {  router.locale  === 'en-US' ? 'Teaches '

: router.locale === 'fr' ? 'Enseigne'

: router.locale === 'de' ?
                          'Unterrichtet'
: router.locale === 'es' ?
                          'Enseña'
: router.locale === 'zh' ?
                          '教'
:  'Teaches '
}
                                    {tutor.subject}  </div>
                                <div>
                                    
                                {  router.locale  === 'en-US' ? 'From '

: router.locale === 'fr' ? 'À partir de'

: router.locale === 'de' ?
                          'Von'
: router.locale === 'es' ?
                          'Desde'
: router.locale === 'zh' ?
                          '从'
:  'From '
} {tutor.country}</div>
                                <div className={`text-xs`} >
                                {  router.locale  === 'en-US' ? 'Teaches at  '

: router.locale === 'fr' ? 'Enseigne à'

: router.locale === 'de' ?
                          'Lehrt bei'
: router.locale === 'es' ?
                          'Enseña en'
: router.locale === 'zh' ?
                          '任教于'
:  'Teaches at  '
} 
                                ${tutor.rate} 
                                {  router.locale  === 'en-US' ? 'per lesson'

: router.locale === 'fr' ? 'par leçon'

: router.locale === 'de' ?
                          'pro Lektion'
: router.locale === 'es' ?
                          'por lección'
: router.locale === 'zh' ?
                          '每节课'
:  'per lesson'
} 
                                </div>
                            </div>
                        </div>
                        <div className={`flex column`}>
                            <button className={`${styles.actionbtn}`}  onClick={e => {
                                if(user?.type !== 'student'){
                                    router.push('/student_register')
                                    return
                                }
                                router.push(`messages?convid=${tutor._id + user._id}&&name=${tutor.firstname}&&rcrid=${tutor._id}`)
                            }} >
                                    {  router.locale  === 'en-US' ? 'Message'

: router.locale === 'fr' ? 'Message'

: router.locale === 'de' ?
                          'Nachricht'
: router.locale === 'es' ?
                          'Mensaje'
: router.locale === 'zh' ?
                          '信息'
:  'Message'
} 
                             {tutor.firstname}</button>
                            <button className={`${styles.actionbtn}`}  onClick={e => {
                                    const tuto = user.tutors.find(tut => tut.id === tutor._id)
                                    if(tuto){
                                        tuto.hours > 0 ? router.push('/calender') : setOpen(true)
                                        return
                                    }
                                    else{
                                        setOpen(true)
                                        return
                                    }
                                }} >
                                  {  router.locale  === 'en-US' ? 'Book a lesson'

: router.locale === 'fr' ? 'Réserver une leçon'

: router.locale === 'de' ?
                          'Buchen Sie eine Lektion'
: router.locale === 'es' ?
                          'Reservar una lección'
: router.locale === 'zh' ?
                          '预约课程'
:  'Book a lesson'
} 
                                </button>
                        </div>
                    </div>
                    <div className={`${styles.tutormainwrapper}`}>
                        <div>
                        <h3 className={`margin-y`}> 
                        {  router.locale  === 'en-US' ? `See when ${tutor.firstname} is available for lessons`

: router.locale === 'fr' ? `Voir quand ${tutor.firstname} est disponible pour les cours`

: router.locale === 'de' ?
                          `Sehen Sie, wann ${tutor.firstname} für den Unterricht verfügbar ist`
: router.locale === 'es' ?
                          `Ver cuándo ${tutor.firstname} está disponible para lecciones`
: router.locale === 'zh' ?
                          `查看 ${tutor.firstname} 何时可以上课`
:  `See when ${tutor.firstname} is available for lessons`
}</h3>
                        <div className={`grid grid-cols-7 border border-green-400`}>
                                {
                                week.map((day, dayidx) => (
                                <React.Fragment  key={day} >
                                    <span key={day} className={` p-3 border border-blue-800  center text-xs`}>{day}</span>
                                {   hoursgroup.map((item, i) => (
                                    <React.Fragment  key={i} >
                                    {/* {dayidx === 1 && i === 2 &&  console.log(teacher.availaibility[day], day, teacher.firstname)} */}
                                    <span className={` p-3 border border-blue-800 ${dayidx !== 0 && getvilbleperiod(tutor.availiability[0][day], item.interval) && 'bg-blue-400'} center text-xs`}>{dayidx === 0? item.value : ''}</span>
                                    </React.Fragment >
                                    ))}
                                </React.Fragment >
                                ))
                                }
                            </div>
                            <h3 className={`margin-top`}> 
                            {  router.locale  === 'en-US' ? ` Get to know ${tutor.firstname}`

: router.locale === 'fr' ? `Faites connaissance avec ${tutor.firstname}`

: router.locale === 'de' ?
                          `Lerne ${tutor.firstname} kennen`
: router.locale === 'es' ?
                          `Conocer ${tutor.firstname}`
: router.locale === 'zh' ?
                          `认识导师`
:  ` Get to know ${tutor.firstname}`
}</h3>
                            <div className={`text-sm ${styles.tutordes}`}>
                                {tutor.description}
                            </div>
                            <h3 className={`margin-top`}> 
                            {  router.locale  === 'en-US' ? ` What students think about ${tutor.firstname}`

: router.locale === 'fr' ? `Ce que les élèves pensent de ${tutor.firstname}`

: router.locale === 'de' ?
                          `Was Schüler über ${tutor.firstname} denken`
: router.locale === 'es' ?
                          `Lo que piensan los estudiantes sobre ${tutor.firstname}`
: router.locale === 'zh' ?
                          `学生对 ${tutor.firstname} 的看法`
:  ` What students think about ${tutor.firstname}`
}
                             </h3>
                            <div className={`flex justify-between ${styles.tutorreview}`}>
                                    <img src="./images/femaleteacher.jpg" className={` ${styles.tutorreviewimg}`} alt="" width="100" height="100"/>
                                    <div className={`${styles.tutorreviewtext}`}>
                                        <b>Lemuel 5 <StarRateIcon /></b>
                                        <div className={`text-sm`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                            dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                            , voluptas est. Libero, fugiat aspernatur?
                                        </div>
                                    </div>                                                                                                      
                                </div>
                                <div className={`flex justify-between ${styles.tutorreview}`}>
                                    <img src="./images/femaleteacher.jpg" className={` ${styles.tutorreviewimg}`} alt="" width="100" height="100"/>
                                    <div className={`${styles.tutorreviewtext}`}>
                                        <b>Lemuel 5 <StarRateIcon /></b>
                                        <div className={`text-sm`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                            dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                            , voluptas est. Libero, fugiat aspernatur?
                                        </div>
                                    </div>                                                                                                      
                                </div>
                                <div className={`flex justify-between ${styles.tutorreview}`}>
                                    <img src="./images/femaleteacher.jpg" className={` ${styles.tutorreviewimg}`} alt="" width="100" height="100"/>
                                    <div className={`${styles.tutorreviewtext}`}>
                                        <b>Lemuel 5 <StarRateIcon /></b>
                                        <div className={`text-sm`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                            dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                            , voluptas est. Libero, fugiat aspernatur?
                                        </div>
                                    </div>                                                                                                      
                                </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>    
            
        }
        <Footer />
        </div>
    )
}

export default Tutor
