import Header2 from '../components/Header2'
import Tutorprofile from '../components/Tutorprofile'
import styles from '../styles/Tutor.module.css'
import Pagination from '@mui/material/Pagination'
import {countries} from '../components/lists'
import { useState, useEffect } from 'react'
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
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
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
    const [productperpage, setproductperpage] = useState(2)
    let pagesVited = (pageNumber - 1) * productperpage


  const getsubjects = async() => {
    try {
      const {data} = await axios.get(`${sever}/api/users/subjects`)
      setsubjects(data)
    } catch (error) {
      Notification({
        title:"Error",
        message:`an error ocurred while saving conversation`,
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
  };

  useEffect(() => {
    getsubjects()
  }, [axios])


      const changeHandler = value => {
        setValue(value)
      }

      const gettutors = async() => {
        setloading(true)
        try {
          const {data} = await axios.get(`${sever}/api/users/tutor/${country || 'all'}/${subject || 'all'}/${lowprice || 0}/${highprice || 100}`)
          settutors(data)
          setloading(false)
        } catch (error) {
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
        <div>
          <Head>
            <title>Ahola Tutors</title>
            <meta name="description" content="The right Tutor always makes a difference" />
            <link rel="icon" href="./images/logo1.png" />
            <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
            <script type="text/javascript" id="hs-script-loader" defer src="/translate.js"></script> 
          </Head>
          <Tutorpopup open={open} setOpen={setOpen} teacher={teach} />
          <div className="border">
            <Header2 />
          </div>
          <div className={`bg-gray-100`}>
          <div className={`center bg-gray-700 ${styles.tuttorshero}`}>
            <h2 className={`text-2xl text-white`}>Find the best tutor for you</h2>
            <p className={`text-sm text-white`}>Find the best English teacher for you: choose from our experienced English teachers online and get the best learning experience.</p>
          </div>
          <div className="flex wrap justify-center margin-y align-center">
          <select name="" id="" className={`margin-right margin-top`} onChange={e => {
            if(e.target.value == 'Tutor from'){
              return
            }
            setcountry(e.target.value)
          }}>
              <option >Tutor from</option>
                {
                          countries.map((country, i) => (
                            <option key={i} >{troncate(country.label, 20)}</option>
                          ))
                        }
              </select>
              
              <select name="" id="" className={`margin-right margin-top`}  onChange={e => {
            if(e.target.value == 'Lowest Price'){
              return
            }
            setlowprice(e.target.value)
          }}>
              <option >Lowest Price</option>
            {  
                Array.from(Array(24), (_, i) => i).map(ti => <option >{ti}</option>)
            }
              </select>
              <select name="" id="" className={`margin-right margin-top`}  onChange={e => {
            if(e.target.value == 'Highest Price'){
              return
            }
            sethighprice(e.target.value)
          }}>
              <option >Highest Price</option>
            {  
                Array.from(Array(24), (_, i) => i).map(ti => <option >{ti}</option>)
            }
              </select>
              <select name="" id="" className={`margin-right margin-top`}  onChange={e => {
            if(e.target.value == 'Tutor Teaches'){
              return
            }
            setsubject(e.target.value)
          }}>
                <option >Tutor Teaches</option>
                {
                  subjects.map(sub => <option >{sub.subject}</option>)
                }
              </select>
              
              
          </div>
          <div className={`flex justify-center align-center`}>
            <div className={`flex justify-center align-center ${styles.tutorprofileswraper} column w-4/5`}>
               {
                loading? <h3>Loading tutors...</h3> : tutors.length < 1 ? <h3>No tutor available</h3> : tutors.slice(pagesVited, pagesVited + 2).map((teacher, i) => (
                  <Tutorprofile key={i} open={open} teacher={teacher} setOpen={setOpen} setteacher={setteacher} />
                )) 
               }
            </div>
          </div>
          </div>
          <div className='flex justify-center align-center margin-top'>
             <Pagination count={Math.round(tutors.length / 2)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary" />
          </div>
          <Footer />
        </div>
    )
}

export default Tutors
