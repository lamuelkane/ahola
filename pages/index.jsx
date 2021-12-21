
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Homehero from '../components/Homehero'
import Course from '../components/Course'
import ShowCase from '../components/ShowCase'
import { Carousel } from '@trendyol-js/react-carousel';
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Notification from '../components/Notification';
import Footer from '../components/Footer'

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
  // { 
  //   title: 'Adaptive Learning',
  //   text: 'Learn from the confort of your home, job, whereever! and still the best learning experience',
  // },
  { 
    title: 'English for Kids',
    text: 'Want your child to learn a Language, no worries Ahola Tutors are trained to teach children in a fun way',
  },
  // { 
  //   title: 'Guarantee of Satisfaction',
  //   text: 'If you have a bad experience with a Tutor, you can always cancel the lesson and get back funds',
  // }
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

  useEffect(() => {
    getsubjects()
  }, [axios])

  return (
    <div className={styles.contaier}>
      <Head>
        <title>Ahola language school</title>
        <meta name="description" content="Learn Any language with ease" />
        <link rel="icon" href="./images/logo1.png" />
        <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
        <script type="text/javascript" id="hs-script-loader" defer src="./translate.js" />
      </Head>
      <Homehero />
      <div className={`${styles.chourseshowcase} bg-gray-500`}>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-xl font-medium text-black`}>Feature Languages you could learn</h2>
            <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'lang').slice(0, 6).map(c =>  <Course key={c._id} course={c.subject} />)
              }
            </div>
          </div>
      </div>
      <div className={`${styles.chourseshowcase} bg-gray-500`}>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-xl font-medium text-black`}>Feature Subjects you could learn</h2>
            <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'subj').slice(0, 6).map(c =>  <Course key={c._id} course={c.subject} />)
              }
            </div>
          </div>
      </div>
      <div className={`${styles.chourseshowcase} bg-gray-500`}>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-xl font-medium text-black`}>Feature Skills you could learn</h2>
            <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'skill').slice(0, 6).map(c =>  <Course key={c._id} course={c.subject} />)
              }
            </div>
          </div>
      </div>
      <div className={`${styles.shwcasewrapper} flex column bg-gray-500 align-center bg-gray-500`}>
        <div className={`${styles.showcaseinner}`}>
            <h2 className={`center text-xl font-medium text-black ${styles.showcaseheading}`}>We Are Available 24 hours a day, 365 days a year</h2>
            <div className={`flex wrap justify-between`}>
              { 
                showcase.map((sh, i) => <React.Fragment key={i}> <ShowCase showcase={sh} /> </React.Fragment>)
              }
            </div>
        </div>
      </div>
      {/* one section  */}
            <div className={`${styles.coolsectionwrapper} bg-gray-500`}>
            <div>
        <div className={` ${styles.coolsection} wrap w-80 text-sm margin-auto flex justify-between align-center`}>
          <div>
              <h2 className={`text-2xl text-white`}>Learn From Your Comfort Zone</h2>
              <p className="hide-s">
               <div> Take lessons from whereever and Whenever you want.</div>
                <div>The beauty about online learning is .</div>
                <div>you can learn from 
                wherever seems confortable to you</div>
                <div> and with Ahola, it has never been easier</div>
              </p>
          </div>
          <div>
            <img src="./images/comfort.svg" className={`${styles.coolimage}`} alt="" />
          </div>
        </div>
      </div>
      {/* another section */}
      <div>
        <div className={` ${styles.coolsection} ${styles.coolsectionreverse} w-80 wrap margin-auto flex justify-between align-center`}>
          <div>
            <img src="./images/goal.svg" className={`${styles.coolimagereverse}`} alt="" />
          </div>
          <div>
              <h2 className={`text-2xl text-white`}>Take the step to become a better you</h2>
              <p className="hide-s">
               <div>Everyone sees a better version of themselves,</div>
                <div>But sometimes, we need to do a little</div>
                <div>learning to ge there.</div>
                <div>let Ahola top rated tutors help you get there</div>
              </p>
          </div>
        </div>
      </div>
            </div>
      {/* another section */}
      {/* <div>
        <div className={` ${styles.coolsection} w-80 wrap margin-auto flex justify-between align-center`}>
        <div>
              <h2 className={`text-2xl font-extrabold text-indigo-700`}>Freindly and understanding tutors</h2>
              <p className="hide-s">
               <div>Learning can sometimes be hard if</div>
                <div>your tutor is always frowniong.</div>
                <div>Ahola tutors have been proven to be the most friendly </div>
                <div>online tutors which makes learning fun and easy</div>
              </p>
          </div>
          <div>
            <img src="./images/friendly.svg" className={`${styles.coolimage}`} alt="" />
          </div>
        </div>
      </div> */}
      <div className={`${styles.somewrapper}`}>
      {/* feature start */}

      <div className="py-12 bg-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Focus on building the skills you need
          </p>
          <p className="mt-4 max-w-2xl text-xl text-white lg:mx-auto">
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
                  <p className="ml-16 text-xl  leading-6 font-medium">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-white-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

    </div>
    <div className={`${styles.somewrapper2} bg-gray-500`}>
        <div className={`flex ${styles.registersection} nowrap`}>
          <div>
            <h3 className={`text-2xl text-white`}>Join Our Team</h3>
            <p>Get paid for what you know, by working remotely</p>
            <small>with Ahola, making an extra income has never been easier</small>
            <ul>
              <li>Get new students</li>
              <li>Grow your carear</li>
              <li>Get paid</li>
            </ul>
            <button className={`${styles.showmoercoursesbutton} pointer`}>Become a Tutor</button>
          </div>
          <div>
            <img src="./images/team.svg" alt="" className={`${styles.registerimage}`} />
          </div>
        </div>
    </div>
        <Footer />
    </div>
  )
}
