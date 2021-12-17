import Header from '../components/Header'
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import styles from '../styles/Tutor2.module.css'
import Reviewprogress from '../components/Reviewprogress';
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
    const tutorvideo = () => {
        let str = reverseString(tutor.video)
        let sub = str.substring(0, str.indexOf("="))
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
            <Tutorpopup open={open} setOpen={setOpen} teacher={tutor} />
            <div className="border">
                <Header2 />
            </div>
            { 
            tutor.firstname  && <div>
                <div className={`${styles.tutoriframeholdeer}`}>
                    <iframe className={`${styles.tutoriframe}`} src={`https://www.youtube.com/embed/${tutorvideo()}`} frameborder="0"></iframe>
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
                                <div>Teaches {tutor.subject}  </div>
                                <div>From {tutor.country}</div>
                                <div className={`text-xs`} >Teaches at ${tutor.rate} per lesson</div>
                            </div>
                        </div>
                        <div className={`flex column`}>
                            <button className={`${styles.actionbtn}`}  onClick={e => {
                                router.push(`messages?convid=${tutor._id + user._id}&&name=${tutor.firstname}&&rcrid=${tutor._id}`)
                            }} >Message {tutor.firstname}</button>
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
                                }} >Book a lesson</button>
                        </div>
                    </div>
                    <div className={`${styles.tutormainwrapper}`}>
                        <div>
                        <h3 className={`margin-y`}> See when {tutor.firstname} is available for lessons</h3>
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
                            <h3 className={`margin-top`}> Get to know  {tutor.firstname}</h3>
                            <div className={`text-sm ${styles.tutordes}`}>
                                {tutor.description}
                            </div>
                            <h3 className={`margin-top`}> What students think about  {tutor.firstname}</h3>
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
