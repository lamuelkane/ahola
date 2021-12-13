import Header from '../components/Header'
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import styles from '../styles/Tutor.module.css'
import Reviewprogress from '../components/Reviewprogress';
import StarRateIcon from '@mui/icons-material/StarRate';
import {useRouter} from 'next/router'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import React, {useEffect, useState} from 'react'
import {setUser} from '../actions/User'
import Tutorpopup from '../components/Tutorpopup';

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
             alert(error)
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
                <Header />
            </div>
            { 
            
            tutor.firstname && <div className={`${styles.tutorpaewrapper}`}>
            <div className={`${styles.tutoridentitywrapperparent} flex justify-center w-80 margin-auto`}>
                    <div className={`${styles.tutoridentitywrapper}`}>
                    <Paper>
                        <div className={`flex  ${styles.tutoridentity} column w-100`}>
                            {
                                tutor.video && <iframe className={`${styles.tutoridentityvideo}`} src={`https://www.youtube.com/embed/${tutorvideo()}`}></iframe>
                            }
                            <div className={`flex wrap justify-between ${styles.tutoridentityinfo}`}>
                                <div className={`flex  ${styles.tutorinfoaboutwrapper}`}>
                                    <div  className={`${styles.tutoridentityinfoimgholder}`}>
                                        <img className={`${styles.tutoridentityinfoimg} round`} src={tutor.image} alt="" width="100" height="100"/>
                                        {/* <div className={`${styles.tutoridentityinfoonline}`}>online</div> */}
                                    </div>
                                    <div className={`${styles.tutoridentityinfoabout}`}>
                                        <b>Tutor {tutor.firstname} {' '} {tutor.lastname}</b>
                                        <div className={`text-xs`}>{tutor.subject} Tutor</div>
                                        <div className={`text-xs`}>from {tutor.country}</div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <Rating name="read-only" value={5} readOnly />
                                        <span>{tutor.rate?.toFixed(2)}</span>
                                    </div>
                                    {
                                        tutor.lessons[1] && <div>{tutor.lessons.length} Lessons</div>
                                    }
                                    {tutor.students[0] && <div>{tutor.students.length} active students</div>}
                                </div>
                            </div>
                        <div>
                                <hr />
                                    <div className={`${styles.tutordesciptiontext} text-sm`}>
                                        {tutor.description}
                                    </div>
                                <hr />
                                    </div>   
                            </div>
                        </Paper>
                    </div>
                    <div className={`${styles.tutoractionwrapper}`}>
                        <Paper >
                        <div className={`flex column ${styles.tutoraction}`}>
                            <div className={`flex justify-between ${styles.tutorrate}`}>
                                <div>Hourly Rate</div>
                                <div>USD {tutor.rate?.toFixed(2)}</div>
                            </div>
                            { 
                                user?.type == 'student' && <>
                                <button className={`${styles.tutoractionbtn}`} onClick={e => {
                                    const tuto = user.tutors.find(tut => tut.id === tutor._id)
                                    if(tuto){
                                        tuto.hours > 0 ? router.push('/calender') : setOpen(true)
                                        return
                                    }
                                    else{
                                        setOpen(true)
                                        return
                                    }
                                }}>Book A Lesson </button>
                            <button className={`${styles.tutoractionbtn}`} onClick={e => {
                                router.push(`messages?convid=${tutor._id + user._id}&&name=${tutor.firstname}&&rcrid=${tutor._id}`)
                            }}>Message {tutor.firstname}</button>
                            {/* <button className={`${styles.tutoractionbtn}`}>Add to Favorites</button> */}
                                </>
                            }
                        </div>
                        </Paper>
                    </div>
            </div>
            <div className={`${styles.tutorschedulewrapper}`}>
                <div className={`${styles.tutorshedule} border-green-400`}>
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
          </div>
                <div className={`${styles.tutorreviewswrapper}`}>
                    <Paper>
                        <div className={`${styles.tutorreviews}`}>
                            <h2 className={`center`}>what students think about Lemuel</h2>
                            <div>
                            <div className='flex justify-between'>
                                <div className={`${styles.tutorreviewoverlay}`}>
                                    <div>5.00</div>
                                    <div> <Rating name="read-only" value={5} readOnly /></div>
                                    <div>37 Reviews</div>
                                </div>
                                <div>
                                    <div className={`flex justify-between`}>
                                        <div>5 <StarRateIcon /> </div>
                                        <div><Reviewprogress /></div>
                                        <div>(5)</div>
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
                                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                            dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                            , voluptas est. Libero, fugiat aspernatur?
                                        </div>
                                    </div>                                                                                                      
                                </div>
                                <div className={`flex justify-between ${styles.tutorreview}`}>
                                    <img src="./images/femaleteacher.jpg" className={` ${styles.tutorreviewimg}`} alt="" width="100" height="100"/>
                                    <div className={`${styles.tutorreviewtext}`}>
                                        <b>Lemuel 5 <StarRateIcon /></b>
                                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                            dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                            , voluptas est. Libero, fugiat aspernatur?
                                        </div>
                                    </div>                                                                                                      
                                </div>
                                <div className={`flex justify-between ${styles.tutorreview}`}>
                                    <img src="./images/femaleteacher.jpg" className={` ${styles.tutorreviewimg}`} alt="" width="100" height="100"/>
                                    <div className={`${styles.tutorreviewtext}`}>
                                        <b>Lemuel 5 <StarRateIcon /></b>
                                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad aliquam soluta laborum omnis? Necessitatibus similique,
                                            dignissimos aliquam rerum nihil iure eos obcaecati asperiores 
                                            , voluptas est. Libero, fugiat aspernatur?
                                        </div>
                                    </div>                                                                                                      
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
            
            <div>
                
            </div>
        </div>}
        </div>
    )
}

export default Tutor
