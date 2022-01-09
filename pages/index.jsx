
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

let showcase = [
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

export default function Home() {
  const {sever} = useSelector((state) => state);
  const [subjects, setsubjects] = useState([])
  const router = useRouter()

  showcase =  router.locale === 'en-US' ?  [
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
   router.locale === 'de' ? 

   [
    { 
      title: 'Einzelunterricht mit Experten',
      text: 'Nehmen Sie an Einzelunterricht mit unseren nachweislich besten Tutoren teil und erreichen Sie Ihre Ziele in kürzester Zeit',
    }, 
    { 
      title: 'Zufriedenheitsgarantie',
      text: 'Wenn Sie schlechte Erfahrungen mit einem Tutor gemacht haben, können Sie den Unterricht jederzeit abbrechen und Geld zurückerhalten',
    },
    { 
      title: 'Prüfungsvorbereitung',
      text: 'Ihre Wunschnote in Prüfungen wie IELTS, TOEFL, DELF und vielen mehr in nur einem mutigen Schritt',
    }, 
    { 
      title: 'Top-bewertete Fachleute',
      text: 'Lernen Sie von Tutoren auf der ganzen Welt mit nachgewiesener Erfahrung, damit Sie Ihre Ziele schnell erreichen',
    },
    { 
      title: 'Geschäftsenglisch',
      text: 'Entwickeln Sie Ihren Wortschatz und bestehen Sie das Vorstellungsgespräch mit Tutoren, die über Branchenerfahrung verfügen',
    },
    { 
      title: 'Konversationspraktik',
      text: 'Sprechen Sie selbstbewusst über Themen, die Sie lieben, und erreichen Sie durch Konversation fließend',
    },
    { 
      title: 'Adaptives Lernen',
      text: 'Lernen Sie bequem von zu Hause, im Job, was auch immer! und habe immer noch die beste Lernerfahrung',
    },
    { 
      title: 'Englisch für Kinder',
      text: 'Möchten Sie, dass Ihr Kind eine Sprache lernt, keine Sorge Ahola Tutoren sind darauf trainiert, Kindern auf unterhaltsame Weise beizubringen',
    },
   
    { 
      title: 'Einzelunterricht mit Experten',
      text: 'Haben Sie Gruppenunterricht mit den besten Tutoren und erreichen Sie Ihre Ziele in kürzester Zeit',
    }, 
  ] : router.locale === 'zh' ?  [
    { 
      title: '专家一对一授课',
      text: '与我们久经考验的最佳导师进行一对一课程，并立即实现您的目标',
    }, 
    { 
      title: '满意保证',
      text: '如果您对导师有不好的经历，您可以随时取消课程并收回资金',
    },
    { 
      title: '考试准备',
      text: '只需大胆一步，即可在雅思、托福、DELF 等考试中获得理想分数',
    }, 
    { 
      title: '顶级专业人士',
      text: '向世界各地经验丰富的导师学习，快速帮助您实现目标',
    },
    { 
      title: '商务英语',
      text: '增加您的词汇量并通过具有行业经验的导师的面试',
    },
    { 
      title: '会话练习',
      text: '自信地谈论您喜欢的话题并通过对话达到流畅',
    },
    { 
      title: '适应性学习',
      text: '从舒适的家中、工作中学习，无论什么！ 并且仍然拥有最好的学习体验',
    },
    { 
      title: '儿童英语',
      text: '想让您的孩子学习一门语言，不用担心 Ahola Tutors 受过培训，可以用有趣的方式教孩子',
    },
   
    { 
      title: '专家一对多课程',
      text: '与我们最好的导师一起参加小组课程，并立即实现您的目标',
    }, 
  ] : router.locale === 'es' ?
  [
    { 
      title: 'Clases 1 a 1 con expertos',
      text: 'Obtenga lecciones individuales con nuestros mejores tutores probados y alcance sus objetivos en poco tiempo',
    }, 
    { 
      title: 'Garantía de satisfacción',
      text: 'Si tiene una mala experiencia con un Tutor, siempre puede cancelar la lección y recuperar fondos',
    },
    { 
      title: 'Preparación para el examen',
      text: 'su puntuación deseada en exámenes como IELTS, TOEFL, DELF y muchos más, en un solo paso audaz',
    }, 
    { 
      title: 'Profesionales mejor calificados',
      text: 'Aprenda de tutores de todo el mundo con experiencia comprobada para ayudarlo rápidamente a alcanzar sus objetivos.',
    },
    { 
      title: 'Inglés de negocios',
      text: 'Desarrolle su vocabulario y pase esa entrevista de trabajo con tutores que tengan experiencia en la industria.',
    },
    { 
      title: 'Práctica de conversación',
      text: 'Habla con confianza sobre los temas que te gustan y logra fluidez a través de la conversación.',
    },
    { 
      title: 'Aprendizaje adaptativo',
      text: 'Aprenda desde la comodidad de su hogar, trabajo, ¡lo que sea! y seguir teniendo la mejor experiencia de aprendizaje',
    },
    { 
      title: 'Inglés para niños',
      text: 'Quiere que su hijo aprenda un idioma, no se preocupe Los tutores de Ahola están capacitados para enseñar a los niños de una manera divertida',
    },
   
    { 
      title: 'Lecciones de 1 a muchos con expertos',
      text: 'Tenga lecciones grupales con los mejores tutores y alcance sus objetivos en poco tiempo',
    }, 
  ] : router.locale === 'fr' ? 
  [
    { 
      title: 'Cours particuliers avec des experts',
      text: 'Suivez des cours particuliers avec nos meilleurs tuteurs éprouvés et atteignez vos objectifs en un rien de temps',
    }, 
    { 
      title: 'Garantie de satisfaction',
      text: 'Si vous avez une mauvaise expérience avec un tuteur, vous pouvez toujours annuler la leçon et récupérer les fonds',
    },
    { 
      title: 'Préparation aux examens',
      text: `votre score souhaité aux examens comme IELTS, TOEFL, DELF et bien d'autres, en une seule étape audacieuse`,
    }, 
    { 
      title: 'Professionnels les mieux notés',
      text: 'Apprenez des tuteurs du monde entier avec une expérience éprouvée, pour vous aider rapidement à atteindre vos objectifs',
    },
    { 
      title: 'Anglais des affaires',
      text: `Développez votre vocabulaire et réussissez cet entretien d'embauche avec des tuteurs qui ont une expérience dans l'industrie`,
    },
    { 
      title: 'La pratique de conversation',
      text: 'Parlez avec confiance des sujets que vous aimez et atteignez la fluidité grâce à la conversation',
    },
    { 
      title: 'Apprentissage adaptatif',
      text: `Apprenez dans le confort de votre maison, de votre travail, peu importe! et avoir toujours la meilleure expérience d'apprentissage`,
    },
    { 
      title: 'Anglais pour les enfants',
      text: 'Vous voulez que votre enfant apprenne une langue, pas de soucis Les tuteurs Ahola sont formés pour enseigner aux enfants de manière amusante',
    },
   
    { 
      title: 'Cours particuliers à plusieurs avec des experts',
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
        `Lernen Sie, jedes Problem in jeder Sprache zu lösen, unsere Tutoren stehen Ihnen immer zur Verfügung, wann und wo immer Sie Hilfe benötigen
        `,
      icon: ScaleIcon,
    },
    {
      name: `Sprich natürlich`,
      description:
        `stets
        Machen Sie einen guten Eindruck und bauen Sie Vertrauen in jeder Sprache auf, sprechen Sie gerne selbstbewusst und kommunizieren Sie in sozialen und geschäftlichen Situationen
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
      name: '让自己沉浸在新的文化中',
      description: '与来自世界各地的语言专家联系，掌握基础知识并像母语一样说话',
      icon: GlobeAltIcon,
    },
    {
      name:`在需要时获得专家帮助
      `,
      description:
        `学习用任何语言解决任何问题，无论何时何地，我们的导师随时为您服务，您可以获得所需的帮助
        `,
      icon: ScaleIcon,
    },
    {
      name: `说话自然`,
      description:
        `总是用任何语言给人留下好印象并建立信任，享受自信地说话并在社交和商业场合交流`,
      icon: LightningBoltIcon,
    },
    {
      name: `在你的职业生涯中取得成功`,
      description:
        `增加您的工作词汇量并清晰地沟通并获得您一直关注的工作`,
      icon: AnnotationIcon,
    },
  ] : router.locale === 'es' ?
  [
    {
      name: 'Sumérjase en una nueva cultura',
      description: 'Conéctese con expertos en idiomas de todo el mundo, domine los conceptos básicos y hable como un nativo',
      icon: GlobeAltIcon,
    },
    {
      name:`Obtenga ayuda de expertos cuando la necesite
      `,
      description:
        `Aprenda a resolver cualquier problema en cualquier idioma, nuestros tutores están siempre a su disposición en cualquier momento y lugar donde pueda obtener la ayuda que desee.`,
      icon: ScaleIcon,
    },
    {
      name: `Habla con naturalidad`,
      description:
        `Siempre cause una buena impresión y genere confianza en cualquier idioma, disfrute hablando con confianza y comuníquese en situaciones sociales y comerciales `,
      icon: LightningBoltIcon,
    },
    {
      name: `Triunfa en tu carrera`,
      description:
        `Desarrolle su vocabulario de trabajo y comuníquese con claridad y obtenga ese trabajo que siempre ha tenido en cuenta.`,
      icon: AnnotationIcon,
    },
  ] : router.locale === 'fr' ? 
  [
    {
      name: 'Immergez-vous dans une nouvelle culture',
      description: 'Connectez-vous avec des experts linguistiques du monde entier, maîtrisez les bases et parlez comme un natif',
      icon: GlobeAltIcon,
    },
    {
      name:`Obtenez l'aide d'experts lorsque vous en avez besoin
      `,
      description:
        `Apprenez à résoudre n'importe quel problème dans n'importe quelle langue, nos tuteurs sont toujours à votre disposition quand et où vous pouvez obtenir l'aide que vous désirez`,
      icon: ScaleIcon,
    },
    {
      name: `Parlez naturellement`,
      description:
        `Faites toujours bonne impression et renforcez la confiance dans n'importe quelle langue, aimez parler avec confiance et communiquez dans des situations sociales et professionnelles`,
      icon: LightningBoltIcon,
    },
    {
      name: `Réussir sa carrière`,
      description:
        `Développez votre vocabulaire de travail et communiquez clairement et obtenez ce travail que vous avez toujours eu les yeux sur`,
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
      <Homehero subjects={subjects} setsubjects={setsubjects}/>
     
      <div className={`${styles.chourseshowcase} ${styles.special} bg-gray-500 main-bg`}>
      <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <LanguageTwoToneIcon />
            </div>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-3xl font-extrabold margin-top-80 margin-bottom text-indigo-900 `}>
               
               {  router.locale  === 'en-US' ? 'Languages you could learn'

                    : router.locale === 'fr' ? 'Langues que vous pourriez apprendre'

                    : router.locale === 'de' ?
                                              'Sprachen, die Sie lernen könnten'
                    : router.locale === 'es' ?
                                              'Idiomas que podrías aprender'
                    : router.locale === 'zh' ?
                                              '你可以学习的语言'
                    :  'Languages you could learn'
                    }
            </h2>
            <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'lang').map(c =>  <Course key={c._id} course={c.subject[router.locale]} />)
              }
            </div>
          </div>
      </div>
      <div className={`${styles.chourseshowcase} bg-gray-500 sub-bg`}>
      <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <SchoolTwoToneIcon />
            </div>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-3xl font-extrabold margin-top-80 margin-bottom text-indigo-900 `}>
               
                
               {  router.locale  === 'en-US' ? 'Subjects you could learn'

                    : router.locale === 'fr' ? 'Sujets que vous pourriez apprendre'

                    : router.locale === 'de' ?
                                              'Fächer, die du lernen könntest'
                    : router.locale === 'es' ?
                                              'Temas que podrías aprender'
                    : router.locale === 'zh' ?
                                              '你可以学习的科目'
                    :  'Subjects you could learn'
                    }
               </h2>
            <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'subj').map(c =>  <Course key={c._id} course={c.subject[router.locale]} />)
              }
            </div>
          </div>
      </div>
      <div className={`${styles.chourseshowcase} bg-gray-500 main-bg`}>
            <div className={`stroke-cyan-500 hover:stroke-cyan-700 ${styles.courseiconhoder}`}>
                <LocalLibraryTwoToneIcon />
            </div>
          <div className={`flex column align-center w-xs-100 ${styles.coureswrapper}`}>
            <h2 className={`text-3xl font-extrabold margin-top-80 margin-bottom text-indigo-900 `}>
               
               {  router.locale  === 'en-US' ? 'Skills you could learn'

                    : router.locale === 'fr' ? 'Compétences que vous pourriez apprendre'

                    : router.locale === 'de' ?
                                              'Fähigkeiten, die Sie lernen könnten'
                    : router.locale === 'es' ?
                                              'Habilidades que podrías aprender'
                    : router.locale === 'zh' ?
                                              '你可以学习的技能'
                    :  'Skills you could learn'
                    }
              </h2>
            <div className={`flex wrap justify-between`}>
              {
                subjects.filter(su => su.type === 'skill').map(c =>  <Course key={c._id} course={c.subject[router.locale]} />)
              }
            </div>
          </div>
      </div>



      <div className={`${styles.coolsectionwrapper} overflow-hide bg-gray-500 main-bg`}>
    <h2 className={`text-4xl text-indigo-900 font-extrabold center margin-top margin-bottom`}>
      
               
      {  router.locale  === 'en-US' ? 'How Ahola Works'

: router.locale === 'fr' ? 'Comment fonctionne Ahola'

: router.locale === 'de' ?
                          'So funktioniert Ahola'
: router.locale === 'es' ?
                          'Cómo actúa Ahola'
: router.locale === 'zh' ?
                          'Ahola的工作原理'
:  'How Ahola Works'
}
      </h2>
      <div>
        <div className={` ${styles.coolsection} wrap w-80 text-sm margin-auto flex justify-between align-center `}>
          <div>
              <h2 className={`text-2xl  text-indigo-900 font-extrabold margin-bottom`}>
                
                {  router.locale  === 'en-US' ? 'Find the best tutor'

: router.locale === 'fr' ? 'Trouvez le meilleur tuteur'

: router.locale === 'de' ?
                          'Finden Sie den besten Nachhilfelehrer'
: router.locale === 'es' ?
                          'Encuentra el mejor tutor'
: router.locale === 'zh' ?
                          '寻找最好的导师'
:  'Find the best tutor'
}
                </h2>
              <p className="hide-s font-bold">
               <div>
                 
                 {  router.locale  === 'en-US' ? 'Choose from our finnest tutors.'

: router.locale === 'fr' ? 'Choisissez parmi nos meilleurs tuteurs.'

: router.locale === 'de' ?
                          'Wählen Sie aus unseren besten Tutoren.'
: router.locale === 'es' ?
                          'Elija entre nuestros mejores tutores.'
: router.locale === 'zh' ?
                          '从我们最好的导师中选择。'
:  'Choose from our finnest tutors.'
}
                  </div>
                <div>
                  
                  {  router.locale  === 'en-US' ? 'Use filters to narrow your search and find the perfect fit for you'

: router.locale === 'fr' ? 'Utilisez des filtres pour affiner votre recherche et trouver celui qui vous convient le mieux'

: router.locale === 'de' ?
                          'Verwenden Sie Filter, um Ihre Suche einzugrenzen und die perfekte Lösung für Sie zu finden'
: router.locale === 'es' ?
                          'Utilice filtros para limitar su búsqueda y encontrar la opción perfecta para usted'
: router.locale === 'zh' ?
                          '使用过滤器缩小搜索范围并找到最适合您的'
:  'Use filters to narrow your search and find the perfect fit for you'
}
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
               
                {  router.locale  === 'en-US' ? ' Buy hours with just a click of a button'

: router.locale === 'fr' ? 'Achetez des heures en un seul clic'

: router.locale === 'de' ?
                          'Kaufen Sie Stunden mit nur einem Klick'
: router.locale === 'es' ?
                          'Compra horas con solo hacer clic en un botón'
: router.locale === 'zh' ?
                          '只需单击一下按钮即可购买小时数'
:  ' Buy hours with just a click of a button'
}
                </h2>
              <p className="hide-s font-bold">
               <div>
                 
                 {  router.locale  === 'en-US' ? 'Buy hours with Tutor in just one click'

: router.locale === 'fr' ? 'Achetez des heures avec Tutor en un seul clic'

: router.locale === 'de' ?
                          'Kaufen Sie Stunden mit Tutor mit nur einem Klick'
: router.locale === 'es' ?
                          'Compra horas con Tutor en un solo clic'
: router.locale === 'zh' ?
                          '一键购买辅导课时数'
:  'Buy hours with Tutor in just one click'
}
                </div>
                <div>
                 
                  {  router.locale  === 'en-US' ? ' Use suitable payment methods'

: router.locale === 'fr' ? 'Utiliser des moyens de paiement adaptés'

: router.locale === 'de' ?
                          'Verwenden Sie geeignete Zahlungsmethoden'
: router.locale === 'es' ?
                          'Utilice métodos de pago adecuados'
: router.locale === 'zh' ?
                          '使用合适的付款方式'
:  ' Use suitable payment methods'
}
                  </div>
              </p>
          </div>
        </div>
      </div>
      
      <div>
        <div className={` ${styles.coolsection} wrap w-80 text-sm margin-auto margin-bottom flex justify-between align-center `}>
        <div>
              <h2 className={`text-2xl text-indigo-900 font-extrabold margin-bottom`}>
                
                {  router.locale  === 'en-US' ? 'Take lessons anytime'

: router.locale === 'fr' ? 'Prenez des cours à tout moment'

: router.locale === 'de' ?
                          'Nehmen Sie jederzeit Unterricht'
: router.locale === 'es' ?
                          'Toma lecciones en cualquier momento'
: router.locale === 'zh' ?
                          '随时上课'
:  'Take lessons anytime'
}
                </h2>
              <p className="hide-s font-bold">
               <div>
                 
                 {  router.locale  === 'en-US' ? 'Find the perfect time from your busy schedule. '

: router.locale === 'fr' ? 'Trouvez le moment idéal dans votre emploi du temps chargé.'

: router.locale === 'de' ?
                          'Finden Sie die perfekte Zeit aus Ihrem vollen Terminkalender.'
: router.locale === 'es' ?
                          'Encuentre el momento perfecto de su apretada agenda.'
: router.locale === 'zh' ?
                          '从繁忙的日程中找到最佳时间。'
:  'Find the perfect time from your busy schedule. '
}
                 </div>
                <div>
                {  router.locale  === 'en-US' ? ' Book lessons in seconds via desktop or mobile'

: router.locale === 'fr' ? 'Réservez des cours en quelques secondes via ordinateur ou mobile'

: router.locale === 'de' ?
                          'Buchen Sie Lektionen in Sekundenschnelle über den Desktop oder das Handy'
: router.locale === 'es' ?
                          'Reserve lecciones en segundos a través de una computadora de escritorio o un dispositivo móvil'
: router.locale === 'zh' ?
                          '通过桌面或移动设备在几秒钟内预订课程'
:  ' Book lessons in seconds via desktop or mobile'
}
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
            {  router.locale  === 'en-US' ? ' We Are Available 24 hours a day, 365 days a year'

: router.locale === 'fr' ? 'Nous sommes disponibles 24 heures par jour, 365 jours par an'

: router.locale === 'de' ?
                          'Wir sind 24 Stunden am Tag, 365 Tage im Jahr für Sie erreichbar'
: router.locale === 'es' ?
                          'Estamos disponibles las 24 horas del día, los 365 días del año'
: router.locale === 'zh' ?
                          '我们一年 365 天，一天 24 小时为您服务'
:  ' We Are Available 24 hours a day, 365 days a year'
}
           
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
                  
              {  router.locale  === 'en-US' ? 'Learn From Your Comfort Zone'

: router.locale === 'fr' ? 'Apprenez de votre zone de confort'

: router.locale === 'de' ?
                          'Lernen Sie aus Ihrer Komfortzone'
: router.locale === 'es' ?
                          'Aprenda de su zona de confort'
: router.locale === 'zh' ?
                          '从你的舒适区学习'
:  'Learn From Your Comfort Zone'
}
              
                </h2>
              <p className="hide-s font-bold">
               <div>
                  
                    
              {  router.locale  === 'en-US' ? 'Take lessons from whereever and Whenever you want.'

: router.locale === 'fr' ? `Prenez des leçons d'où et quand vous voulez.`

: router.locale === 'de' ?
                          'Nehmen Sie Unterricht, wo und wann immer Sie wollen.'
: router.locale === 'es' ?
                          'Tome lecciones de donde quiera y cuando quiera.'
: router.locale === 'zh' ?
                          '无论何时何地，只要你愿意，就可以上课。'
:  'Take lessons from whereever and Whenever you want.'
}
                  </div>
                <div>
                  
                          
              {  router.locale  === 'en-US' ? 'The beauty about online learning is .'

: router.locale === 'fr' ? `La beauté de l'apprentissage en ligne est .`

: router.locale === 'de' ?
                          'Das Schöne am Online-Lernen ist .'
: router.locale === 'es' ?
                          'La belleza del aprendizaje en línea es.'
: router.locale === 'zh' ?
                          '在线学习的美妙之处在于。'
:  'The beauty about online learning is .'
}
                  </div>
                <div>
                {  router.locale  === 'en-US' ? 'you can learn from wherever seems confortable to you'

: router.locale === 'fr' ? `vous pouvez apprendre de partout où cela vous semble confortable`

: router.locale === 'de' ?
                          'du kannst von überall lernen, wo es dir angenehm erscheint'
: router.locale === 'es' ?
                          'puedes aprender de donde te parezca cómodo'
: router.locale === 'zh' ?
                          '你可以从任何你觉得舒服的地方学习'
:  'you can learn from wherever seems confortable to you'
}
                </div>
                <div>
                   
                   {  router.locale  === 'en-US' ? 'and with Ahola, it has never been easier'

: router.locale === 'fr' ? `et avec Ahola, ça n'a jamais été aussi facile`

: router.locale === 'de' ?
                          'und mit Ahola war es noch nie so einfach'
: router.locale === 'es' ?
                          'y con Ahola nunca ha sido tan fácil'
: router.locale === 'zh' ?
                          '有了 Ahola，一切都变得如此简单'
:  'and with Ahola, it has never been easier'
}
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
                
                {  router.locale  === 'en-US' ? 'Take the step to become a better you'

: router.locale === 'fr' ? `Faites le pas pour devenir un meilleur vous`

: router.locale === 'de' ?
                          'Machen Sie den Schritt, um ein besseres Ich zu werden'
: router.locale === 'es' ?
                          'Da el paso para convertirte en un mejor tú'
: router.locale === 'zh' ?
                          '迈出一步，成为更好的自己'
:  'Take the step to become a better you'
}
                </h2>
              <p className="hide-s font-bold">
               <div>
                 
                 {  router.locale  === 'en-US' ? 'Everyone sees a better version of themselves,'

: router.locale === 'fr' ? `Tout le monde voit une meilleure version d'eux-mêmes`

: router.locale === 'de' ?
                          'Jeder sieht eine bessere Version von sich selbst,'
: router.locale === 'es' ?
                          'Todos ven una mejor versión de sí mismos,'
: router.locale === 'zh' ?
                          '每个人都看到了更好的自己，'
:  'Everyone sees a better version of themselves,'
}
                 </div>
                <div>
                  
                  {  router.locale  === 'en-US' ? 'But sometimes, we need to do a little'

: router.locale === 'fr' ? `Mais parfois, nous devons faire un peu apprendre à être là.`

: router.locale === 'de' ?
                          'Aber manchmal müssen wir ein bisschen tun'
: router.locale === 'es' ?
                          'Pero a veces, necesitamos hacer un poco'
: router.locale === 'zh' ?
                          '但有时，我们需要做一点'
:  'But sometimes, we need to do a little'
}
                  </div>
                <div>
                  
                  {  router.locale  === 'en-US' ? 'learning to ge there.'

: router.locale === 'fr' ? ``

: router.locale === 'de' ?
                          'lernen, dabei zu sein.'
: router.locale === 'es' ?
                          'aprendiendo a estar ahí.'
: router.locale === 'zh' ?
                          '学习在那里。'
:  'learning to ge there.'
}
                  </div>
                <div>
                
                  {  router.locale  === 'en-US' ? '  let Ahola top rated tutors help you get there'

: router.locale === 'fr' ? `laissez les tuteurs les mieux notés d'Ahola vous aider à y arriver`

: router.locale === 'de' ?
                          'Lassen Sie sich von den bestbewerteten Tutoren von Ahola dabei helfen, Ihr Ziel zu erreichen'
: router.locale === 'es' ?
                          'deja que los tutores mejor calificados de Ahola te ayuden a llegar allí'
: router.locale === 'zh' ?
                          '让Ahola 最受好评的导师助您一臂之力'
:  '  let Ahola top rated tutors help you get there'
}
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
              
              {  router.locale  === 'en-US' ? 'Focus on building the skills you need'

: router.locale === 'fr' ? `Concentrez-vous sur le développement des compétences dont vous avez besoin`

: router.locale === 'de' ?
                          'Konzentrieren Sie sich darauf, die Fähigkeiten aufzubauen, die Sie brauchen'
: router.locale === 'es' ?
                          'Concéntrese en desarrollar las habilidades que necesita'
: router.locale === 'zh' ?
                          '专注于培养您需要的技能'
:  'Focus on building the skills you need'
}
          </p>
          <p className="mt-4 max-w-2xl text-xl  lg:mx-auto">
            
            {  router.locale  === 'en-US' ? 'Get the best out of yourself with our professionals working hands in gloves with you to ensure you achieve your goals as soon as possible'

: router.locale === 'fr' ? `Tirez le meilleur de vous-même avec nos professionnels qui travaillent main dans la main avec vous pour vous assurer d'atteindre vos objectifs le plus rapidement possible`

: router.locale === 'de' ?
                          'Holen Sie das Beste aus sich heraus, wenn unsere Profis Hand in Hand mit Ihnen arbeiten, um sicherzustellen, dass Sie Ihre Ziele so schnell wie möglich erreichen'
: router.locale === 'es' ?
                          'Obtenga lo mejor de usted mismo con nuestros profesionales trabajando de la mano a mano para asegurarse de que logre sus objetivos lo antes posible.'
: router.locale === 'zh' ?
                          '让我们的专业人士与您携手合作，充分发挥您的潜能，确保您尽快实现目标'
:  'Get the best out of yourself with our professionals working hands in gloves with you to ensure you achieve your goals as soon as possible'
}
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
             
              {  router.locale  === 'en-US' ? ' Join Our Team'

: router.locale === 'fr' ? `Rejoins notre équipe`

: router.locale === 'de' ?
                          'Werden Sie Teil unseres Teams'
: router.locale === 'es' ?
                          'Unete a nuestro equipo'
: router.locale === 'zh' ?
                          '加入我们的团队'
:  ' Join Our Team'
}
              </h3>
            <p className={`margin-bottom`}>
             
              {  router.locale  === 'en-US' ? '  Get paid for what you know, by working remotely'

: router.locale === 'fr' ? `Soyez payé pour ce que vous savez, en travaillant à distance`

: router.locale === 'de' ?
                          'Lassen Sie sich für das bezahlen, was Sie wissen, indem Sie aus der Ferne arbeiten'
: router.locale === 'es' ?
                          'Reciba dinero por lo que sabe, trabajando de forma remota'
: router.locale === 'zh' ?
                          '通过远程工作获得报酬'
:  '  Get paid for what you know, by working remotely'
}
              </p>
            <p className={`margin-bottom`}>
              
              {  router.locale  === 'en-US' ? '  with Ahola, making an extra income has never been easier'

: router.locale === 'fr' ? `avec Ahola, se faire un revenu supplémentaire n'a jamais été aussi simple`

: router.locale === 'de' ?
                          'Mit Ahola war es noch nie einfacher, ein zusätzliches Einkommen zu erzielen'
: router.locale === 'es' ?
                          'con Ahola, obtener ingresos adicionales nunca ha sido tan fácil'
: router.locale === 'zh' ?
                          '有了 Ahola，赚取额外收入从未如此简单'
:  '  with Ahola, making an extra income has never been easier'
}
              </p>
            <ul className={``}>
              <li className={`margin-bottom`}>
                
                {  router.locale  === 'en-US' ? 'Get new students'

: router.locale === 'fr' ? `Obtenez de nouveaux étudiants`

: router.locale === 'de' ?
                          'Holen Sie sich neue Studenten'
: router.locale === 'es' ?
                          'Consigue nuevos estudiantes'
: router.locale === 'zh' ?
                          '招收新学生'
:  'Get new students'
}
                </li>
              <li className={`margin-bottom`}>
                
                {  router.locale  === 'en-US' ? 'Grow your carear'

: router.locale === 'fr' ? `Développez votre carrière`

: router.locale === 'de' ?
                          'Erweitern deine Karriere'
: router.locale === 'es' ?
                          'Haz crecer tu carrera'
: router.locale === 'zh' ?
                          '发展你的事业'
:  'Grow your carear'
}
                </li>
              <li className={`margin-bottom`}>
                
                {  router.locale  === 'en-US' ? 'Get paid'

: router.locale === 'fr' ? `Soyez payé`

: router.locale === 'de' ?
                          'Lassen Sie sich bezahlen'
: router.locale === 'es' ?
                          'Recibir salario'
: router.locale === 'zh' ?
                          '得到报酬'
:  'Get paid'
}
                </li>
            </ul>
            <button className={`${styles.showmoercoursesbutton} pointer`}>
              <Link href='/tutor_register'>
               
                {  router.locale  === 'en-US' ? ' Become a Tutor'

: router.locale === 'fr' ? `Devenez Tuteur`

: router.locale === 'de' ?
                          'Tutor Werden'
: router.locale === 'es' ?
                          'Conviértete en tutor'
: router.locale === 'zh' ?
                          '成为导师'
:  ' Become a Tutor'
}
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
