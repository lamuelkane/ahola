import Header2 from '../components/Header2'
import Tutorprofile from '../components/Tutorprofile'
import styles from '../styles/Tutor.module.css'
import Pagination from '@mui/material/Pagination'
import {countries} from '../components/lists'
import { useState, useEffect, useRef } from 'react'
import React, { useMemo } from 'react'
import countryList from 'react-select-country-list'
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


const Tutors = () => {
    const [openfilters, setOpenfilters] = useState(false)
    const {user, Currency, Currencies} = useSelector((state) => state);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [openrange, setopenrange] = useState(false)
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false)
    const [teach, setteacher] = useState({})
    const [tutors, settutors, ] = useState([])
    const [subjects, setsubjects] = useState([])
    const {sever} = useSelector((state) => state);
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
    }, 10000)
};


  useEffect(() => {
    getsubjects()
  }, [axios])


      const gettutors = async() => {
        setloading(true)
        try {
          const {data} = await axios.get(`${sever}/api/users/tutor/${country || 'all'}/${subject || 'all'}/${lowprice || 0}/${highprice || 100}`)
          settutors(data)
          setloading(false)
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
            <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script>
          </Head>
          <Tutorpopup open={open} setOpen={setOpen} teacher={teach} />
          <div className="border">
            <Header2 />
          </div>
          <div >
          <div className={`center bg-blue-700 ${styles.tuttorshero}`}>
            <h2 className={`text-2xl text-white margin-bottom`}>
              
              { router.locale  === 'en-US' ? 'Find the best tutor for you'

: router.locale === 'fr' ? 'Encuentra el mejor tutor para ti'

: router.locale === 'de' ?
                          'Finden Sie den besten Nachhilfelehrer für Sie'
: router.locale === 'es' ?
                          'Encuentra el mejor tutor para ti'
: router.locale === 'zh' ?
                          '为您找到最好的导师'
:  'Find the best tutor for you'
}
          </h2>
            <p className={`text-sm text-white`}>
            
                  
              { router.locale  === 'en-US' ? '  The right tutor always makes a difference'

: router.locale === 'fr' ? 'Le bon tuteur fait toujours la différence'

: router.locale === 'de' ?
                          'Der richtige Nachhilfelehrer macht immer einen Unterschied'
: router.locale === 'es' ?
                          'El tutor adecuado siempre marca la diferencia'
: router.locale === 'zh' ?
                          '合适的导师总是有所作为'
:  '  The right tutor always makes a difference'
}
              </p>
            <div className={`flex wrap justify-center ${styles.tutorsfilterwrapper} margin-y align-center bg-white`}>
            <select name="" id="" className={`margin-right ${styles.countryselect} ${styles.filteritem}`}  onChange={e => {
            if(e.target.value == 'Courses'){
              return
            }
            setsubject(e.target.value)
          }} ref={totop}>
                <option value='Courses' >
                  
                  { router.locale  === 'en-US' ? 'Courses'

: router.locale === 'fr' ? 'Le tuteur enseigne'

: router.locale === 'de' ?
                          'Tutor unterrichtet'
: router.locale === 'es' ?
                          'Tutor enseña'
: router.locale === 'zh' ?
                          '导师教'
:  'Courses'
}
                  </option>
                {
                  subjects.map(sub => <option value={sub.subject['en-US']} >{sub.subject[router.locale]}</option>)
                }
              </select>
          <select name="" id="" className={` ${styles.countryselect} ${styles.filteritem}`} onChange={e => {
            if(e.target.value == 'Tutor from'){
              return
            }
            setcountry(e.target.value)
          }}>
              <option >
                
                { router.locale  === 'en-US' ? 'Tutor from'

: router.locale === 'fr' ? 'Tuteur de'

: router.locale === 'de' ?
                          'Nachhilfelehrer aus'
: router.locale === 'es' ?
                          'Tutor de'
: router.locale === 'zh' ?
                          '导师来自'
:  'Tutor from'
}
                </option>
                {
                          countries.map((country, i) => (
                            <option key={i} >{troncate(country.label, 20)}</option>
                          ))
                        }
              </select>
              <div className={`flex justify-center align-center  border ${styles.filteritem} ${styles.rangesliderwrapper}`} >
                <div onClick={e => setopenrange(!openrange)}>
                  
                  { router.locale  === 'en-US' ? 'price per hour'

: router.locale === 'fr' ? `prix à l'heure`

: router.locale === 'de' ?
                          'Preis pro Stunde'
: router.locale === 'es' ?
                          'precio por hora'
: router.locale === 'zh' ?
                          '每小时价格'
:  'price per hour'
}
                  
                    {Currency === 'USD' ? <span>  {range[0]} - {range[1]}</span> : <span>    {(range[0] * Currencies?.data[Currency]).toFixed(0)} - {(range[1] * Currencies?.data[Currency]).toFixed(0)}</span>} {Currency}
                </div>
                        <div className={`${styles.slider} ${!openrange && 'hide2'}`}>
                            <span className={`text-xs`}> ${range[0]} </span>
                          <RangeSlider changerange={changerange} range={range} setrange={setrange}/>
                            <span className={`text-xs`}> ${range[1]} </span>
                        </div>
              </div>
             
              <input className={`${styles.filteritem} ${styles.countryselect}`} placeholder={ router.locale  === 'en-US' ? 'search tutor'

: router.locale === 'fr' ? `recherche de tuteur`

: router.locale === 'de' ?
                          'Nachhilfelehrer suchen'
: router.locale === 'es' ?
                          'tutor de búsqueda'
: router.locale === 'zh' ?
                          '寻找导师'
:  'search tutor'
} type="text" onChange={async(e) => {
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
            <div className={`flex justify-center align-center ${styles.tutorprofileswraper} column w-4/5`}>
               {
                loading? <h3>
                  
                  { router.locale  === 'en-US' ? 'Loading tutors...'

: router.locale === 'fr' ? 'Chargement des tuteurs...'

: router.locale === 'de' ?
                          'Tutoren werden geladen...'
: router.locale === 'es' ?
                          'Cargando tutores ...'
: router.locale === 'zh' ?
                          '正在加载导师...'
:  'Loading tutors...'
}
                  </h3> : tutors.length < 1 ? <h3>
                    
                    { router.locale  === 'en-US' ? 'No tutor available'

: router.locale === 'fr' ? 'Pas de tuteur disponible'

: router.locale === 'de' ?
                          'Kein Nachhilfelehrer verfügbar'
: router.locale === 'es' ?
                          'No hay tutor disponible'
: router.locale === 'zh' ?
                          '没有导师'
:  'No tutor available'
}
                    </h3> : tutors.filter(tut => !tut.hidden).slice(pagesVited, pagesVited + 5).map((teacher, i) => (
                  <Tutorprofile key={i} open={open} teacher={teacher} setOpen={setOpen} setteacher={setteacher} />
                )) 
               }
            </div>
          </div>
          </div>
          <div className='flex justify-center align-center margin-top'>
             <Pagination count={Math.round(tutors.length / 5)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary" />
          </div>
          <Footer />
        </div>
    )
}

export default Tutors
