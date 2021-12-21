import Header2  from '../components/Header2'
import {useState, useContext, useEffect} from 'react'
import styles from '../styles/Dashboard.module.css'
import {countries, timezones} from '../components/lists'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {useRouter} from 'next/router'
import {newstudentaccount} from '../Templates/student'
import Footer from '../components/Footer'
import Notification from '../components/Notification';
import Head from 'next/head'


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

  if(!photo) {
    Notification({
      title:"NO Profile Iamge",
      message:`please choose a profile image`,
      type:"info",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
    return
  }

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
    template: newstudentaccount(firstname)
  }


  try{
    const {data} = await axios.post(`${sever}/api/users/student/singup`, body)
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
                <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
                <script type="text/javascript" id="hs-script-loader" defer src="./translate.js" />
            </Head>
    <div className="border"><Header2 /></div>
    <div className={`center bg-gray-400 py-10 margin-bottom`}>
            <h2 className={`text-2xl text-indigo-700`}>become a student on Ahola</h2>
            <p className={`text-sm`}>Create your very own student account with Ahola and begin your learning process</p>
        </div>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-600">
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        {photo ?
                        <img src={`${sever2}/${photo}`} alt="" height='50' width='50' className={`rounded`} />
                        : <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>}
                      </span>
                      <label
                            htmlFor="file-upload"
                            className="relative margin-x cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
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
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
              <p className="mt-1 text-sm text-gray-600">Use a permanent email address where you can receive emails.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={submitrequest}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        First name
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
                        Last name
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
                        password
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
                        comfirm password
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
                        Email address
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
                        Country
                      </label>
                      <select
                        onChange={e => setcountry(e.target.value)}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                      
                        {
                          countries.map((country , i)=> (
                            <option key={i} >{country.label}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Time Zone
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
                    Save
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
