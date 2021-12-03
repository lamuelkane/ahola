import Header2  from '../components/Header2'
import {useState, useContext} from 'react'
import styles from '../styles/Dashboard.module.css'
import {countries, timezones} from '../components/lists'
import axios from 'axios'
import GlobalContext from '../context/Globalcontext'



export default function Example() {

  const [videolink, setvideolink] = useState()
  const [descripion, setdescripion] = useState('')
  const [firstnme, setfirstnme] = useState('')
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

  const {sever} = useContext(GlobalContext)

    function reverseString(str) {
    return str.split("").reverse().join("");
}

const submitrequest = async(e) => {
  e.preventDefault()
  if(!video || descripion?.length < 300 || !photo) {
    alert('please make sure to provide your profile cridentials')
    return
  }

  if(!timezone || !country || !subject) {
    alert('please check your personal info and check if you have set timezone, subject and your country')
    return
  }

  if(password !== comfirmpassword) {
    alert('passwords does not match, chech your entries and try again')
    return
  }

  const teacher = {
    video,
    descripion,
    firstnme,
    lastname,
    country,
    timezone,
    rate,
    email,
    subject,
    image: photo,
    password,
  }

  try{
      const {data} = await axios.post(`${sever}/api/users/tutor/singup`, teacher)
      alert('everything went fine')
  } catch(err) {
    alert(err)
  }

  console.log(teacher)
}


let sendimage = async(e) => {
  var bodyFormData = new FormData();
  let i = e.target.files[0]
  bodyFormData.append('picture', i); 
  try {
    const {data} = await axios({
      method: "post",
      url: `${sever}/api/users/upload`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    setphoto(`${sever}/uploads/${data.filename}`)
  } catch (error) {
    alert('an error ocurred while uploading image')
  }
}

  return (
    <>
    <div className="border"><Header2 /></div>
    <div className={`center bg-gray-400 py-10`}>
            <h2 className={`text-2xl text-indigo-700`}>become a Tutor on Ahola</h2>
            <p className={`text-sm`}>Create your very own tutor account with Ahola and start earning from home</p>
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
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Intro video link
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
                          let str = reverseString(value)
                                                              
                          let sub = str.substring(0, str.indexOf("="))
                          let typing = setTimeout(() => {
                             setvideolink(reverseString(sub))
                          }, 3000);
                      }} 
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Video preview</label>
                    <div className={`${styles.videopreview}`}>
                    {  !videolink ? <span>paste link to view video here</span> : <iframe
                          src={`https://www.youtube.com/embed/${videolink}`}>
                          </iframe>
                            }
                    </div>
                  </div>

              
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" accept='image/*' name="file-upload" onChange={sendimage} type="file" className="sr-only" />
                          </label>
                    </div>
                  </div>
                          
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                      required
                      onChange={e => setdescripion(e.target.value)}
                      value={descripion}
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
                      Brief description for yourself and your teaching methods of not less than 300 characters
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
                      onChange={e => setfirstnme(e.target.value)}
                      value={firstnme}
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
                          countries.map(country => (
                            <option key={country.phone} >{country.label}</option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Time Zone
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
                          {
                            timezones.map(time => (
                              <option key={time.offset} value={time.name} >{time.offset}-{time.name}</option>

                            ))
                          }
                      </select>
                    </div>

                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        hourly rate
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
                        Dsires to teach?
                      </label>
                      <select
                        onChange={e => setsubject(e.target.value)}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>English</option>
                        <option>French</option>
                        <option>Arabic</option>
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

    </>
  )
}
