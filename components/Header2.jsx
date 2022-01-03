import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useSelector, useDispatch} from 'react-redux';
import DashBoardHeader from '../components/DashBoardHeader'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import Notification from '../components/Notification';
import ReactNotification from "react-notifications-component";
import axios from 'axios'
import {setUser , setcurrency, setcurrencies} from '../actions/User'
import {useRouter} from 'next/router'
import Languagedropdown from './Languagedropdown'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Header2 = () => {
    const [show, setshow] = useState(false)
    const [showlang, setshowlang] = useState(false)
    const [courses, setcourses] = useState([])
    const {user, sever, Currency, Currencies} = useSelector((state) => state);
    const [currencies, setcurrecies] = useState([])
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if(!user) {
          dispatch(setUser(sever))
        }
    }, [user])


    const getsubjects = async() => {
        try {
          const {data} = await axios.get(`${sever}/api/users/subjects`)
          setcourses(data)
        } catch (error) {
          Notification({
            title:"Error",
            message:`an error ocurred while getting courses`,
            type:"danger",
            container:"top-right",
            insert:"top",
            animationIn:"fadeInUp",
            animationOut:"fadeOut",
            duration:10000
          })
        }
      }
      
      const getlanguagename = (lang) => {
          switch (lang) {
            case 'en-US':
                  return 'English'
            case 'de':
                  return 'German'
            case 'fr':
                  return 'French'
            case 'es':
                  return 'Spanish'
            case 'zh':
                  return 'Chinese'
            default:
                  return 'English'
          }
      }
      
    const getcurrencies = async() => {
        try {
          const {data} = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=646fbf50-659b-11ec-88f2-8b1f0f257506`)
          dispatch(setcurrencies(data))
          setcurrecies(Object.keys(data.data))
        } catch (error) {
          Notification({
            title:"Error",
            message:`an error ocurred while getting courses`,
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
            if(!Currencies){
              getcurrencies()
            }
            else{
              setcurrecies(Object.keys(Currencies.data))
            }
        }, [])

    return (
        <>
        <div className={`flex align-center ${styles.homeheader}`}>
            <Link href='/'>
                <img src="./images/logo.png" alt=""  className={`${styles.homeimg} pointer`} />
            </Link>
            <div className={`${styles.headerlarge} text-gray-500`}>
                <span className={`${styles.homenaveitem} ${styles.coursesholder}`}>
                    <Link href='/tutors'>
                    {  router.locale  === 'en-US' ? 'Find a Tutor'

                     : router.locale === 'fr' ? 'Trouver un tuteur'

                    : router.locale === 'de' ?
                                                'Finde einen Tutor'
                    : router.locale === 'es' ?
  
                                                'Encontrar un tutor'
                    : router.locale === 'zh' ?
                                                '找导师'
                    :  'Find a Tutor'
                  }

                      </Link>
                    
                </span>
                {/* <span className={`${styles.homenaveitem}`}><Link href='/student_register'>register</Link></span> */}
                <span className={`${styles.homenaveitem}`}><Link href='/login'>
                  
                  {  router.locale  === 'en-US' ? 'login'

                  : router.locale === 'fr' ? 'connexion'

                  : router.locale === 'de' ?
                                            'Anmeldung'
                  : router.locale === 'es' ?
                                            'acceso'
                  : router.locale === 'zh' ?
                                            '登录'
                  :  'Login'
                  }
                </Link></span>
            </div>
            <span className={`${styles.homenaveitem} ${styles.coursesholder}`}>
                    <span className={`text-sm pointer`} onClick={e => setshowlang(!showlang)}>{getlanguagename(router.locale)}, {Currency}<KeyboardArrowDownIcon /></span>
                    <div className={`${styles.courses2} ${!showlang && 'hide'} bg-gray-500`}>
                      <div>
                          {
                              router.locales.map((locale, i) =>  <div className={`text-gray-500 ${styles.lanitem} `}><Link href={router.asPath} locale={locale} key={i}>{getlanguagename(locale)}</Link></div>)
                          }
                      </div>
                            <select className={`${styles.currencies}`} value={Currency} onChange={e => dispatch(setcurrency(e.target.value))}>
                                    <option>  USD </option> 
                                    { 
                                        currencies.map(cu => <option key={cu}>  {cu} </option> )
                                    }
                            </select>
                    </div>
                </span>
            {!show ? <div className={`hide showxs pointer`} onClick={e => setshow(true)}>
                <ReorderIcon />
            </div> :
            <div className={`hide showxs pointer`} onClick={e => setshow(false)}>
                <CloseIcon />
            </div> }
        </div>
            <div className={`${styles.headersmall} bg-gray-500  ${show ? 'showsidebar' : 'sidebar'}`}>
                <soan className={`${styles.homenaveitem}`}><Link href='/tutors'>
                                  {  router.locale  === 'en-US' ? 'Find a Tutor'

                  : router.locale === 'fr' ? 'Trouver un tuteur'

                  : router.locale === 'de' ?
                                            'Finde einen Tutor'
                  : router.locale === 'es' ?

                                            'Encontrar un tutor'
                  : router.locale === 'zh' ?
                                            '找导师'
                  :  'Find a Tutor'
                  }
                  
                  </Link></soan>
                <span className={`${styles.homenaveitem}`}><Link href='/login'>
                          {  router.locale  === 'en-US' ? 'login'

                          : router.locale === 'fr' ? 'connexion'

                          : router.locale === 'de' ?
                                                    'Anmeldung'
                          : router.locale === 'es' ?
                                                    'acceso'
                          : router.locale === 'zh' ?
                                                    '登录'
                          :  'login'
                          }
                  </Link></span>
                <span className={`${styles.homenaveitem} text-indigo-700`}>
                                        {  router.locale  === 'en-US' ? 'Feature Languages'

                        : router.locale === 'fr' ? 'Langues des fonctionnalités'

                        : router.locale === 'de' ?
                                                  'Feature-Sprachen'
                        : router.locale === 'es' ?
                                                  'Idiomas de funciones'
                        : router.locale === 'zh' ?
                                                  '功能语言'
                        :  'Feature Languages'
                        }
                </span>
                {
                courses.filter(course => course.type === 'lang').slice(0, 6).map(co => <span className={`${styles.homenaveitems} margin-left text-gray-200 text-sm`}><Link href={`tutors?teach=${co.subject['en-US']}&&country=all&&lp=0&&hp=100`}>{co.subject[router.locale]}</Link></span>)
                }
                <span className={`${styles.homenaveitem} text-indigo-700`}>
                 
                  {  router.locale  === 'en-US' ? ' Feature Skills'

                    : router.locale === 'fr' ? 'Compétences fonctionnelles'

                    : router.locale === 'de' ?
                                              'Feature-Fähigkeiten'
                    : router.locale === 'es' ?
                                              'Habilidades de funciones'
                    : router.locale === 'zh' ?
                                              '特色技能'
                    :  ' Feature Skills'
                    }
                  </span>
                {
                courses.filter(course => course.type === 'subj').slice(0, 6).map(co => <span className={`${styles.homenaveitems} margin-left text-gray-200 text-sm`}><Link href={`tutors?teach=${co.subject['en-US']}&&country=all&&lp=0&&hp=100`}>{co.subject[router.locale]}</Link></span>)
                }
                <span className={`${styles.homenaveitem} text-indigo-700`}>
                  
                  {  router.locale  === 'en-US' ? ' Feature Subjects'

                    : router.locale === 'fr' ? 'Sujets vedettes'

                    : router.locale === 'de' ?
                                              'Feature-Themen'
                    : router.locale === 'es' ?
                                              'Temas destacados'
                    : router.locale === 'zh' ?
                                              '特色科目'
                    :  ' Feature Subjects'
                    }
                </span>
                {
                courses.filter(course => course.type === 'skill').slice(0, 6).map(co => <span className={`${styles.homenaveitems} margin-left text-gray-200 text-sm`}><Link href={`tutors?teach=${co.subject['en-US']}&&country=all&&lp=0&&hp=100`}>{co.subject[router.locale]}</Link></span>)
                }
            </div>
        <ReactNotification />
        </>
    )
}

export default Header2
