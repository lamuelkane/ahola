/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { useState } from 'react';
import Pagination from '@mui/material/Pagination'
import Notification from './Notification';
  
  export default function Studenttable({tutors, gettutors}) {
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
                        {/* <div className="text-sm text-gray-500">{tutor?.description?.substring(0, 45)}...</div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800">
                          {tutor.country}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.subject}</td> 
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {tutor.tutors.length} tutors
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tutor.subject}</td> 
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {tutor.lessons.length} lessons
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* <span className="px-2 pointer inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800"
                        onClick={async(e) => {
                          Notification({
                            title:"THIS IS TO BE DONE",
                            message:`I will add this functionality in the future`,
                            type:"info",
                            container:"top-right",
                            insert:"top",
                            animationIn:"fadeInUp",
                            animationOut:"fadeOut",
                            duration:10000
                          })
                        //   try {
                        //     await axios.get(`${sever}/api/users/registeredtutor/delete/${tutor._id}`)
                        //     gettutors()
                        //   } catch (error) {
                        //   }
                        }}
                        >
                         HIDE
                        </span> */}
                      </td>
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
  