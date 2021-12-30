/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react';
import styles from '../styles/Dashboard.module.css'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import {newtutoraccount} from '../Templates/tutor'
import Notification from './Notification';


export default function RegisteredTutor({tutor, hide}) {
    const {sever} = useSelector((state) => state);
    const [videolink, setvideolink] = useState()

    const {country,
      description,
      email,
      firstname,
      image,
      lastname,
      password,
      rate,
      subject,
      timezone,
      video,
      } = tutor
  
  function reverseString(str) {
    return str?.split("")?.reverse()?.join("");
}

const checkvideolink = (link) => {
  if (link?.includes('youtube.com')) {
      return true
  }
  return false
}


const getvideolink = () => {
  let str = reverseString(tutor?.video)
  let sub =  checkvideolink(tutor?.video) ? str.substring(0, str.indexOf("=")) : str?.substring(0, str.indexOf("/"))
  let typing = setTimeout(() => {
      setvideolink(reverseString(sub))
  }, 3000);
}

useEffect(() => {
    getvideolink()
}, [tutor])



  return (
    <div>
    <div className="bg-white w-90 margin-auto margin-top shadow overflow-hidden sm:rounded-lg">
<div className="px-4 py-5 sm:px-6">
    <div className="flex justify-between">
         <h3 className="text-lg leading-6 font-medium text-gray-900">Tutor Profile Information</h3>
         {
           !hide ? <div>
           <span className="px-2 pointer inline-flex text-xs margin-right leading-5 font-semibold rounded-full bg-green-100 text-green-800"
           onClick={async(e) => {
             try {
               await axios.post(`${sever}/api/users/tutor/save`,  
               { 
                 tutor : {country,
                   description,
                   email,
                   firstname,
                   image,
                   lastname,
                   password,
                   rate,
                   subject,
                   timezone,
                   video,
                   } ,
                   template: newtutoraccount(firstname)
               }
               )
                 await axios.get(`${sever}/api/users/registeredtutor/delete/${tutor._id}`)
               console.log(tutor)
               Notification({
                 title:"SUCCESS",
                 message:`everything went fine`,
                 type:"success",
                 container:"top-right",
                 insert:"top",
                 animationIn:"fadeInUp",
                 animationOut:"fadeOut",
                 duration:10000
               })
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
           }}
           >
             APPROVE
           </span>
           <span className="px-2 pointer inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800"
           onClick={async(e) => {
             try {
               await axios.get(`${sever}/api/users/registeredtutor/delete/${tutor._id}`)
               Notification({
                 title:"SUCCESS",
                 message:`everything went fine`,
                 type:"success",
                 container:"top-right",
                 insert:"top",
                 animationIn:"fadeInUp",
                 animationOut:"fadeOut",
                 duration:10000
               })
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
           }}
           >
             DELETE
           </span>
</div> : ''
         }
    </div>
</div>
<div className="border-t border-gray-200">
<dl>
  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">First name</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tutor?.firstname}</dd>
  </div>
  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Last name</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tutor?.lastname}</dd>
  </div>
  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Country</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tutor?.country}</dd>
  </div>
  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Subject taught</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tutor?.subject}</dd>
  </div>
  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Email address</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {tutor?.email} </dd>
  </div>
  
  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Rate per hour</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${tutor?.rate?.toFixed(2)}</dd>
  </div>
  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Timezone</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
    <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Time Zone
                </label>
                    <span>{tutor?.timezone?.offset}</span>
                    <span>-</span>
                    <span>{tutor?.timezone?.name}</span>
              </div>
    </dd>
  </div>
  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Description</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {tutor?.description}
    </dd>
  </div>
  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Profile Image</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      <label
        htmlFor="file-upload"
        className="relative margin-x cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
      >
          <img src={tutor.image} width='100px' height='100px' alt="" />
      </label>
    </dd>
  </div>
  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium text-gray-500">Profile Video</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
    <div className="grid grid-cols-3 gap-6">
            <div className="col-span-3 sm:col-span-2">
              <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                Intro video
              </label>
            </div>
          </div>

          <div>
            <div className={`${styles.videopreview}`}>
                    <iframe className={`${styles.videopreviewiframe}`}
                   src={`${ checkvideolink(tutor?.video)? `https://www.youtube.com/embed/${videolink}` : `https://player.vimeo.com/video/${videolink}`}`}>
                  </iframe>
            </div>
          </div>

    </dd>
  </div>
</dl>
</div>
</div>
</div>
  )
}
