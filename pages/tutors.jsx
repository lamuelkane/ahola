import Header2 from '../components/Header2'
import Tutorprofile from '../components/Tutorprofile'
import styles from '../styles/Tutor.module.css'
import Pagination from '@mui/material/Pagination'
import {countries} from '../components/lists'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import Tutorpopup from '../components/Tutorpopup';
import Footer from '../components/Footer'
import Head from 'next/head'
import Notification from '../components/Notification';
import {troncate} from '../components/Troncate'
import {useRouter} from 'next/router'
import RangeSlider from '../components/Rangesliders'


const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Tutors = (props) => {
    const {user, Currency, Currencies} = useSelector((state) => state);
    // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [openrange, setopenrange] = useState(false)
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false)
    const [teach, setteacher] = useState({})
    const [tutors, settutors, ] = useState([])
    const [subjects, setsubjects] = useState([])
    const {sever, Courses} = useSelector((state) => state);
    const router = useRouter()
    const {teach: sub, country: coun , lp, hp} = router.query
    const [loading, setloading] = useState(true)
    const [subject, setsubject] = useState(sub)
    const [country, setcountry] = useState(coun)
    const [lowprice, setlowprice] = useState(lp)
    const [highprice, sethighprice] = useState(hp)
    const [pageNumber, setpageNumber] = useState(1)
    const [range, setrange] = useState([0, 100])
    const [productperpage, setproductperpage] = useState(5)
    let pagesVited = (pageNumber - 1) * productperpage
    const totop = useRef()
    const totutor = useRef()

  const handleChange = (event, value) => {
    setpageNumber(value)
    totop.current.scrollIntoView({behavior: 'smooth'})
  };

  const changerange = (event, newValue) => {
    clearTimeout(changing)
    setrange(newValue);
    const changing = setTimeout(() => {
      setlowprice(newValue[0])
      sethighprice(newValue[1])
      setopenrange(false)
    }, 10000)
};


  useEffect(() => {
    if(Courses){
      setsubjects(Courses)
    }
  }, [Courses])


      const gettutors = async() => {
        setloading(true)
        try {
          const {data} = await axios.get(`${sever}/api/users/tutor/${country || 'all'}/${subject || 'all'}/${lowprice || 0}/${highprice || 100}`)
          settutors(data)
          setloading(false)
          // totutor.current.scrollIntoView({behavior: 'smooth'})
        } catch (error) {
          setloading(false)
          Notification({
            title:"Error",
            message:`An error occured while getting tutors`,
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
        gettutors()
      }, [country, lowprice, highprice, subject])
           
    return (
        <div className={`bg-gray-100`}>
          {/* <div className={`${styles.tutoroverlay}`}></div> */}
          <Head>
            <title>Ahola Tutors</title>
            <meta name="description" content="The right Tutor always makes a difference" />
            <link rel="icon" href="./images/logo1.png" />
            {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
            <script src="//code.tidio.co/kjrtn6giffsfdwcwl2hlmkeqrrwk1b42.js" async></script>
          </Head>
          <Tutorpopup open={open} setOpen={setOpen} teacher={teach} />
          <div className="border">
            <Header2 />
          </div>
          <div >
          <div className={`center bg-blue-700 ${styles.tuttorshero}`}>
            <h2 className={`text-2xl text-white margin-bottom`}>
             {props.pagecontent.findthebest}
          </h2>
            <p className={`text-sm text-white`}>
            
            {props.pagecontent.therighttutor}
              </p>
            <div className={`flex wrap justify-center ${styles.tutorsfilterwrapper} margin-y align-center bg-white`}>
            <select name="" id="" className={`margin-right ${styles.countryselect} ${styles.filteritem}`}  onChange={e => {
            if(e.target.value == 'Courses'){
              return
            }
            setsubject(e.target.value)
          }} ref={totop}>
                <option value='Courses' >
                    courses
                  </option>
                {
                  subjects.sort((a, b) => {
                    let fa = a.subject['en-US'].toLowerCase(),
                    fb = b.subject['en-US'].toLowerCase();
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                }).map(sub => <option key={sub._id} value={sub.subject['en-US']} >{sub.subject[router.locale]}</option>)
                }
              </select>
          <select name="" id="" className={` ${styles.countryselect} ${styles.filteritem}`} onChange={e => {
            if(e.target.value == 'Tutor from'){
              return
            }
            setcountry(e.target.value)
          }}>
              <option >
                {props.pagecontent.tutorfrom}
                </option>
                {
                          countries.sort((a, b) => {
                            let fa = a.label.toLowerCase(),
                            fb = b.label.toLowerCase();
                            if (fa < fb) {
                                return -1;
                            }
                            if (fa > fb) {
                                return 1;
                            }
                        }).map((country, i) => (
                            <option key={i} >{troncate(country.label, 20)}</option>
                          ))
                        }
              </select>
              <div className={`flex justify-center align-center border ${styles.filteritem} ${styles.rangesliderwrapper}`} >
                <div onClick={e => setopenrange(!openrange)}>
                  
                 {props.pagecontent.priceperhour}
                    {Currency === 'USD' ? <span>  {range[0]} - {range[1]}</span> : <span>    {(range[0] * Currencies?.data[Currency]).toFixed(0)} - {(range[1] * Currencies?.data[Currency]).toFixed(0)}</span>} {Currency}
                </div>
                        <div className={`${styles.slider} ${!openrange && 'hide2'}`}>
                            <span className={`text-xs`}> ${range[0]} </span>
                          <RangeSlider changerange={changerange} range={range} setrange={setrange}/>
                            <span className={`text-xs`}> ${range[1]} </span>
                        </div>
              </div>
             
              <input className={`${styles.filteritem} ${styles.countryselect}`} placeholder={props.pagecontent.saerchtutor} type="text" onChange={async(e) => {
                 clearTimeout(chnaging)
                 const chnaging = setTimeout(async() => {
                   if (e.target.value === '') {
                    gettutors()
                    return
                   }
                   try {
                    setloading(true)
                    const {data} = await axios.get(`${sever}/api/users/tutor/search/${e.target.value}`)
                    setloading(false)
                    settutors(data)
                   } catch (error) {
                    setloading(false)
                    Notification({
                      title:"Error",
                      message:`An error occured while searching tutors`,
                      type:"danger",
                      container:"top-right",
                      insert:"top",
                      animationIn:"fadeInUp",
                      animationOut:"fadeOut",
                      duration:10000
                    })
                   }
                 }, 3000)
              }} />
              
          </div>
            <img src="./images/tutorhero.svg" className={`${styles.tutorsheroimg}`} alt="" />
          </div>
          <div className={`flex justify-center align-center margin-top`}>
            <div ref={totutor} className={`flex justify-center align-center ${styles.tutorprofileswraper} column w-4/5`}>
               {
                loading? <h3>
                 {props.pagecontent.loadingtutors}
                  </h3> : tutors.length < 1 ? <h3>
                    
                    {props.pagecontent.notutor}
                    </h3> : tutors.filter(tut => !tut.hidden).slice(pagesVited, pagesVited + 5).map((teacher, i) => (
                  <Tutorprofile key={i} open={open} teacher={teacher} setOpen={setOpen} setteacher={setteacher} />
                )) 
               }
            </div>
          </div>
          </div>
          <div className='flex justify-center align-center margin-top'>
             <Pagination count={Math.ceil(tutors.length / 5)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary" />
          </div>
          <Footer />
        </div>
    )
}

export default Tutors




export async function getStaticProps({locale}) {
  const pagecontent = { 
    notutor: locale  === 'en-US' ? 'No tutor available'

    : locale === 'fr' ? 'Pas de tuteur disponible'
    
    : locale === 'de' ?
                              'Kein Nachhilfelehrer verf??gbar'
    : locale === 'es' ?
                              'No hay tutor disponible'
    : locale === 'zh' ?
                              '????????????'
    :  'No tutor available',
    loadingtutors: locale  === 'en-US' ? 'Loading tutors...'

: locale === 'fr' ? 'Chargement des tuteurs...'

: locale === 'de' ?
            'Tutoren werden geladen...'
: locale === 'es' ?
            'Cargando tutores ...'
: locale === 'zh' ?
            '??????????????????...'
:  'Loading tutors...',
saerchtutor: locale  === 'en-US' ? 'search tutor'

: locale === 'fr' ? `recherche de tuteur`

: locale === 'de' ?
                          'Nachhilfelehrer suchen'
: locale === 'es' ?
                          'tutor de b??squeda'
: locale === 'zh' ?
                          '????????????'
:  'search tutor',
priceperhour:locale  === 'en-US' ? 'price per hour'

: locale === 'fr' ? `prix ?? l'heure`

: locale === 'de' ?
                          'Preis pro Stunde'
: locale === 'es' ?
                          'precio por hora'
: locale === 'zh' ?
                          '???????????????'
:  'price per hour',
tutorfrom: locale  === 'en-US' ? 'Tutor from'

      :locale === 'fr' ? 'Tuteur de'

      :locale === 'de' ?
                'Nachhilfelehrer aus'
      :locale === 'es' ?
                'Tutor de'
      :locale === 'zh' ?
                '????????????'
      :  'Tutor from',
      courses: locale  === 'en-US' ? 'Courses'

: locale === 'fr' ? 'Le tuteur enseigne'

: locale === 'de' ?
              'Tutor unterrichtet'
: locale === 'es' ?
              'Tutor ense??a'
: locale === 'zh' ?
              '?????????'
:  'Courses',
 therighttutor: locale  === 'en-US' ? '  The right tutor always makes a difference'

: locale === 'fr' ? 'Le bon tuteur fait toujours la diff??rence'

: locale === 'de' ?
             'Der richtige Nachhilfelehrer macht immer einen Unterschied'
: locale === 'es' ?
             'El tutor adecuado siempre marca la diferencia'
: locale === 'zh' ?
             '?????????????????????????????????'
:  '  The right tutor always makes a difference',
       findthebest: locale  === 'en-US' ? 'Find the best tutor for you'

: locale === 'fr' ? 'Encuentra el mejor tutor para ti'

: locale === 'de' ?
                   'Finden Sie den besten Nachhilfelehrer f??r Sie'
: locale === 'es' ?
                   'Encuentra el mejor tutor para ti'
: locale === 'zh' ?
                   '???????????????????????????'
:  'Find the best tutor for you',       


    
  }
  return {
    props: {
      pagecontent
    }
  }
}
