
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Homehero from '../components/Homehero'
import Course from '../components/Course'
import ShowCase from '../components/ShowCase'
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import { useSelector } from 'react-redux'
// import Notification from '../components/Notification';
import Footer from '../components/Footer'
import Link from 'next/link'
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import AOS from 'aos';
import 'aos/dist/aos.css';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import {useRouter} from 'next/router'


let features = [
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



export default function Home(props) {
  const {sever, Courses} = useSelector((state) => state);
  const [subjects, setsubjects] = useState([])
  const router = useRouter()
  const herotext = props.herotext
  const showcase = props.showcase





  features =  router.locale === 'en-US' ?  [
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
  ]: 
   router.locale === 'de' ? 

   [
    {
      name: 'Tauchen Sie ein in eine neue Kultur',
      description: 'Verbinden Sie sich mit Sprachexperten aus der ganzen Welt, beherrschen Sie die Grundlagen und sprechen Sie wie ein Muttersprachler',
      icon: GlobeAltIcon,
    },
    {
      name:`Holen Sie sich kompetente Hilfe, wenn Sie sie brauchen
      `,
      description:
        `Lernen Sie, jedes Problem in jeder Sprache zu l??sen, unsere Tutoren stehen Ihnen immer zur Verf??gung, wann und wo immer Sie Hilfe ben??tigen
        `,
      icon: ScaleIcon,
    },
    {
      name: `Sprich nat??rlich`,
      description:
        `stets
        Machen Sie einen guten Eindruck und bauen Sie Vertrauen in jeder Sprache auf, sprechen Sie gerne selbstbewusst und kommunizieren Sie in sozialen und gesch??ftlichen Situationen
        `,
      icon: LightningBoltIcon,
    },
    {
      name: `Erfolgreich in Ihrer Karriere`,
      description:
        `Entwickeln Sie Ihr Arbeitsvokabular und kommunizieren Sie klar und erhalten Sie den Job, den Sie schon immer im Auge hatten`,
      icon: AnnotationIcon,
    },
  ] : router.locale === 'zh' ?  [
    {
      name: '?????????????????????????????????',
      description: '???????????????????????????????????????????????????????????????????????????????????????',
      icon: GlobeAltIcon,
    },
    {
      name:`??????????????????????????????
      `,
      description:
        `?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        `,
      icon: ScaleIcon,
    },
    {
      name: `????????????`,
      description:
        `??????????????????????????????????????????????????????????????????????????????????????????????????????????????????`,
      icon: LightningBoltIcon,
    },
    {
      name: `????????????????????????????????????`,
      description:
        `??????????????????????????????????????????????????????????????????????????????`,
      icon: AnnotationIcon,
    },
  ] : router.locale === 'es' ?
  [
    {
      name: 'Sum??rjase en una nueva cultura',
      description: 'Con??ctese con expertos en idiomas de todo el mundo, domine los conceptos b??sicos y hable como un nativo',
      icon: GlobeAltIcon,
    },
    {
      name:`Obtenga ayuda de expertos cuando la necesite
      `,
      description:
        `Aprenda a resolver cualquier problema en cualquier idioma, nuestros tutores est??n siempre a su disposici??n en cualquier momento y lugar donde pueda obtener la ayuda que desee.`,
      icon: ScaleIcon,
    },
    {
      name: `Habla con naturalidad`,
      description:
        `Siempre cause una buena impresi??n y genere confianza en cualquier idioma, disfrute hablando con confianza y comun??quese en situaciones sociales y comerciales `,
      icon: LightningBoltIcon,
    },
    {
      name: `Triunfa en tu carrera`,
      description:
        `Desarrolle su vocabulario de trabajo y comun??quese con claridad y obtenga ese trabajo que siempre ha tenido en cuenta.`,
      icon: AnnotationIcon,
    },
  ] : router.locale === 'fr' ? 
  [
    {
      name: 'Immergez-vous dans une nouvelle culture',
      description: 'Connectez-vous avec des experts linguistiques du monde entier, ma??trisez les bases et parlez comme un natif',
      icon: GlobeAltIcon,
    },
    {
      name:`Obtenez l'aide d'experts lorsque vous en avez besoin
      `,
      description:
        `Apprenez ?? r??soudre n'importe quel probl??me dans n'importe quelle langue, nos tuteurs sont toujours ?? votre disposition quand et o?? vous pouvez obtenir l'aide que vous d??sirez`,
      icon: ScaleIcon,
    },
    {
      name: `Parlez naturellement`,
      description:
        `Faites toujours bonne impression et renforcez la confiance dans n'importe quelle langue, aimez parler avec confiance et communiquez dans des situations sociales et professionnelles`,
      icon: LightningBoltIcon,
    },
    {
      name: `R??ussir sa carri??re`,
      description:
        `D??veloppez votre vocabulaire de travail et communiquez clairement et obtenez ce travail que vous avez toujours eu les yeux sur`,
      icon: AnnotationIcon,
    },
  ] :  
  [
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



  useEffect(() => {
    if(Courses){
      setsubjects(Courses)
    }
    AOS.init({duration: 1000});
  }, [Courses])

  return (
  <div className={`${styles.contaier} bg-gray-300`} >
      <Head>
        <title>Ahola language school</title>
        <meta name="description" content="Learn Any language with ease" />
        <link rel="icon" href="./images/logo1.png" />
        {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
        <script src="//code.tidio.co/kjrtn6giffsfdwcwl2hlmkeqrrwk1b42.js" async></script>
      </Head>
      <Homehero herotext={herotext} subjects={subjects} setsubjects={setsubjects}/>
     
      <div className={`${styles.chourseshowcase} ${styles.special} bg-gray-500 main-bg`}>
      <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <LanguageTwoToneIcon />
            </div>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-3xl font-extrabold margin-top-80 margin-bottom text-indigo-900 `}>
               {props.pagecontent.languages}
            </h2>
           {Courses[0] ? <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'lang').map(c =>  <Course key={c._id} course={c.subject[router.locale]} />)
              }
            </div> : <div>Loading Courses ...</div>}
          </div>
      </div>
      <div className={`${styles.chourseshowcase} bg-gray-500 sub-bg`}>
      <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <SchoolTwoToneIcon />
            </div>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-3xl font-extrabold margin-top-80 margin-bottom text-indigo-900 `}>
             {props.pagecontent.subjects}
               </h2>
            {Courses[0] ? <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'subj').map(c =>  <Course key={c._id} course={c.subject[router.locale]} />)
              }
            </div> : <div>Loading Courses ...</div>}
          </div>
      </div>
      <div className={`${styles.chourseshowcase} bg-gray-500 main-bg`}>
            <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <LocalLibraryTwoToneIcon />
            </div>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-3xl font-extrabold margin-top-80 margin-bottom text-indigo-900 `}>
               {props.pagecontent.Skills}
              </h2>
            {Courses[0] ?<div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'skill').map(c =>  <Course key={c._id} course={c.subject[router.locale]} />)
              }
            </div> : <div>Loading Courses ...</div>}
          </div>
      </div>



      <div className={`${styles.coolsectionwrapper} overflow-hide bg-gray-500 main-bg`}>
    <h2 className={`text-4xl text-indigo-900 font-extrabold center margin-top margin-bottom`}>
     {props.pagecontent.howaholaworks}
      </h2>
      <div>
        <div className={` ${styles.coolsection} wrap w-80 text-sm margin-auto flex justify-between align-center `}>
          <div>
              <h2 className={`text-2xl  text-indigo-900 font-extrabold margin-bottom`}>
                
                {props.pagecontent.findthebest}
                </h2>
              <p className="hide-s font-bold">
               <div>
                  {props.pagecontent.choosefromfinnest}
                  </div>
                <div>
                {props.pagecontent.usefilters}
                  </div>
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
              <h2 className={`text-2xl text-indigo-900 font-extrabold margin-bottom`}>
               {props.pagecontent.buyhourswithclick}
                </h2>
              <p className="hide-s font-bold">
               <div>
                 
                {props.pagecontent.buyhourswithtuors}
                </div>
                <div>
                 
                {props.pagecontent.usesuitable}
                  </div>
              </p>
          </div>
        </div>
      </div>
      
      <div>
        <div className={` ${styles.coolsection} wrap w-80 text-sm margin-auto margin-bottom flex justify-between align-center `}>
        <div>
              <h2 className={`text-2xl text-indigo-900 font-extrabold margin-bottom`}>
                
              {props.pagecontent.takelessons}
                </h2>
              <p className="hide-s font-bold">
               <div>
                 
                {props.pagecontent.findperfecttime}
                 </div>
                <div>
               {props.pagecontent.booklessons}
                </div>
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
            <h2 className={`center text-indigo-900 margin-top-80  text-3xl font-extrabold ${styles.showcaseheading}`}>
            {props.pagecontent.weareavailable}
           
              </h2>
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
              <h2 className={`text-2xl  text-indigo-900 font-extrabold margin-bottom`}>
                  
            {props.pagecontent.learnfromyourconfort}
              
                </h2>
              <p className="hide-s font-bold">
               <div>
             {props.pagecontent.takelessonswherever}
                  </div>
                <div>    
                {props.pagecontent.thebeauty}
                  </div>
                <div>
               {props.pagecontent.youcanlearn}
                </div>
                <div>
                  {props.pagecontent.andwithahola}
                   </div>
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
              <h2 className={`text-2xl text-indigo-900 font-extrabold margin-bottom`}>
              {props.pagecontent.takethestep}
                </h2>
              <p className="hide-s font-bold">
               <div>
                 
                {props.pagecontent.everyonesees}
                 </div>
                <div>
                  
                 {props.pagecontent.butsometimes}
                  </div>
                <div>
                  
                {props.pagecontent.learningtogo}
                  </div>
                <div>
                  {props.pagecontent.lettoptutors}
                  </div>
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
              
              {props.pagecontent.focusonskill}
          </p>
          <p className="mt-4 max-w-2xl text-xl  lg:mx-auto">
            
           {props.pagecontent.getthebest}
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
            <h3 className={`text-4xl font-extrabold text-indigo-700 margin-bottom`}>
             
             {props.pagecontent.jointeam}
              </h3>
            <p className={`margin-bottom`}>
             
             {/* {props.pagecontent.getpaid} */}
              </p>
            <p className={`margin-bottom`}>
              
            {props.pagecontent.withahola}
              </p>
            <ul className={``}>
              <li className={`margin-bottom`}>
                
               {props.pagecontent.getstudents}
                </li>
              <li className={`margin-bottom`}>
               {props.pagecontent.growcarear}
                </li>
              <li className={`margin-bottom`}>
                  {props.pagecontent.getpaid}
                </li>
            </ul>
            <button className={`${styles.showmoercoursesbutton} text-white pointer`} style={{color: 'white'}}>
              <Link href='/tutor_register'>
               
               {props.pagecontent.becometutor}
                </Link>
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


export async function getStaticProps({locale}) {
  const herotext = locale  === 'en-US' ? 
{
    main: 'Your Fluency Is Just A Few',
    second: 'Lessons Away', 
    third: ' improve yourself anytime, anywhere',
    fourth: ' Learn no matter your level A1, A2, B1, B2, C1, C2', 
    btn1: 'Explore Tutors', 
    btn2: ' Become a Tutor',
  }
   : locale === 'fr' ? 
 {
    main: "Votre aisance n'est qu'??",
    second: 'quelques le??ons', 
    third: ` am??liorez-vous ?? tout moment, n'importe o??`,
    fourth: '  Apprenez peu importe votre niveau A1, A2, B1, B2, C1, C2', 
    btn1: `Explorer les tuteurs`, 
    btn2: `Devenez Tuteur`,
  } 
  : locale === 'de' ?
   {
    main: `Ihre Sprachgewandtheit ist nur noch wenige `,
    second: 'Lektionen entfernt', 
    third: `verbessere dich jederzeit und ??berall`,
    fourth: `Lernen Sie unabh??ngig von Ihrem Niveau A1, A2, B1, B2, C1, C2`, 
    btn1: `Tutoren erkunden`, 
    btn2: `Tutor Werden`,
  } 
  : locale === 'es' ?
   {
    main: `Su fluidez es solo unas pocas `,
    second: 'lecciones lejos', 
    third: 'mejorarse a si mismo  en cualquier momento y en cualquier lugar',
    fourth: '   Aprende sin importar tu nivel A1, A2, B1, B2, C1, C2', 
    btn1: 'Explorar tutores', 
    btn2: 'Convi??rtete en tutor',
  } 
  : locale === 'zh' ?
   {
    main: `???????????????????????????????????????`,
    second: '', 
    third: '????????????????????????',
    fourth: '????????????????????? A1???A2???B1???B2???C1???C2', 
    btn1: '????????????', 
    btn2: '????????????',
  } 
  :   {
    main: 'Your Fluency Is Just A Few',
    second: 'Lessons Away', 
    third: ' improve yourself anytime, anywhere',
    fourth: ' Learn no matter your level A1, A2, B1, B2, C1, C2', 
    btn1: 'Explore Tutors', 
    btn2: ' Become a Tutor',
  }

 const showcase =  locale === 'en-US' ?  [
    { 
      title: '1-on-1 lessons with experts',
      text: 'Have 1-on-1 lessons with our proven best Tutors and attain your goals in no time',
    }, 
    { 
      title: 'Guarantee of Satisfaction',
      text: 'If you have a bad experience with a Tutor, you can always cancel the lesson and get back funds',
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
      title: '1-on-many lessons with experts',
      text: 'Have group lessons with a best Tutors and attain your goals in no time',
    }, 
  ] : 
   locale === 'de' ? 

   [
    { 
      title: 'Einzelunterricht mit Experten',
      text: 'Nehmen Sie an Einzelunterricht mit unseren nachweislich besten Tutoren teil und erreichen Sie Ihre Ziele in k??rzester Zeit',
    }, 
    { 
      title: 'Zufriedenheitsgarantie',
      text: 'Wenn Sie schlechte Erfahrungen mit einem Tutor gemacht haben, k??nnen Sie den Unterricht jederzeit abbrechen und Geld zur??ckerhalten',
    },
    { 
      title: 'Pr??fungsvorbereitung',
      text: 'Ihre Wunschnote in Pr??fungen wie IELTS, TOEFL, DELF und vielen mehr in nur einem mutigen Schritt',
    }, 
    { 
      title: 'Top-bewertete Fachleute',
      text: 'Lernen Sie von Tutoren auf der ganzen Welt mit nachgewiesener Erfahrung, damit Sie Ihre Ziele schnell erreichen',
    },
    { 
      title: 'Gesch??ftsenglisch',
      text: 'Entwickeln Sie Ihren Wortschatz und bestehen Sie das Vorstellungsgespr??ch mit Tutoren, die ??ber Branchenerfahrung verf??gen',
    },
    { 
      title: 'Konversationspraktik',
      text: 'Sprechen Sie selbstbewusst ??ber Themen, die Sie lieben, und erreichen Sie durch Konversation flie??end',
    },
    { 
      title: 'Adaptives Lernen',
      text: 'Lernen Sie bequem von zu Hause, im Job, was auch immer! und habe immer noch die beste Lernerfahrung',
    },
    { 
      title: 'Englisch f??r Kinder',
      text: 'M??chten Sie, dass Ihr Kind eine Sprache lernt, keine Sorge Ahola Tutoren sind darauf trainiert, Kindern auf unterhaltsame Weise beizubringen',
    },
   
    { 
      title: 'Einzelunterricht mit Experten',
      text: 'Haben Sie Gruppenunterricht mit den besten Tutoren und erreichen Sie Ihre Ziele in k??rzester Zeit',
    }, 
  ] : locale === 'zh' ?  [
    { 
      title: '?????????????????????',
      text: '???????????????????????????????????????????????????????????????????????????????????????',
    }, 
    { 
      title: '????????????',
      text: '?????????????????????????????????????????????????????????????????????????????????',
    },
    { 
      title: '????????????',
      text: '????????????????????????????????????????????????DELF ??????????????????????????????',
    }, 
    { 
      title: '??????????????????',
      text: '????????????????????????????????????????????????????????????????????????',
    },
    { 
      title: '????????????',
      text: '??????????????????????????????????????????????????????????????????',
    },
    { 
      title: '????????????',
      text: '????????????????????????????????????????????????????????????',
    },
    { 
      title: '???????????????',
      text: '?????????????????????????????????????????????????????? ???????????????????????????????????????',
    },
    { 
      title: '????????????',
      text: '??????????????????????????????????????????????????? Ahola Tutors ????????????????????????????????????????????????',
    },
   
    { 
      title: '?????????????????????',
      text: '??????????????????????????????????????????????????????????????????????????????',
    }, 
  ] : locale === 'es' ?
  [
    { 
      title: 'Clases 1 a 1 con expertos',
      text: 'Obtenga lecciones individuales con nuestros mejores tutores probados y alcance sus objetivos en poco tiempo',
    }, 
    { 
      title: 'Garant??a de satisfacci??n',
      text: 'Si tiene una mala experiencia con un Tutor, siempre puede cancelar la lecci??n y recuperar fondos',
    },
    { 
      title: 'Preparaci??n para el examen',
      text: 'su puntuaci??n deseada en ex??menes como IELTS, TOEFL, DELF y muchos m??s, en un solo paso audaz',
    }, 
    { 
      title: 'Profesionales mejor calificados',
      text: 'Aprenda de tutores de todo el mundo con experiencia comprobada para ayudarlo r??pidamente a alcanzar sus objetivos.',
    },
    { 
      title: 'Ingl??s de negocios',
      text: 'Desarrolle su vocabulario y pase esa entrevista de trabajo con tutores que tengan experiencia en la industria.',
    },
    { 
      title: 'Pr??ctica de conversaci??n',
      text: 'Habla con confianza sobre los temas que te gustan y logra fluidez a trav??s de la conversaci??n.',
    },
    { 
      title: 'Aprendizaje adaptativo',
      text: 'Aprenda desde la comodidad de su hogar, trabajo, ??lo que sea! y seguir teniendo la mejor experiencia de aprendizaje',
    },
    { 
      title: 'Ingl??s para ni??os',
      text: 'Quiere que su hijo aprenda un idioma, no se preocupe Los tutores de Ahola est??n capacitados para ense??ar a los ni??os de una manera divertida',
    },
   
    { 
      title: 'Lecciones de 1 a muchos con expertos',
      text: 'Tenga lecciones grupales con los mejores tutores y alcance sus objetivos en poco tiempo',
    }, 
  ] : locale === 'fr' ? 
  [
    { 
      title: 'Cours particuliers avec des experts',
      text: 'Suivez des cours particuliers avec nos meilleurs tuteurs ??prouv??s et atteignez vos objectifs en un rien de temps',
    }, 
    { 
      title: 'Garantie de satisfaction',
      text: 'Si vous avez une mauvaise exp??rience avec un tuteur, vous pouvez toujours annuler la le??on et r??cup??rer les fonds',
    },
    { 
      title: 'Pr??paration aux examens',
      text: `votre score souhait?? aux examens comme IELTS, TOEFL, DELF et bien d'autres, en une seule ??tape audacieuse`,
    }, 
    { 
      title: 'Professionnels les mieux not??s',
      text: 'Apprenez des tuteurs du monde entier avec une exp??rience ??prouv??e, pour vous aider rapidement ?? atteindre vos objectifs',
    },
    { 
      title: 'Anglais des affaires',
      text: `D??veloppez votre vocabulaire et r??ussissez cet entretien d'embauche avec des tuteurs qui ont une exp??rience dans l'industrie`,
    },
    { 
      title: 'La pratique de conversation',
      text: 'Parlez avec confiance des sujets que vous aimez et atteignez la fluidit?? gr??ce ?? la conversation',
    },
    { 
      title: 'Apprentissage adaptatif',
      text: `Apprenez dans le confort de votre maison, de votre travail, peu importe! et avoir toujours la meilleure exp??rience d'apprentissage`,
    },
    { 
      title: 'Anglais pour les enfants',
      text: 'Vous voulez que votre enfant apprenne une langue, pas de soucis Les tuteurs Ahola sont form??s pour enseigner aux enfants de mani??re amusante',
    },
   
    { 
      title: 'Cours particuliers ?? plusieurs avec des experts',
      text: 'Prenez des cours collectifs avec les meilleurs tuteurs et atteignez vos objectifs en un rien de temps',
    }, 
  ] :  
  [
    { 
      title: '1-on-1 lessons with experts',
      text: 'Have 1-on-1 lessons with our proven best Tutors and attain your goals in no time',
    }, 
    { 
      title: 'Guarantee of Satisfaction',
      text: 'If you have a bad experience with a Tutor, you can always cancel the lesson and get back funds',
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
      title: '1-on-many lessons with experts',
      text: 'Have group lessons with a best Tutors and attain your goals in no time',
    }, 
  ]

  const pagecontent = {
    languages:  locale  === 'en-US' ? 'Languages you could learn'

    : locale === 'fr' ? 'Langues que vous pourriez apprendre'

    : locale === 'de' ?
                              'Sprachen, die Sie lernen k??nnten'
    : locale === 'es' ?
                              'Idiomas que podr??as aprender'
    : locale === 'zh' ?
                              '????????????????????????'
    :  'Languages you could learn',
    subjects: locale  === 'en-US' ? 'Subjects you could learn'

         : locale === 'fr' ? 'Sujets que vous pourriez apprendre'

         : locale === 'de' ?
                                   'F??cher, die du lernen k??nntest'
         : locale === 'es' ?
                                   'Temas que podr??as aprender'
         : locale === 'zh' ?
                                   '????????????????????????'
         :  'Subjects you could learn',
      getpaid:locale  === 'en-US' ? 'Get paid'

      : locale === 'fr' ? `Soyez pay??`
      
      : locale === 'de' ?
                                'Lassen Sie sich bezahlen'
      : locale === 'es' ?
                                'Recibir salario'
      : locale === 'zh' ?
                                '????????????'
      :  'Get paid',
     becometutor: locale  === 'en-US' ? ' Become a Tutor'

     : locale === 'fr' ? `Devenez Tuteur`
     
     : locale === 'de' ?
                               'Tutor Werden'
     : locale === 'es' ?
                               'Convi??rtete en tutor'
     : locale === 'zh' ?
                               '????????????'
     :  ' Become a Tutor',
growcarear: locale  === 'en-US' ? 'Grow your carear'

: locale === 'fr' ? `D??veloppez votre carri??re`

: locale === 'de' ?
                          'Erweitern deine Karriere'
: locale === 'es' ?
                          'Haz crecer tu carrera'
: locale === 'zh' ?
                          '??????????????????'
:  'Grow your carear',
getstudents: locale  === 'en-US' ? 'Get new students'

: locale === 'fr' ? `Obtenez de nouveaux ??tudiants`

: locale === 'de' ?
                          'Holen Sie sich neue Studenten'
: locale === 'es' ?
                          'Consigue nuevos estudiantes'
: locale === 'zh' ?
                          '???????????????'
:  'Get new students',
withahola: locale  === 'en-US' ? '  with Ahola, making an extra income has never been easier'

: locale === 'fr' ? `avec Ahola, se faire un revenu suppl??mentaire n'a jamais ??t?? aussi simple`

: locale === 'de' ?
                          'Mit Ahola war es noch nie einfacher, ein zus??tzliches Einkommen zu erzielen'
: locale === 'es' ?
                          'con Ahola, obtener ingresos adicionales nunca ha sido tan f??cil'
: locale === 'zh' ?
                          '?????? Ahola???????????????????????????????????????'
:  '  with Ahola, making an extra income has never been easier',

paidforwhat: locale  === 'en-US' ? '  Get paid for what you know, by working remotely'

: locale === 'fr' ? `Soyez pay?? pour ce que vous savez, en travaillant ?? distance`

: locale === 'de' ?
                          'Lassen Sie sich f??r das bezahlen, was Sie wissen, indem Sie aus der Ferne arbeiten'
: locale === 'es' ?
                          'Reciba dinero por lo que sabe, trabajando de forma remota'
: locale === 'zh' ?
                          '??????????????????????????????'
:  '  Get paid for what you know, by working remotely',


jointeam:   locale  === 'en-US' ? ' Join Our Team'

: locale === 'fr' ? `Rejoins notre ??quipe`

: locale === 'de' ?
                          'Werden Sie Teil unseres Teams'
: locale === 'es' ?
                          'Unete a nuestro equipo'
: locale === 'zh' ?
                          '?????????????????????'
:  ' Join Our Team', 


getthebest:   locale  === 'en-US' ? 'Get the best out of yourself with our professionals working hands in gloves with you to ensure you achieve your goals as soon as possible'

: locale === 'fr' ? `Tirez le meilleur de vous-m??me avec nos professionnels qui travaillent main dans la main avec vous pour vous assurer d'atteindre vos objectifs le plus rapidement possible`

: locale === 'de' ?
                          'Holen Sie das Beste aus sich heraus, wenn unsere Profis Hand in Hand mit Ihnen arbeiten, um sicherzustellen, dass Sie Ihre Ziele so schnell wie m??glich erreichen'
: locale === 'es' ?
                          'Obtenga lo mejor de usted mismo con nuestros profesionales trabajando de la mano a mano para asegurarse de que logre sus objetivos lo antes posible.'
: locale === 'zh' ?
                          '???????????????????????????????????????????????????????????????????????????????????????????????????'
:  'Get the best out of yourself with our professionals working hands in gloves with you to ensure you achieve your goals as soon as possible',



focusonskill: locale  === 'en-US' ? 'Focus on building the skills you need'

: locale === 'fr' ? `Concentrez-vous sur le d??veloppement des comp??tences dont vous avez besoin`

: locale === 'de' ?
                          'Konzentrieren Sie sich darauf, die F??higkeiten aufzubauen, die Sie brauchen'
: locale === 'es' ?
                          'Conc??ntrese en desarrollar las habilidades que necesita'
: locale === 'zh' ?
                          '?????????????????????????????????'
:  'Focus on building the skills you need',


lettoptutors: locale  === 'en-US' ? '  let Ahola top rated tutors help you get there'

: locale === 'fr' ? `laissez les tuteurs les mieux not??s d'Ahola vous aider ?? y arriver`

: locale === 'de' ?
                          'Lassen Sie sich von den bestbewerteten Tutoren von Ahola dabei helfen, Ihr Ziel zu erreichen'
: locale === 'es' ?
                          'deja que los tutores mejor calificados de Ahola te ayuden a llegar all??'
: locale === 'zh' ?
                          '???Ahola ???????????????????????????????????????'
:  '  let Ahola top rated tutors help you get there',


learningtogo: locale  === 'en-US' ? 'learning to ge there.'

: locale === 'fr' ? ``

: locale === 'de' ?
                          'lernen, dabei zu sein.'
: locale === 'es' ?
                          'aprendiendo a estar ah??.'
: locale === 'zh' ?
                          '??????????????????'
:  'learning to ge there.',


butsometimes:  locale  === 'en-US' ? 'But sometimes, we need to do a little'

: locale === 'fr' ? `Mais parfois, nous devons faire un peu apprendre ?? ??tre l??.`

: locale === 'de' ?
                          'Aber manchmal m??ssen wir ein bisschen tun'
: locale === 'es' ?
                          'Pero a veces, necesitamos hacer un poco'
: locale === 'zh' ?
                          '?????????????????????????????????'
:  'But sometimes, we need to do a little',


everyonesees: locale  === 'en-US' ? 'Everyone sees a better version of themselves,'

: locale === 'fr' ? `Tout le monde voit une meilleure version d'eux-m??mes`

: locale === 'de' ?
                          'Jeder sieht eine bessere Version von sich selbst,'
: locale === 'es' ?
                          'Todos ven una mejor versi??n de s?? mismos,'
: locale === 'zh' ?
                          '???????????????????????????????????????'
:  'Everyone sees a better version of themselves,',


takethestep: locale  === 'en-US' ? 'Take the step to become a better you'

: locale === 'fr' ? `Faites le pas pour devenir un meilleur vous`

: locale === 'de' ?
                          'Machen Sie den Schritt, um ein besseres Ich zu werden'
: locale === 'es' ?
                          'Da el paso para convertirte en un mejor t??'
: locale === 'zh' ?
                          '????????????????????????????????????'
:  'Take the step to become a better you',



andwithahola: locale  === 'en-US' ? 'and with Ahola, it has never been easier'

: locale === 'fr' ? `et avec Ahola, ??a n'a jamais ??t?? aussi facile`

: locale === 'de' ?
                          'und mit Ahola war es noch nie so einfach'
: locale === 'es' ?
                          'y con Ahola nunca ha sido tan f??cil'
: locale === 'zh' ?
                          '?????? Ahola??????????????????????????????'
:  'and with Ahola, it has never been easier',
youcanlearn:locale  === 'en-US' ? 'you can learn from wherever seems confortable to you'

: locale === 'fr' ? `vous pouvez apprendre de partout o?? cela vous semble confortable`

: locale === 'de' ?
                          'du kannst von ??berall lernen, wo es dir angenehm erscheint'
: locale === 'es' ?
                          'puedes aprender de donde te parezca c??modo'
: locale === 'zh' ?
                          '????????????????????????????????????????????????'
:  'you can learn from wherever seems confortable to you',


thebeauty: locale  === 'en-US' ? 'The beauty about online learning is .'

: locale === 'fr' ? `La beaut?? de l'apprentissage en ligne est .`

: locale === 'de' ?
                          'Das Sch??ne am Online-Lernen ist .'
: locale === 'es' ?
                          'La belleza del aprendizaje en l??nea es.'
: locale === 'zh' ?
                          '????????????????????????????????????'
:  'The beauty about online learning is .',
takelessonswherever:locale  === 'en-US' ? 'Take lessons from whereever and Whenever you want.'

:locale === 'fr' ? `Prenez des le??ons d'o?? et quand vous voulez.`

:locale === 'de' ?
                          'Nehmen Sie Unterricht, wo und wann immer Sie wollen.'
:locale === 'es' ?
                          'Tome lecciones de donde quiera y cuando quiera.'
:locale === 'zh' ?
                          '?????????????????????????????????????????????????????????'
:  'Take lessons from whereever and Whenever you want.',
Skills:locale  === 'en-US' ? 'Skills you could learn'

     : locale === 'fr' ? 'Comp??tences que vous pourriez apprendre'

     : locale === 'de' ?
                               'F??higkeiten, die Sie lernen k??nnten'
     : locale === 'es' ?
                               'Habilidades que podr??as aprender'
     : locale === 'zh' ?
                               '????????????????????????'
     :  'Skills you could learn',
learnfromyourconfort:locale  === 'en-US' ? 'Learn From Your Comfort Zone'

:locale === 'fr' ? 'Apprenez de votre zone de confort'

:locale === 'de' ?
                          'Lernen Sie aus Ihrer Komfortzone'
:locale === 'es' ?
                          'Aprenda de su zona de confort'
:locale === 'zh' ?
                          '????????????????????????'
:  'Learn From Your Comfort Zone',


weareavailable:locale  === 'en-US' ? ' We Are Available 24 hours a day, 365 days a year'

: locale === 'fr' ? 'Nous sommes disponibles 24 heures par jour, 365 jours par an'

: locale === 'de' ?
                          'Wir sind 24 Stunden am Tag, 365 Tage im Jahr f??r Sie erreichbar'
: locale === 'es' ?
                          'Estamos disponibles las 24 horas del d??a, los 365 d??as del a??o'
: locale === 'zh' ?
                          '???????????? 365 ???????????? 24 ??????????????????'
:  ' We Are Available 24 hours a day, 365 days a year',
booklessons: locale  === 'en-US' ? ' Book lessons in seconds via desktop or mobile'

: locale === 'fr' ? 'R??servez des cours en quelques secondes via ordinateur ou mobile'

: locale === 'de' ?
                          'Buchen Sie Lektionen in Sekundenschnelle ??ber den Desktop oder das Handy'
: locale === 'es' ?
                          'Reserve lecciones en segundos a trav??s de una computadora de escritorio o un dispositivo m??vil'
: locale === 'zh' ?
                          '??????????????????????????????????????????????????????'
:  ' Book lessons in seconds via desktop or mobile',


findperfecttime:locale  === 'en-US' ? 'Find the perfect time from your busy schedule. '

: locale === 'fr' ? 'Trouvez le moment id??al dans votre emploi du temps charg??.'

: locale === 'de' ?
                          'Finden Sie die perfekte Zeit aus Ihrem vollen Terminkalender.'
: locale === 'es' ?
                          'Encuentre el momento perfecto de su apretada agenda.'
: locale === 'zh' ?
                          '??????????????????????????????????????????'
:  'Find the perfect time from your busy schedule. ',

takelessons:locale  === 'en-US' ? 'Take lessons anytime'

: locale === 'fr' ? 'Prenez des cours ?? tout moment'

: locale === 'de' ?
                          'Nehmen Sie jederzeit Unterricht'
: locale === 'es' ?
                          'Toma lecciones en cualquier momento'
: locale === 'zh' ?
                          '????????????'
:  'Take lessons anytime',
usesuitable: locale  === 'en-US' ? ' Use suitable payment methods'

: locale === 'fr' ? 'Utiliser des moyens de paiement adapt??s'

: locale === 'de' ?
                          'Verwenden Sie geeignete Zahlungsmethoden'
: locale === 'es' ?
                          'Utilice m??todos de pago adecuados'
: locale === 'zh' ?
                          '???????????????????????????'
:  ' Use suitable payment methods',

buyhourswithtuors:locale  === 'en-US' ? 'Buy hours with Tutor in just one click'

: locale === 'fr' ? 'Achetez des heures avec Tutor en un seul clic'

: locale === 'de' ?
                          'Kaufen Sie Stunden mit Tutor mit nur einem Klick'
: locale === 'es' ?
                          'Compra horas con Tutor en un solo clic'
: locale === 'zh' ?
                          '???????????????????????????'
:  'Buy hours with Tutor in just one click',


buyhourswithclick: 
 locale  === 'en-US' ? ' Buy hours with just a click of a button'

: locale === 'fr' ? 'Achetez des heures en un seul clic'

: locale === 'de' ?
          'Kaufen Sie Stunden mit nur einem Klick'
: locale === 'es' ?
          'Compra horas con solo hacer clic en un bot??n'
: locale === 'zh' ?
          '?????????????????????????????????????????????'
:  ' Buy hours with just a click of a button',


usefilters: locale  === 'en-US' ? 'Use filters to narrow your search and find the perfect fit for you'

: locale === 'fr' ? 'Utilisez des filtres pour affiner votre recherche et trouver celui qui vous convient le mieux'

: locale === 'de' ?
        'Verwenden Sie Filter, um Ihre Suche einzugrenzen und die perfekte L??sung f??r Sie zu finden'
: locale === 'es' ?
        'Utilice filtros para limitar su b??squeda y encontrar la opci??n perfecta para usted'
: locale === 'zh' ?
        '?????????????????????????????????????????????????????????'
:  'Use filters to narrow your search and find the perfect fit for you',


choosefromfinnest: locale  === 'en-US' ? 'Choose from our finnest tutors.'

: locale === 'fr' ? 'Choisissez parmi nos meilleurs tuteurs.'

: locale === 'de' ?
         'W??hlen Sie aus unseren besten Tutoren.'
: locale === 'es' ?
         'Elija entre nuestros mejores tutores.'
: locale === 'zh' ?
         '????????????????????????????????????'
:  'Choose from our finnest tutors.',


findthebest: locale  === 'en-US' ? 'Find the best tutor'

: locale === 'fr' ? 'Trouvez le meilleur tuteur'

: locale === 'de' ?
                          'Finden Sie den besten Nachhilfelehrer'
: locale === 'es' ?
                          'Encuentra el mejor tutor'
: locale === 'zh' ?
                          '?????????????????????'
:  'Find the best tutor',
howaholaworks: locale  === 'en-US' ? 'How Ahola Works'

: locale === 'fr' ? 'Comment fonctionne Ahola'

: locale === 'de' ?
                    'So funktioniert Ahola'
: locale === 'es' ?
                    'C??mo act??a Ahola'
: locale === 'zh' ?
                    'Ahola???????????????'
:  'How Ahola Works',


  }

               

  

return {
  props: {
    herotext,
    showcase, 
    pagecontent
  }
}

}
