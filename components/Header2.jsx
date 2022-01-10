import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import Notification from '../components/Notification';
import ReactNotification from "react-notifications-component";
import axios from 'axios'
import {setUser , setcurrency, setcurrencies, setCourses} from '../actions/User'
import {useRouter} from 'next/router'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Header2 = () => {
    const [show, setshow] = useState(false)
    const [showlang, setshowlang] = useState(false)
    const {user, sever, Currency, Currencies, Courses} = useSelector((state) => state);
    const [currencies, setcurrecies] = useState([])
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if(!user) {
          dispatch(setUser(sever))
        }
    }, [user])

    useEffect(() => {
      if(!Courses[0]) {
        dispatch(setCourses(sever))
      }
  }, [Courses])

    useEffect(() => {
      setshowlang(false)
    }, [router.locale, Currency])


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
          setcurrecies(Object.keys(data.data).filter(obj => obj === 'USD' || obj === 'EUR' || obj === 'CHF' || obj === 'CNY'))
        } catch (error) {
          alert(error)
          Notification({
            title:"Error",
            message:`an error ocurred while getting Currencies`,
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
            <div className={`${styles.headersmall} bg-indigo-900  ${show ? 'showsidebar' : 'sidebar'}`}>
                <span className={`${styles.homenaveitem}`}><Link href='/tutors'>
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
                  
                  </Link></span>
                  <span className={`${styles.homenaveitem}`}><Link href='/tutors'>
                                    {  router.locale  === 'en-US' ? ' Become a Tutor'

                  : router.locale === 'fr' ? `Devenez Tuteur`

                  : router.locale === 'de' ?
                                            'Tutor Werden'
                  : router.locale === 'es' ?
                                            'Conviértete en tutor'
                  : router.locale === 'zh' ?
                                            '成为导师'
                  :  ' Become a Tutor'
                  }
                  </Link></span>
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
            </div>
        <ReactNotification />
        </>
    )
}

export default Header2
