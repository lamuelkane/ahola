
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Header2 from './Header2'
import {useRouter} from 'next/router'
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'



const navigation = [
  { name: 'Tutors', href: '/tutors' },
  { name: 'Register', href: '/register' },
  { name: 'Contactus', href: '/contactus' },
  { name: 'Aboutus', href: '/aboutus' },
]




export default function Example({subjects, setsubjects}) {
    const [courses, setcourses] = useState([])
    const [showsearch, setshowsearch] = useState(false)

    useEffect(() => {
      setcourses(subjects)
    }, [subjects])

  let herotext = {
    main: 'Your Fluency Is Just A Few',
    second: 'Lessons Away', 
    third: ' improve yourself anytime, anywhere',
    fourth: ' Learn no matter your level A1, A2, B1, B2, C1, C2', 
    btn1: 'Explore Tutors', 
    btn2: ' Become a Tutor',
  }

  useEffect(() => {
    AOS.init({duration: 1000});
}, [])


  const router = useRouter()

  router.locale  === 'en-US' ? 
  
  herotext = {
    main: 'Your Fluency Is Just A Few',
    second: 'Lessons Away', 
    third: ' improve yourself anytime, anywhere',
    fourth: ' Learn no matter your level A1, A2, B1, B2, C1, C2', 
    btn1: 'Explore Tutors', 
    btn2: ' Become a Tutor',
  }

   : router.locale === 'fr' ? 

   herotext = {
    main: "Votre aisance n'est qu'à",
    second: 'quelques leçons', 
    third: ` améliorez-vous à tout moment, n'importe où`,
    fourth: 'Apprenez quel que soit votre niveau A1, A2, B1, B2, C1, C2', 
    btn1: `Explorer les tuteurs`, 
    btn2: `Devenir Tuteur`,
  } 

  : router.locale === 'de' ?
  
  herotext = {
    main: `Ihre Sprachgewandtheit ist nur noch wenige `,
    second: 'Lektionen entfernt', 
    third: `verbessere dich jederzeit und überall`,
    fourth: `Lernen Sie unabhängig von Ihrem Niveau A1, A2, B1, B2, C1, C2`, 
    btn1: `Tutoren erkunden`, 
    btn2: `Werde Tutor`,
  } 
  : router.locale === 'es' ?
  
  herotext = {
    main: `Tu fluidez está a solo unas pocas `,
    second: 'lecciones de distancia', 
    third: 'superarse en cualquier momento y en cualquier lugar',
    fourth: 'Aprende sin importar tu nivel A1, A2, B1, B2, C1, C2', 
    btn1: 'Explorar tutores', 
    btn2: 'Conviértete en tutor',
  } 
  : router.locale === 'zh' ?
  
  herotext = {
    main: `只需几节课，您就可以流利`,
    second: '', 
    third: '随时随地提升自己',
    fourth: '学习任何级别的 A1、A2、B1、B2、C1、C2', 
    btn1: '探索导师', 
    btn2: '成为导师',
  } 
  :  herotext = {
    main: 'Your Fluency Is Just A Few',
    second: 'Lessons Away', 
    third: ' improve yourself anytime, anywhere',
    fourth: ' Learn no matter your level A1, A2, B1, B2, C1, C2', 
    btn1: 'Explore Tutors', 
    btn2: ' Become a Tutor',
  }




  return (

    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Header2 />
                     
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-6xl">
                <span className="block xl:inline"  data-aos="fade-up">{herotext.main}</span>{' '}
                <span className="block text-red-600 xl:inline"  data-aos="slide-left">{herotext.second}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              {herotext.third}
              <span className="text-indigo-600">{herotext.fourth}</span>
              
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md margin-right margin-bottom shadow">
                  <div className={` ${styles.coursessearch} w-full flex items-center  border border-transparent text-base font-medium rounded-md`}>
                      <input className={`${styles.coursessearchlabel} ${styles.coursessearchinput}`} type="text" placeholder='Search Courses' onChange={e => {
                        if (e.target.value === '') {
                          setshowsearch(false)
                          return
                        }
                        setshowsearch(true)
                          setcourses(subjects.filter(sub => sub.subject[router.locale].toLowerCase().includes(e.target.value.toLowerCase())))

                      }} />
                      <div className={`${styles.coursessearchlabel} bg-red-700 text-white focus:ring-transparent`}>Expore Tutors</div>
                      <div className={`${styles.courses} ${!showsearch && 'hide2'} bg-gray-500`}>
                        {
                            courses.map(sub =>  <div key={sub._id} className={`text-gray-500  text-sm margin`}><Link href={`tutors?teach=${sub.subject['en-US']}&&country=all&&lp=0&&hp=100`}>{sub.subject[router.locale]}</Link></div>)
                        }
                    </div>
                  </div>
                </div>
                <div className="rounded-md">
                  <div className="w-full flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      <Link
                        href="/tutor_register"
                      >
                        {herotext.btn2}
                      </Link>
                  </div>
                </div>
              </div>
              
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="./images/hero.jpg"
          alt=""
        />
      </div>
    </div>
  )
}
