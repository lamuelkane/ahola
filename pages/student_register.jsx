import Header2  from '../components/Header2'
import {useState, useContext, useEffect} from 'react'
import styles from '../styles/Dashboard.module.css'
import {countries, timezones} from '../components/lists'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {useRouter} from 'next/router'
import {newstudentregistered, adminstudentrequest} from '../Templates/tutor'
import Footer from '../components/Footer'
import Notification from '../components/Notification';
import Head from 'next/head'
import Link from 'next/link'


export default function Example() {
  const router = useRouter()
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [country, setcountry] = useState('')
  const [timezone, settimezone] = useState('')
  const [email, setemail] = useState('')
  const [photo, setphoto] = useState(null)
  const [password, setpassword] = useState('')
  const [comfirmpassword, setcomfirmpassword] = useState('')
  const {sever, sever2, user} = useSelector((state) => state);

    // useEffect(() => {
    //   if (user) {
    //     if (user.type === 'student') {
    //       router.push('/calender')
    //     }
    //   }
    // }, [user])

const submitrequest = async(e) => {
  e.preventDefault()

  // if(!photo) {
  //   Notification({
  //     title:"NO Profile Iamge",
  //     message:`please choose a profile image`,
  //     type:"info",
  //     container:"top-right",
  //     insert:"top",
  //     animationIn:"fadeInUp",
  //     animationOut:"fadeOut",
  //     duration:10000
  //   })
  //   return
  // }

  if(!timezone || !country) {
    Notification({
      title:"Incomplete datails",
      message:`please check your timezone or country`,
      type:"info",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })

    return
  }

  if(password !== comfirmpassword) {
    Notification({
      title:"Password's don't match",
      message:`please make sure your password matches`,
      type:"info",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
    return
  }

  const student = {
    firstname,
    lastname,
    country,
    timezone,
    email,
    image : photo,
    password
  }

  const body = {
    student,
    template: newstudentregistered(firstname, 'https://ahola.ch/tutors')
  }
  try{
    const {data} = await axios.post(`${sever}/api/users/student/singup`, body)
    await axios.post(`${sever}/api/users/email/admin`, {
      subject:'New Student',
      template: adminstudentrequest(`https://ahola.ch/dashboard`)
    } )
    localStorage.setItem('user', JSON.stringify(data))
    Notification({
      title:"SUCCESS",
      message:`successfully registerted as an Ahola student`,
      type:"success",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
    router.push('/calender')
} catch(err) {
  Notification({
    title:"Error",
    message:`an error ocurred`,
    type:"danger",
    container:"top-right",
    insert:"top",
    animationIn:"fadeInUp",
    animationOut:"fadeOut",
    duration:10000
  })
}
}

let sendimage = async(e) => {
  var bodyFormData = new FormData();
  let i = e.target.files[0]
  bodyFormData.append('file', i); 
  try {
    const {data} = await axios({
      method: "post",
      url: `${sever2}/upload`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    setphoto(`${sever2}/image/${data.filename}`)
  } catch (error) {
    Notification({
      title:"Error",
      message:`an error ocurred`,
      type:"danger",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
  }
}

  return (
    <>
          <Head>
                <title>Register</title>
                <meta name="description" content="Become a student on Ahola" />
                <link rel="icon" href="./images/logo1.png" />
                {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
            </Head>
    <div className="border"><Header2 /></div>
    <div className={`center border bg-red-500  py-10 margin-bottom`}>
            <h2 className={`text-2xl white margin-bottom`}>
            {  router.locale  === 'en-US' ? 'Register as a student'

: router.locale === 'fr' ? `S'inscrire en tant qu'étudiant`

: router.locale === 'de' ?
                          `Als Student anmelden`
: router.locale === 'es' ?
                          `Registrarse como estudiante`
: router.locale === 'zh' ?
                          `注册为学生`
:  'Register as a student'
}
            </h2> 
          
            <p className={`text-sm text-white`}>
            {  router.locale  === 'en-US' ? 'Create your very own student account with Ahola and begin your learning process'

: router.locale === 'fr' ? `Créez votre propre compte étudiant avec Ahola et commencez votre processus d'apprentissage`

: router.locale === 'de' ?
                          `Erstelle dein eigenes Studentenkonto bei Ahola und beginne deinen Lernprozess`
: router.locale === 'es' ?
                          `Crea tu propia cuenta de estudiante con Ahola y comienza tu proceso de aprendizaje`
: router.locale === 'zh' ?
                          `使用 Ahola 创建您自己的学生帐户并开始您的学习过程`
:  'Create your very own student account with Ahola and begin your learning process'
}
            </p>
        </div>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900 margin-left">
              {  router.locale  === 'en-US' ? 'Profile'

: router.locale === 'fr' ? `profil`

: router.locale === 'de' ?
                          `Profil`
: router.locale === 'es' ?
                          `perfil`
: router.locale === 'zh' ?
                          `轮廓`
:  'Profile'
}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                    {  router.locale  === 'en-US' ? 'Photo'

: router.locale === 'fr' ? `photo`

: router.locale === 'de' ?
                          `Fotol`
: router.locale === 'es' ?
                          `Foto`
: router.locale === 'zh' ?
                          `照片`
:  'Photo'
}
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        {photo ?
                        <img src={`${photo}`} alt="" height='50' width='50' className={`rounded`} />
                        : <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>}
                      </span>
                      <label
                            htmlFor="file-upload"
                            className="relative margin-x cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>
                            {  router.locale  === 'en-US' ? 'Upload a file'

: router.locale === 'fr' ? `Télécharger un fichiere`

: router.locale === 'de' ?
                          `Eine Datei hochladen`
: router.locale === 'es' ?
                          `Cargar un archivo`
: router.locale === 'zh' ?
                          `上传一个文件`
:  'Upload a file'
}
                           
                            </span>
                            <input id="file-upload" accept="image/*" name="file-upload" onChange={sendimage} type="file" className="sr-only" />
                          </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6 margin-left">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
              {  router.locale  === 'en-US' ? 'Personal Information'

: router.locale === 'fr' ? `Informations personnelles`

: router.locale === 'de' ?
                          `Persönliche Informationen`
: router.locale === 'es' ?
                          `Informacion personal`
: router.locale === 'zh' ?
                          `个人信息`
:  'Personal Information'
}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
              {  router.locale  === 'en-US' ? 'Use a permanent email address where you can receive emails.'

: router.locale === 'fr' ? `Utilisez une adresse e-mail permanente où vous pouvez recevoir des e-mails.`

: router.locale === 'de' ?
                          `Verwenden Sie eine dauerhafte E-Mail-Adresse, unter der Sie E-Mails empfangen können.`
: router.locale === 'es' ?
                          `Utilice una dirección de correo electrónico permanente donde pueda recibir correos electrónicos.`
: router.locale === 'zh' ?
                          `使用可以接收电子邮件的永久电子邮件地址。`
:  'Use a permanent email address where you can receive emails.'
}
</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={submitrequest}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                       
                        {  router.locale  === 'en-US' ? ' First name'

: router.locale === 'fr' ? `Prénom`

: router.locale === 'de' ?
                          `Vorname`
: router.locale === 'es' ?
                          `Nombre de pila`
: router.locale === 'zh' ?
                          `名`
:  ' First name'
}
                      </label>
                      <input
                      required
                      onInput={e => {
                        setfirstname(e.target.value)
                      }}
                      value={firstname}
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        
                        {  router.locale  === 'en-US' ? 'Last name'

: router.locale === 'fr' ? `Nom de famille`

: router.locale === 'de' ?
                          `Nachname`
: router.locale === 'es' ?
                          `Apellido`
: router.locale === 'zh' ?
                          `姓`
:  'Last name'
}
                      </label>
                      <input
                      required
                      onChange={e => setlastname(e.target.value)}
                      value={lastname}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        
                      {  router.locale  === 'en-US' ? 'Password'

: router.locale === 'fr' ? 'Mot de passe'

: router.locale === 'de' ?
                          'Passwort'
: router.locale === 'es' ?
                          'Contraseña'
: router.locale === 'zh' ?
                          '密码'
:  'Password'
}
                      </label>
                      <input
                      required
                      onChange={e => setpassword(e.target.value)}
                      value={password}
                        type="password"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        
                        {  router.locale  === 'en-US' ? 'comfirm password'

: router.locale === 'fr' ? 'Confirmez le mot de passe'

: router.locale === 'de' ?
                          'Kennwort bestätigen'
: router.locale === 'es' ?
                          'Confirmar contraseña'
: router.locale === 'zh' ?
                          '确认密码'
:  'comfirm password'
}
                      </label>
                      <input
                      required
                      onChange={e => setcomfirmpassword(e.target.value)}
                      value={comfirmpassword}
                        type="password"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      {  router.locale  === 'en-US' ? 'Email address'

: router.locale === 'fr' ? 'Adresse e-mail'

: router.locale === 'de' ?
                          'E-Mail-Addresse'
: router.locale === 'es' ?
                          'Dirección de correo electrónico'
: router.locale === 'zh' ?
                          '电子邮件地址'
:  'Email address'
}
                      </label>
                      <input
                      required
                      onChange={e => setemail(e.target.value)}
                      value={email}
                        type="email"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        
                        {  router.locale  === 'en-US' ? 'Country'

: router.locale === 'fr' ? 'Pays'

: router.locale === 'de' ?
                          'Land'
: router.locale === 'es' ?
                          'País'
: router.locale === 'zh' ?
                          '国家'
:  'Country'
}
                      </label>
                      <select
                        onChange={e => setcountry(e.target.value)}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option >  {  router.locale  === 'en-US' ? 'Country'

: router.locale === 'fr' ? 'Pays'

: router.locale === 'de' ?
                          'Land'
: router.locale === 'es' ?
                          'País'
: router.locale === 'zh' ?
                          '国家'
:  'Country'
}</option>
                        {
                          countries.map((country , i)=> (
                            <option key={i} >{country.label}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        
                        {  router.locale  === 'en-US' ? 'Time Zone'

: router.locale === 'fr' ? 'Fuseau horaire'

: router.locale === 'de' ?
                          'Zeitzone'
: router.locale === 'es' ?
                          'Zona horaria'
: router.locale === 'zh' ?
                          '时区'
:  'Time Zone'
}
                      </label>
                      <select
                        onChange={e => {
                          const {value} = e.target
                          settimezone(timezones.find(tz => tz.name === value))
                        }}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                         <option >{  router.locale  === 'en-US' ? 'Time Zone'

: router.locale === 'fr' ? 'Fuseau horaire'

: router.locale === 'de' ?
                          'Zeitzone'
: router.locale === 'es' ?
                          'Zona horaria'
: router.locale === 'zh' ?
                          '时区'
:  'Time Zone'
}</option>
                          {
                            timezones.map((time, i) => (
                              <option key={i} value={time.name} >{time.offset}-{time.name}</option>
                            ))
                          }
                      </select>
                    </div>
                                  
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    
                    {  router.locale  === 'en-US' ? 'Save'

: router.locale === 'fr' ? 'Sauvegarder'

: router.locale === 'de' ?
                          'Speichern'
: router.locale === 'es' ?
                          'Ahorrar'
: router.locale === 'zh' ?
                          '保存'
:  'Save'
}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
        <Footer />
    </>
  )
}
