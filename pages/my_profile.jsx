import React, { useEffect, useState } from 'react'
import DashBoardHeader from '../components/DashBoardHeader'
import Dashboardsubheader from '../components/Dashboardsubheader'
import styles from '../styles/Dashboard.module.css'
import { useSelector} from 'react-redux';
import {timezones} from '../components/lists'
import Footer from '../components/Footer'
import axios from 'axios';
import Notification from '../components/Notification';

const my_profile = () => {
  const [videolink, setvideolink] = useState()
  const [description, setdescription] = useState('')
  const [timezone, settimezone] = useState('')
  const [rate, setrate] = useState(4)
  const [email, setemail] = useState('')
  const [photo, setphoto] = useState('')
  const [video, setvideo] = useState('')
  const {user, sever, sever2} = useSelector((state) => state);

  function reverseString(str) {
    return str?.split("")?.reverse()?.join("");
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



const getvideolink = () => {
  let str = reverseString(user?.video)
  let sub = str?.substring(0, str.indexOf("="))
  let typing = setTimeout(() => {
      setvideolink(reverseString(sub))
  }, 3000);
}

const submitrequest = async() => {
  const info = {
    _id: user._id,
    description,
    timezone,
    rate,
    email,
    video,
    image: photo
  }
  try {
    const {data} = await axios.post(`${sever}/api/users/tutor/update`, info)
    Notification({
      title:"Success",
      message:`Profile Updated successfully`,
      type:"success",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
  } catch (error) {
    Notification({
      title:"ERROR",
      message:`An error occured`,
      type:"danger",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
  }
}

const submitrequest2 = async() => {
  const info = {
    _id: user._id,
    timezone,
    email,
    image: photo
  }
  try {
    const {data} = await axios.post(`${sever}/api/users/student/update`, info)
    Notification({
      title:"Success",
      message:`Profile Updated successfully`,
      type:"danger",
      container:"top-right",
      insert:"top",
      animationIn:"fadeInUp",
      animationOut:"fadeOut",
      duration:10000
    })
  } catch (error) {
    Notification({
      title:"ERROR",
      message:`An error occured`,
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
    setrate(user?.rate)
    setemail(user?.email)
    getvideolink()
    setvideo(user?.video)
    setphoto(user?.image)
    settimezone(user?.timezone)
    setdescription(user?.description)
  }, [user])

    return user?.type === 'student' ?
    (
        <div>
            <div className="border">
                 <DashBoardHeader />
            </div>
            <Dashboardsubheader />

            <div className="bg-white w-80 margin-auto margin-top shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Your Profile Information</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">First name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.firstname}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Last name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.lastname}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Country</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.country}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><input type="email" value={email} onChange={e => setemail(e.target.value)} name="" id="" /></dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                  Time Zone
                                </label>
                                <select
                                  onChange={e => 
                                  {
                                    settimezone(timezones.find(tz => tz.name === e.target.value))
                                  }}
                                  value={user?.timezone.name}
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
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Profile Image</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div>
                        <label
                          htmlFor="file-upload"
                          className="relative margin-x cursor-pointer"
                        >
                            <img src={photo} width='100px' height='100px' alt="" />
                        </label>
                            <input id="file-upload" accept='image/*' name="file-upload" onChange={sendimage} type="file" className="sr-only" />
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    onClick={submitrequest2}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save changes
                  </button>
                </div>
           </div>
           <Footer />
        </div>
    ) : (
      <div>
          <div className="border">
               <DashBoardHeader />
          </div>
          <Dashboardsubheader />

          <div className="bg-white w-80 margin-auto margin-top shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Your Profile Information</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">First name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.firstname}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Last name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.lastname}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Country</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.country}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Subject taught</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.subject}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><input type="email" value={email} onChange={e => {
                        setemail(e.target.value)
                        user.email = e.target.value
                      }} name="" id="" /></dd>
                    </div>
                    
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Rate per hour</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"><input type="number" value={rate} onChange={e => {
                        setrate(e.target.value)
                        user.rate = e.target.value
                      }} name="" id="" /></dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="col-span-6 sm:col-span-3">
                                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Time Zone
                                  </label>
                                  <select
                                    onChange={e => 
                                    {
                                      settimezone(timezones.find(tz => tz.name === e.target.value))
                                      user.timezone = timezones.find(tz => tz.name === e.target.value)
                                    }}
                                    value={timezone}
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
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Description</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <textarea name="" onChange={e => {
                          setdescription(e.target.value)
                          user.description = e.target.value
                        }} value={description} id="" cols="60" rows="7"></textarea>
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Profile Image</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div>
                        <label
                          htmlFor="file-upload"
                          className="relative margin-x cursor-pointer"
                        >
                            <img src={photo} width='100px' height='100px' alt="" />
                        </label>
                            <input id="file-upload" accept='image/*' name="file-upload" onChange={sendimage} type="file" className="sr-only" />
                        </div>
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Profile Video</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
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
                                      user.video = e.target.value
                                    }, 3000);
                                }} 
                                    type="text"
                                    name="company-website"
                                    id="company-website"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    placeholder="www.youtube.com/xxx"
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-3">Video preview</label>
                              <div className={`${styles.videopreview}`}>
                              {  !videolink ? <span>paste link to view video here</span> : <iframe className={`${styles.videopreviewiframe}`}
                                    src={`https://www.youtube.com/embed/${videolink}`}>
                                    </iframe>
                                      }
                              </div>
                            </div>

                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    onClick={submitrequest}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save changes
                  </button>
                </div>
          </div>
          <Footer />
      </div>
  )
}

export default my_profile
