/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { newtutoraccount } from '../Templates/tutor';
import Popup from './Popup';
import Pagination from '@mui/material/Pagination'
import { useState } from 'react';
import Notification from './Notification';
  
  export default function Tutortable({tutors, gettutors}) {
    const {sever} = useSelector((state) => state);
    const [open, setOpen] = useState(true)
    const [pageNumber, setpageNumber] = useState(1)
    const [productperpage, setproductperpage] = useState(3)
    let pagesVited = (pageNumber - 1) * productperpage

    const handleChange = (event, value) => {
      setpageNumber(value)
    };
    

    return (
      <div className="flex flex-col">
        {/* <Popup text={`please confirm that you want to delete this tutor profile`}  /> */}
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
               
                <tbody className="bg-white divide-y divide-gray-200">
                  {tutors?.slice(pagesVited, pagesVited + 3)?.map((tutor, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={tutor.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{tutor.firstname} {'  '} {tutor.lastname}</div>
                            <div className="text-sm text-gray-500">{tutor.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tutor?.timezone?.offset} {'   '} {tutor?.timezone?.name}</div>
                        <div className="text-sm text-gray-500">{tutor?.description?.substring(0, 45)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tutor.lessons.length} lessons</div>
                        <div className="text-sm text-gray-500">{tutor.students.length} students</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800">
                          {tutor.country}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/ahola_tutor?id=${tutor._id}`} className="text-indigo-600 hover:text-indigo-900">
                          view
                        </Link>
                      </td>
                      { 
                        !tutor?.hidden? <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 pointer inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800"
                        onClick={async(e) => {
                          const {_id, hidden} = tutor
                          try {
                            await axios.post(`${sever}/api/users/tutor/update`, {_id, hidden: true})
                            gettutors()
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
                        }}
                        >
                          HIDE
                        </span>
                      </td> : <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 pointer inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-green-800"
                        onClick={async(e) => {
                          try {
                            tutor.hidden = false
                            await axios.post(`${sever}/api/users/tutor/update`, tutor)
                            Notification({
                              title:"SUCCESS",
                              message:`tutor profile is now live`,
                              type:"success",
                              container:"top-right",
                              insert:"top",
                              animationIn:"fadeInUp",
                              animationOut:"fadeOut",
                              duration:10000
                            })
                            gettutors()
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
                        }}
                        >
                          UNHIDE
                        </span>
                      </td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='flex justify-center align-center margin-top'>
             <Pagination count={Math.ceil(tutors?.length / 3)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary" />
          </div>
      </div>
    )
  }
  