
import { LockClosedIcon } from '@heroicons/react/solid'
import Header2 from '../components/Header2'
import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link'
import {useRouter} from 'next/router'
import Notification from '../components/Notification';
import Footer from '../components/Footer'
import Head from 'next/head'


export default function Example(props) {
 const [email, setemail ] = useState('')
 const [pass, setpass] = useState('')
 const [tutor, settutor] = useState(false)

 const router = useRouter()

 const {sever, user} = useSelector((state) => state);


//  useEffect(() => {
//   if(user){
//     router.push('/messages')
//   }
//  }, [user])

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to your user account" />
        <link rel="icon" href="./images/logo1.png" />
        {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
        <script src="//code.tidio.co/kjrtn6giffsfdwcwl2hlmkeqrrwk1b42.js" async></script>
      </Head>
      <Header2 />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="./images/logo.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              {props.pagecontent.login}
            </h2>
            <p className="mt-2 text-center  text-gray-600">
              <div>
                {props.pagecontent.noaccount}
              </div>
              <span className="font-medium text-indigo-600 hover:text-indigo-500 margin-right">
                <Link href={'/student_register'}  > 
                  {props.pagecontent.studentsignup}
                </Link>
              </span>
              <span className="font-medium text-sm margin-right">
                {props.pagecontent.or}
              </span>
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                <Link href={'/tutor_register'}  > 
                {props.pagecontent.signuptutor}
                 </Link>
              </span>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST"   onSubmit={async(e) => {
                e.preventDefault()
                if (!email || !password) {
                  Notification({
                    title:"INcomplete Credentials",
                    message:`PLease input full credentials`,
                    type:"info",
                    container:"top-right",
                    insert:"top",
                    animationIn:"fadeInUp",
                    animationOut:"fadeOut",
                    duration:10000
                  })
                  return
                }
                const info ={
                  email,
                  password: pass
                }
                 try {
                   
                  const {data} = await axios.post(`${sever}/api/users/teacher/signin`, info)
                  localStorage.setItem('user', JSON.stringify(data))
                  router.push('/calender')
                 } catch (error) {
                  Notification({
                    title:"ERROR",
                    message:`An error occured, please try again. if you are a student, please change the login type `,
                    type:"danger",
                    container:"top-right",
                    insert:"top",
                    animationIn:"fadeInUp",
                    animationOut:"fadeOut",
                    duration:10000
                  })
                 }
              }}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  
                  {props.pagecontent.emailaddress}
                </label>
                <input
                value={email}
                onChange={e => setemail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  
                {props.pagecontent.password}
                </label>
                <input
                value={pass}
                onChange={e => setpass(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                {/* <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label> */}
              </div>

              {/* <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div> */}
            </div>

            <div>
              <button
             
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}


export async function getStaticProps({locale}) {
  const pagecontent = {
    password:locale  === 'en-US' ? 'Password'

    : locale === 'fr' ? 'Mot de passe'
    
    : locale === 'de' ?
                              'Passwort'
    : locale === 'es' ?
                              'Contraseña'
    : locale === 'zh' ?
                              '密码'
    :  'Password',

    emailaddress: locale  === 'en-US' ? 'Email address'

    : locale === 'fr' ? 'Adresse e-mail'
    
    : locale === 'de' ?
                              'E-Mail-Addresse'
    : locale === 'es' ?
                              'Dirección de correo electrónico'
    : locale === 'zh' ?
                              '电子邮件地址'
    :  'Email address',
    signuptutor: locale  === 'en-US' ? 'sign up as a tutor'

    : locale === 'fr' ? 'Inscrivez-vous en tant que tuteur'
    
    : locale === 'de' ?
                              'Melden Sie sich als Tutor an'
    : locale === 'es' ?
                              'Regístrate como tutor'
    : locale === 'zh' ?
                              '注册为导师'
    :  'sign up as a tutor',

    or: locale  === 'en-US' ? 'Or'

    : locale === 'fr' ? `Ou`
    
    : locale === 'de' ?
                              `Oder`
    : locale === 'es' ?
                              `O`
    : locale === 'zh' ?
                              `或者`
    :  'Or',
    studentsignup: locale  === 'en-US' ? 'Sign up as a Student '

    : locale === 'fr' ? `Inscrivez-vous en tant qu'étudiant`
    
    : locale === 'de' ?
                              'Als Student anmelden'
    : locale === 'es' ?
                              'Regístrate como estudiante'
    : locale === 'zh' ?
                              '注册为学生'
    :  'Sign up as a Student',
    noaccount:locale  === 'en-US' ? 'do not have an account?'

    : locale === 'fr' ? `Vous n'avez pas de compte?`

    : locale === 'de' ?
                              'Haben Sie kein Konto?'
    : locale === 'es' ?
                              '¿No tiene una cuenta?'
    : locale === 'zh' ?
                              '还没有账号？'
    :  'do not have an account?',

    login:locale  === 'en-US' ? 'login to your account'

    : locale === 'fr' ? 'Connectez-vous à votre compte'
    
    : locale === 'de' ?
                              'Melde dich in deinem Konto an'
    : locale === 'es' ?
                              'Ingrese a su cuenta'
    : locale === 'zh' ?
                              '登录到您的帐户'
    :  'login to your account',

    


    
  }
  return {
    props: {
      pagecontent
    }
  }
}
