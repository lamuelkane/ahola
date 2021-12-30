import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, {useEffect, useState, useRef} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import FeatureTutor from './FeatureTutor'
import axios from 'axios'
import Notification from './Notification';
import { useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';







const FeatureTutors = ({FeatureTutors}) => {
    const router = useRouter()   
    const {sever} = useSelector((state) => state);
    const [tutors, settutors] = useState([])
    const gettutors = async() => {
        try {
          const {data} = await axios.get(`${sever}/api/users/tutors`)
          settutors(data)
        } catch (error) {
            alert(error)
          Notification({
            title:"Error",
            message:`an error ocurred while getting tutors`,
            type:"danger",
            container:"top-right",
            insert:"top",
            animationIn:"fadeInUp",
            animationOut:"fadeOut",
            duration:10000
          })
        }
      }

      const width = useRef()
      const [num, setnum] = useState()
    
      useEffect(() => {
        width.current = window?.innerWidth
          if(width.current > 1000){
              setnum(4)
          }
          if(width.current > 800 && width.current < 1000){
              setnum(3)
          }
          if(width.current < 800){
              setnum(2)
          }
        //   window.onresize = () => {
        //     console.clear()
           
        // }
            
        },[width]);

    useEffect(() => {
        AOS.init({duration: 1000});
        gettutors()
    }, [])

    return (
      <div className={`margin-top-8`}>
      <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={num}
            navigation
            // pagination={{ clickable: true }}
    >
      
     {
         tutors.slice(0, 6).map(tut => <React.Fragment key={tut._id}> <SwiperSlide>
            <FeatureTutor  tutor={tut}/>
        </SwiperSlide></React.Fragment>)
     }
    </Swiper>
      </div>
    )
}

export default FeatureTutors
