
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Homehero from '../components/Homehero'
import Course from '../components/Course'
import ShowCase from '../components/ShowCase'
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Notification from '../components/Notification';
import Footer from '../components/Footer'
import Link from 'next/link'
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import FeatureTutors from '../components/FeatureTutors'
import CastForEducationTwoToneIcon from '@mui/icons-material/CastForEducationTwoTone';


const features = [
  {
    name: 'Immerse yourself in a new culture',
    description: 'Connect with language experts from around the world, master the basics and speak like a Native',
    icon: GlobeAltIcon,
  },
  {
    name:`Get expert help when you need it
    `,
    description:
      `Learn to solve any problem in any language, our tutors are always at your disposal whenever, whereever, you can get help you desire
      `,
    icon: ScaleIcon,
  },
  {
    name: `Speak naturally`,
    description:
      `always
      Make a good impression and build trust in any language , enjoy speaking with confidence and communicate in social & business situations
      `,
    icon: LightningBoltIcon,
  },
  {
    name: `Succeed in your career`,
    description:
      `Develop your working vocabulary and communicate clearly and get that job you've always had your eyes on`,
    icon: AnnotationIcon,
  },
]

const showcase = [
  { 
    title: '1-on-1 lessons with experts',
    text: 'Have 1-on-1 lessons with our proven best Tutors and attain your goals in no time',
  }, 
  { 
    title: '1-on-many lessons with experts',
    text: 'Have group lessons with a best Tutors and attain your goals in no time',
  }, 
  { 
    title: 'Exam preparation',
    text: 'your desired score in exams like IELTS, TOEFL, DELF and many more, in just one bold step',
  }, 
  { 
    title: 'Top Rated Professionals',
    text: 'Learn from tutors all over the world with proven experience,  to quickly help you acheive your goals',
  },
  { 
    title: 'Bussiness English',
    text: 'Develope your vocabulary and pass that job interview with tutors who have industry experience',
  },
  { 
    title: 'Conversation Practice',
    text: 'Speak confidently about topics you love and reach fluency through conversation',
  },
  { 
    title: 'Adaptive Learning',
    text: 'Learn from the confort of your home, job, whereever! and still have the best learning experience',
  },
  { 
    title: 'English for Kids',
    text: 'Want your child to learn a Language, no worries Ahola Tutors are trained to teach children in a fun way',
  },
  { 
    title: 'Guarantee of Satisfaction',
    text: 'If you have a bad experience with a Tutor, you can always cancel the lesson and get back funds',
  }
]

export default function Home() {
  const {sever} = useSelector((state) => state);
  const [subjects, setsubjects] = useState([])

  const getsubjects = async() => {
    try {
      const {data} = await axios.get(`${sever}/api/users/subjects`)
      setsubjects(data)
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
    AOS.init({duration: 1000});
  }, [axios])

  return (
  <div className={`${styles.contaier} bg-gray-300`} >
      <Head>
        <title>Ahola language school</title>
        <meta name="description" content="Learn Any language with ease" />
        <link rel="icon" href="./images/logo1.png" />
        <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script>
      </Head>
      <Homehero />
     
      <div className={`${styles.chourseshowcase} ${styles.special} bg-gray-500 main-bg`}>
      <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <LanguageTwoToneIcon />
            </div>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-3xl font-extrabold margin-top-80 margin-bottom text-indigo-900 `}> Languages you could learn</h2>
            <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'lang').map(c =>  <Course key={c._id} course={c.subject} />)
              }
            </div>
          </div>
      </div>
      <div className={`${styles.chourseshowcase} bg-gray-500 sub-bg`}>
      <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <SchoolTwoToneIcon />
            </div>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-3xl font-extrabold margin-top-80 margin-bottom text-indigo-900 `}> Subjects you could learn</h2>
            <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'subj').map(c =>  <Course key={c._id} course={c.subject} />)
              }
            </div>
          </div>
      </div>
      <div className={`${styles.chourseshowcase} bg-gray-500 main-bg`}>
            <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <LocalLibraryTwoToneIcon />
            </div>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-3xl font-extrabold margin-top-80 margin-bottom text-indigo-900 `}> Skills you could learn</h2>
            <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'skill').map(c =>  <Course key={c._id} course={c.subject} />)
              }
            </div>
          </div>
      </div>



      <div className={`${styles.coolsectionwrapper} overflow-hide bg-gray-500 main-bg`}>
    <h2 className={`text-4xl text-indigo-900 font-extrabold center margin-top margin-bottom`}>How Ahola Works</h2>
      <div>
        <div className={` ${styles.coolsection} wrap w-80 text-sm margin-auto flex justify-between align-center `}>
          <div>
              <h2 className={`text-2xl  text-indigo-900 font-extrabold margin-bottom`}>Find the best tutor</h2>
              <p className="hide-s font-bold">
               <div>Choose from our finnest tutors. </div>
                <div>Use filters to narrow your search and find the perfect fit for you</div>
              </p>
          </div>
          <div>
            <img src="./images/howaholaworks1.png"  className={`${styles.coolimage1}`} alt="" />
          </div>
        </div>
      </div>


      {/* another section */}
      <div>
        <div className={` ${styles.coolsection} ${styles.coolsectionreverse} w-80 wrap margin-auto margin-bottom flex justify-between align-center `}>
          <div>
            <img src="./images/howaholaworks3.png"  className={`${styles.coolimage1}`} alt="" />
          </div>
          <div>
              <h2 className={`text-2xl text-indigo-900 font-extrabold margin-bottom`}>Buy hours with just a click of a button</h2>
              <p className="hide-s font-bold">
               <div>Buy hours with Tutor in just one click</div>
                <div>Use suitable payment methods</div>
              </p>
          </div>
        </div>
      </div>
      
      <div>
        <div className={` ${styles.coolsection} wrap w-80 text-sm margin-auto margin-bottom flex justify-between align-center `}>
        <div>
              <h2 className={`text-2xl text-indigo-900 font-extrabold margin-bottom`}>Take lessons anytime</h2>
              <p className="hide-s font-bold">
               <div>Find the perfect time from your busy schedule. </div>
                <div> Book lessons in seconds via desktop or mobile</div>
              </p>
          </div>
          <div>
            <img src="./images/howaholaworks2.png" className={`${styles.coolimagereverse1}`} alt="" />
          </div>
        </div>
      </div>
            </div>



      <div className={`${styles.shwcasewrapper} flex column bg-gray-500 align-center bg-gray-500 main-bg`}>
      <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <EventAvailableTwoToneIcon />
            </div>
        <div className={`${styles.showcaseinner}`}>
            <h2 className={`center text-indigo-900 margin-top-80  text-3xl font-extrabold ${styles.showcaseheading}`}>We Are Available 24 hours a day, 365 days a year</h2>
            <div className={`flex wrap justify-between`}>
              { 
                showcase.map((sh, i) => <React.Fragment key={i}> <ShowCase showcase={sh} /> </React.Fragment>)
              }
            </div>
        </div>
      </div>
      {/* one section  */}
           
            
            

            <div className={`${styles.coolsectionwrapper} overflow-hide bg-gray-500 main-bg`}>
            <div>
        <div className={` ${styles.coolsection} wrap w-80 text-sm margin-auto flex justify-between align-center `}>
          <div>
              <h2 className={`text-2xl  text-indigo-900 font-extrabold margin-bottom`}>Learn From Your Comfort Zone</h2>
              <p className="hide-s font-bold">
               <div> Take lessons from whereever and Whenever you want.</div>
                <div>The beauty about online learning is .</div>
                <div>you can learn from 
                wherever seems confortable to you</div>
                <div> and with Ahola, it has never been easier</div>
              </p>
          </div>
          <div>
            <img src="./images/confort1.jpg" data-aos="slide-left" className={`${styles.coolimage}`} alt="" />
          </div>
        </div>
      </div>
      {/* another section */}
      <div>
        <div className={` ${styles.coolsection} ${styles.coolsectionreverse} w-80 wrap margin-auto margin-bottom flex justify-between align-center `}>
          <div>
            <img src="./images/step4.jpg" data-aos="slide-right" className={`${styles.coolimagereverse}`} alt="" />
          </div>
          <div>
              <h2 className={`text-2xl text-indigo-900 font-extrabold margin-bottom`}>Take the step to become a better you</h2>
              <p className="hide-s font-bold">
               <div>Everyone sees a better version of themselves,</div>
                <div>But sometimes, we need to do a little</div>
                <div>learning to ge there.</div>
                <div>let Ahola top rated tutors help you get there</div>
              </p>
          </div>
        </div>
      </div>
            </div>

            
      <div className={`${styles.somewrapper}`}>
      {/* feature start */}

      <div className="py-12 bg-gray-500 main-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-indigo-900 sm:text-4xl">
              Focus on building the skills you need
          </p>
          <p className="mt-4 max-w-2xl text-xl  lg:mx-auto">
            Get the best out of yoursef with our proffesionals working hands in gloves with you to ensure you acheive your goals as soon as possible
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative flex column">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-xl text-indigo-900 leading-6 font-medium">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>


    
   

    </div>
    <div className={`${styles.somewrapper2} bg-gray-500 main-bg`} style={{padding: '0px'}}>
        <div className={`flex ${styles.registersection} nowrap`}>
          <div style={{textAlign: 'justify'}} className={`padding`}>
            <h3 className={`text-4xl font-extrabold text-indigo-700 margin-bottom`}>Join Our Team</h3>
            <p className={`margin-bottom`}>Get paid for what you know, by working remotely</p>
            <p className={`margin-bottom`}>with Ahola, making an extra income has never been easier</p>
            <ul className={``}>
              <li className={`margin-bottom`}>Get new students</li>
              <li className={`margin-bottom`}>Grow your carear</li>
              <li className={`margin-bottom`}>Get paid</li>
            </ul>
            <button className={`${styles.showmoercoursesbutton} pointer`}>
              <Link href='/tutor_register'>Become a Tutor</Link>
            </button>
          </div>
          <div style={{width: '50%', background: 'black'}} className={`${styles.joinimageholder}`}>
            <img src="./images/team.jpg" alt="" className={`${styles.registerimage}`} style={{width: '100%', height: '100%'}} />
          </div>
        </div>
    </div>
        <Footer />
    </div>
  )
}
