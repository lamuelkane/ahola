import Header2  from '../components/Header2'
import {useEffect, useState,} from 'react'
import styles from '../styles/Dashboard.module.css'
import {countries, timezones} from '../components/lists'
import axios from 'axios'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import {newtutorregistered} from '../Templates/tutor'
import Footer from '../components/Footer'
import {useRouter} from 'next/router'
import Notification from '../components/Notification'
import Head from 'next/head'




export default function Example() {
  const router = useRouter()
  const [videolink, setvideolink] = useState()
  const [subjects, setsubjects] = useState([])
  const [description, setdescripion] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [country, setcountry] = useState('')
  const [timezone, settimezone] = useState('')
  const [subject, setsubject] = useState('')
  const [rate, setrate] = useState(4)
  const [email, setemail] = useState('')
  const [photo, setphoto] = useState('')
  const [video, setvideo] = useState('')
  const [password, setpassword] = useState('')
  const [comfirmpassword, setcomfirmpassword] = useState('')

  const {sever, sever2, user} = useSelector((state) => state);

  const getsubjects = async() => {
    try {
      const {data} = await axios.get(`${sever}/api/users/subjects`)
      setsubjects(data)
    } catch (error) {
      Notification({
        title:"Error",
        message:`An error occured while getting subjects`,
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

    function reverseString(str) {
    return str.split("").reverse().join("");
}

const checkvideolink = (link) => {
  if (link?.includes('youtube.com')) {
      return true
  }
  return false
}

const submitrequest = async(e) => {
  e.preventDefault()
  if(!video || description?.length < 300 || !photo) {
    Notification({
      title:"Error",
      message:`Please make sure to provide your profile credentials`,
      type:"danger",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
    return
  }

  if(!timezone || !country || !subject) {
    Notification({
      title:"Error",
      message:`please check your personal info and check if you have set timezone, subject and your country`,
      type:"danger",
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
      title:"Error",
      message:`passwords does not match, chech your entries and try again`,
      type:"danger",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
    return
  }

  const tutor = {
    video,
    description,
    firstname,
    lastname,
    country,
    timezone,
    rate,
    email,
    subject,
    image: photo,
    password,
  }

  const body = {
    tutor,
    template: newtutorregistered(firstname)
  }

  try{
      const {data} = await axios.post(`${sever}/api/users/tutor/singup`, body)
      Notification({
        title:"Register Success",
        message:`Tutor register success. please check your email for more information about your account`,
        type:"success",
        container:"top-right",
        insert:"top",
        animationIn:"fadeInUp",
        animationOut:"fadeOut",
        duration:10000
      })
  } catch(err) {
    Notification({
      title:"ERROR",
      message:`An error occured while saving tutor, please try again`,
      type:"danger",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
  }
  console.log(body)
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
      title:"ERROR",
      message:`An error occured while uploading image`,
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
                <meta name="description" content="Become a tutor on Ahola" />
                <link rel="icon" href="./images/logo1.png" />
                <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script>
            </Head>
    <div className="border"><Header2 /></div>
        <div className={`center bg-red-500 margin-bottom border py-10`}>
                <h2 className={`text-2xl text-white`}>
                {  router.locale  === 'en-US' ? 'Register as a Tutor on Ahola'

: router.locale === 'fr' ? 'Inscrivez-vous en tant que tuteur sur Ahola'

: router.locale === 'de' ?
                          'Registrieren Sie sich als Tutor auf Ahola'
: router.locale === 'es' ?
                          'Registrarse como tutor en Ahola'
: router.locale === 'zh' ?
                          '在 Ahola 上注册为导师'
:  'Register as a Tutor on Ahola'
}
                </h2> 
                <div className={`text-white`}>
                {  router.locale  === 'en-US' ? 'Or'

: router.locale === 'fr' ? `Ou`

: router.locale === 'de' ?
                          `Oder`
: router.locale === 'es' ?
                          `O`
: router.locale === 'zh' ?
                          `或者`
:  'Or'
}
                </div>
                <div className="mt-2 sm:mt-5 sm:flex sm:justify-center lg:justify-center">
                <div className="rounded-md margin-right margin-bottom shadow">
                  <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium hover:text-indigo-500 hover:border-indigo-500 rounded-md text-white bg-indigo-600 hover:bg-white md:py-4 md:text-lg md:px-10">
                  <Link href='/student_register' > 
                  {  router.locale  === 'en-US' ? 'Register as a student'

: router.locale === 'fr' ? `S'inscrire en tant qu'étudiant`

: router.locale === 'de' ?
                          'Als Student anmelden'
: router.locale === 'es' ?
                          'Registrarse como estudiante'
: router.locale === 'zh' ?
                          '注册为学生'
:  'Register as a student'
}
                  </Link>
                  </div>
                </div>
              </div>
                <p className={`text-sm text-gray-300`}>
                {  router.locale  === 'en-US' ? 'Create your very own tutor account with Ahola and start earning from home'

: router.locale === 'fr' ? `Créez votre propre compte de tuteur avec Ahola et commencez à gagner de l'argent depuis chez vous`

: router.locale === 'de' ?
                          `Erstelle dein eigenes Tutorenkonto bei Ahola und beginne, von zu Hause aus zu verdienen`
: router.locale === 'es' ?
                          `Crea tu propia cuenta de tutor con Ahola y comienza a ganar dinero desde casa`
: router.locale === 'zh' ?
                          `在 Ahola 创建您自己的导师帐户并开始在家赚钱`
:  'Create your very own tutor account with Ahola and start earning from home'
}</p>
        </div>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium margin-left leading-6 text-gray-900">  {  router.locale  === 'en-US' ? 'Profile'

: router.locale === 'fr' ? `profil`

: router.locale === 'de' ?
                          `Profil`
: router.locale === 'es' ?
                          `perfil`
: router.locale === 'zh' ?
                          `轮廓`
:  'Profile'
}</h3>
              <p className="mt-1 text-sm text-gray-600">
                
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        
                        {  router.locale  === 'en-US' ? 'Intro video link'

: router.locale === 'fr' ? `Lien vidéo d'introduction`

: router.locale === 'de' ?
                          `Einführungsvideo-Link`
: router.locale === 'es' ?
                          `Enlace de video de introducción`
: router.locale === 'zh' ?
                          `介绍视频链接`
:  'Intro video link'
}
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                        required
                        onChange={e => {
                          setvideo(e.target.value)
                          clearTimeout(typing)
                          const {value} = e.target
                          let str =  reverseString(value)
                                                              
                          let sub = checkvideolink(e.target.value) ? str.substring(0, str.indexOf("=")) : str.substring(0, str.indexOf("/"))
                          let typing = setTimeout(() => {
                             setvideolink(reverseString(sub))
                          }, 3000);
                      }} 
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                    {  router.locale  === 'en-US' ? 'Video preview'

: router.locale === 'fr' ? `Aperçu vidéo`

: router.locale === 'de' ?
                          `Video Vorschau`
: router.locale === 'es' ?
                          `Vista previa de video`
: router.locale === 'zh' ?
                          `视频预览`
:  'Video preview'
}</label>
                    <div className={`${styles.videopreview}`}>
                    {  !videolink ? <span>
                      {  router.locale  === 'en-US' ? 'paste link to view video here  '

: router.locale === 'fr' ? `coller le lien pour voir la vidéo ici`

: router.locale === 'de' ?
                          `Link einfügen, um das Video hier anzusehen`
: router.locale === 'es' ?
                          `pegue el enlace para ver el video aquí`
: router.locale === 'zh' ?
                          `粘贴链接以在此处查看视频`
:  'paste link to view video here  '
}
                    </span> : <iframe className={`${styles.videopreviewiframe}`}
                         src={`${ checkvideolink(video)? `https://www.youtube.com/embed/${videolink}` : `https://player.vimeo.com/video/${videolink}`}`}>
                          </iframe>
                            }
                    </div>
                  </div>

              
                  <div>
                    <label className="block text-sm font-medium text-gray-700">      {  router.locale  === 'en-US' ? 'Photo'

: router.locale === 'fr' ? `photo`

: router.locale === 'de' ?
                          `Fotol`
: router.locale === 'es' ?
                          `Foto`
: router.locale === 'zh' ?
                          `照片`
:  'Photo'
}</label>
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
                            <span>       {  router.locale  === 'en-US' ? 'Upload a file'

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
                            <input id="file-upload" accept='image/*' name="file-upload" onChange={sendimage} type="file" className="sr-only" />
                          </label>
                    </div>
                  </div>
                          
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      
                      {  router.locale  === 'en-US' ? 'Description'

: router.locale === 'fr' ? `La description`

: router.locale === 'de' ?
                          `Beschreibung`
: router.locale === 'es' ?
                          `Descripción`
: router.locale === 'zh' ?
                          `描述`
:  'Description'
}
                      
                    </label>
                    <div className="mt-1">
                      <textarea
                      required
                      onChange={e => setdescripion(e.target.value)}
                      value={description}
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="your description"
                        defaultValue={''}
                        minLength={300}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      
                      {  router.locale  === 'en-US' ? 'Brief description for yourself and your teaching methods of not less than 300 characters'

: router.locale === 'fr' ? `Brève description pour vous-même et vos méthodes d'enseignement d'au moins 300 caractères`

: router.locale === 'de' ?
                          `Kurze Beschreibung für Sie und Ihre Lehrmethoden von nicht weniger als 300 Zeichen`
: router.locale === 'es' ?
                          `Breve descripción para usted y sus métodos de enseñanza de no menos de 300 caracteres.`
: router.locale === 'zh' ?
                          `不低于300字的自我介绍和教学方法`
:  'Brief description for yourself and your teaching methods of not less than 300 characters'
}
                      
                    </p>
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
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{  router.locale  === 'en-US' ? 'Personal Information'

: router.locale === 'fr' ? `Informations personnelles`

: router.locale === 'de' ?
                          `Persönliche Informationen`
: router.locale === 'es' ?
                          `Informacion personal`
: router.locale === 'zh' ?
                          `个人信息`
:  'Personal Information'
}</h3>
              <p className="mt-1 text-sm text-gray-600">{  router.locale  === 'en-US' ? 'Use a permanent email address where you can receive emails.'

: router.locale === 'fr' ? `Utilisez une adresse e-mail permanente où vous pouvez recevoir des e-mails.`

: router.locale === 'de' ?
                          `Verwenden Sie eine dauerhafte E-Mail-Adresse, unter der Sie E-Mails empfangen können.`
: router.locale === 'es' ?
                          `Utilice una dirección de correo electrónico permanente donde pueda recibir correos electrónicos.`
: router.locale === 'zh' ?
                          `使用可以接收电子邮件的永久电子邮件地址。`
:  'Use a permanent email address where you can receive emails.'
}</p>
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
                      onChange={e => setfirstname(e.target.value)}
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
                      {  router.locale  === 'en-US' ? 'confirm password'

: router.locale === 'fr' ? 'Confirmez le mot de passe'

: router.locale === 'de' ?
                          'Kennwort bestätigen'
: router.locale === 'es' ?
                          'Confirmar contraseña'
: router.locale === 'zh' ?
                          '确认密码'
:  'confirm password'
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
                            <option >{  router.locale  === 'en-US' ? 'Country'

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
                          countries.map((country, i) => (
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
                        onChange={e => 
                        {
                          settimezone(timezones.find(tz => tz.name === e.target.value))
                        }}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                            <option >   {  router.locale  === 'en-US' ? 'Time Zone'

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

                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        
                        {  router.locale  === 'en-US' ? 'hourly rate'

: router.locale === 'fr' ? 'taux horaire'

: router.locale === 'de' ?
                          'Stundensatz'
: router.locale === 'es' ?
                          'tarifa por hora'
: router.locale === 'zh' ?
                          '每小时收费'
:  'hourly rate'
}
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                        required
                        onChange={e => setrate(parseInt(e.target.value))}
                        value={rate}
                          type="number"
                          name="price"
                          id="price"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                       
                        {  router.locale  === 'en-US' ? ' Dsires to teach?'

: router.locale === 'fr' ? `Envie d'enseigner ?`

: router.locale === 'de' ?
                          'Lust zu unterrichten?'
: router.locale === 'es' ?
                          '¿Deseas enseñar?'
: router.locale === 'zh' ?
                          '渴望教书？'
:  ' Dsires to teach?'
}
                      </label>
                      <select
                        onChange={e => setsubject(e.target.value)}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option></option>
                        { 
                          subjects.map(sub => <option value={sub.subject['en-US']} key={sub._id}>{sub.subject[router.locale]}</option>)
                        }
                      </select>
                    </div>
                                  
                  </div>
                </div>
                
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    // onClick={submitrequest}
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
