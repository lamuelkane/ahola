
import Paper from '@mui/material/Paper';
import styles from '../styles/Tutor.module.css'
import Tutordetails from './Tutordetails';
import Rating from '@mui/material/Rating';
import { useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link'
import {countries, timezones} from '../components/lists'
import { troncate } from './Troncate';
import {useState, useEffect} from 'react'
import Notification from './Notification';
import axios from 'axios'



const Tutorprofile = ({open, setOpen, teacher, setteacher}) => {
    const {user, Currency, Currencies, sever} = useSelector((state) => state);
    const [subjects, setsubjects] = useState([])

    const getsubjects = async() => {
        try {
          const {data} = await axios.get(`${sever}/api/users/subjects`)
          setsubjects(data)
        } catch (error) {
          Notification({
            title:"Error",
            message:`an error getting courses`,
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

    const router = useRouter()

    return (
        <div className={`${styles.tutor}`}>
            <Paper>
                <div className={`flex align-cnter ${styles.tutorsmallscreen} nowrap justify-beteen padding`}>
                    <div className={`${styles.tutorabout}`}>
                        <Link href={`/tutor?id=${teacher._id}`}>
                            <div className={`${styles.tutorimgholder}`}>
                                <img
                                    loading="lazy"
                                    width="30"
                                    src={`https://flagcdn.com/w20/${countries.find(c => c.label.toLowerCase() === teacher.country.toLowerCase()).code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${countries.find(c => c.label.toLowerCase() === teacher.country.toLowerCase()).code.toLowerCase()}.png 2x`}
                                    alt=""
                                    className={`${styles.countyicon}`}
                                />
                                <img src={teacher.image} alt="" className={`${styles.tutorimg} rounded`} />
                            </div>
                        </Link>
                        <div className={` ${``} flex column justify-center align-center padding-right`}>
                            <h2 className={`font-bold text-indigo-700`}>{teacher.firstname}</h2>
                            <div className={`text-xs`}>{subjects[0] && subjects.find(sub => sub?.subject['en-US']?.toLowerCase() === teacher.subject.toLowerCase())?.subject[router.locale] } {' '}
                            { router.locale  === 'en-US' ? 'Tutor '

: router.locale === 'fr' ? `tuteur`

: router.locale === 'de' ?
                          'Tutor'
: router.locale === 'es' ?
                          'Tutor'
: router.locale === 'zh' ?
                          '导师'
:  'Tutor '
}
                            </div>
                            <div><small className={`text-indigo-700`}>{Currency === 'USD' ? teacher.rate : (teacher.rate * Currencies.data[Currency]).toFixed(2)}</small>   {Currency} /hr</div>
                            <div className={`text-xs`}>{teacher.lessons.length} 
                            { router.locale  === 'en-US' ? 'lessons '

: router.locale === 'fr' ? `cours`

: router.locale === 'de' ?
                          'Lektionen'
: router.locale === 'es' ?
                          'lecciones'
: router.locale === 'zh' ?
                          '教训'
:  'lessons '
}
                            </div>

                            <button className={`${styles.bookbtn} hover:text-white text-xs `} onClick={e => {
                                if(user?.type !== 'student'){
                                    router.push('/student_register')
                                    return
                                }else{
                                    setOpen(true)
                                    setteacher(teacher)
                                    return
                                }
                            
                            }}>
                               { router.locale  === 'en-US' ? 'book a lesson '

: router.locale === 'fr' ? `réserver une leçon`

: router.locale === 'de' ?
                          'eine Stunde buchen'
: router.locale === 'es' ?
                          'reservar una lección'
: router.locale === 'zh' ?
                          '预约课程'
:  'book a lesson '
}
                            </button>

                           
                        </div>
                    </div>
                    <div className={`${styles.tutorinfo} padding-right`}>
                            <div className={`text-xs mt-2`}>{troncate(teacher.description, 500)}
                            </div>
                            <Rating name="read-only" value={teacher.rating} readOnly />
                            <div>
                                <span>

                                { router.locale  === 'en-US' ? 'Tutor is from  '

: router.locale === 'fr' ? `Le tuteur est de`

: router.locale === 'de' ?
                          'Tutor ist von'
: router.locale === 'es' ?
                          'El tutor es de'
: router.locale === 'zh' ?
                          '导师来自'
:  'Tutor is from  '
} :
                                </span>
                                <span className={`text-sm margin-left text-indigo-700`}>{teacher.country}</span>
                                {teacher.freetrial && <div className='text-red-700 font-extrabold pointer' onClick={e => {
                                     if(user?.type !== 'student'){
                                        router.push('/student_register')
                                        return
                                    }else{
                                        setOpen(true)
                                        setteacher(teacher)
                                        return
                                    }
                                }}>

{ router.locale  === 'en-US' ? 'Free Trial'

: router.locale === 'fr' ? `Essai gratuit`

: router.locale === 'de' ?
'Kostenlose Testphase'
: router.locale === 'es' ?
'Prueba gratis'
: router.locale === 'zh' ?
'免费试用'
:  'Free Trial'
} 
</div >}
                            </div>
                         {user?.type === 'student' &&   <button className={`${styles.bookbtn2} text-gray-300 hover:text-white text-xs `} onClick={e => {
                                router.push(`messages?convid=${teacher._id + user._id}&&name=${teacher.firstname}&&rcrid=${teacher._id}`)
                            }}>
                               { router.locale  === 'en-US' ? 'message'

: router.locale === 'fr' ? `message`

: router.locale === 'de' ?
                          'Botschaft'
: router.locale === 'es' ?
                          'mensaje'
: router.locale === 'zh' ?
                          '信息'
:  'message'
}
                            </button>}
                        </div>
                            <Tutordetails teacher={teacher} />
                </div>
            </Paper>
        </div>
    )
}

export default Tutorprofile
