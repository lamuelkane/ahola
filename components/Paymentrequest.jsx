/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { tutoraccountsuccess } from '../Templates/tutor';
import Popup from './Popup';
import { useState, useRef } from 'react';
import Pagination from '@mui/material/Pagination'
import Notification from './Notification';
import Confirmpaymentmodal from './Confirmpaymentmodal';
  
  export default function Paymentrequest({tutors, gettutors}) {
    const {sever} = useSelector((state) => state);
    const [open, setOpen] = useState(false)
    const [file, setfile] = useState(null)
    const payment = useRef({})
    const [pageNumber, setpageNumber] = useState(1)
    const [productperpage, setproductperpage] = useState(5)
    let pagesVited = (pageNumber - 1) * productperpage

    const handleChange = (event, value) => {
      setpageNumber(value)
    };

    return (
      <div className="flex flex-col">
          <Confirmpaymentmodal open={open} setOpen={setOpen} file={file} payment={payment.current} />
        {/* <Popup text={`please confirm that you want to delete this tutor profile`}  /> */}
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {tutors?.slice(pagesVited, pagesVited + 5)?.map((tutor, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={tutor.user.method === 'paypal'? './images/paypal.png' : './images/payoneer.png'} alt="" />
                          </div>
                        <div className="ml-4">
                          <div className="text-sm text-gray-900">{tutor.user.method} {'  '} email</div>
                            <div className={`text-sm ${tutor.user.method === 'paypal' ? 'text-indigo-500' : 'text-yellow-500'}`}>{tutor?.email}</div>
                        </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Payment method</div>
                        <div className={`text-sm ${tutor.user.method === 'paypal' ? 'text-indigo-500' : 'text-yellow-500'}`}>{tutor?.user.method}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Payment Amount</div>
                            <div className={`text-sm ${tutor.user.method === 'paypal' ? 'text-indigo-500' : 'text-yellow-500'}`}>{tutor.amt.toFixed(2)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">User name</div>
                        <div className={`text-sm ${tutor.user.method === 'paypal' ? 'text-indigo-500' : 'text-yellow-500'}`}>{tutor?.user.firstname}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">User email</div>
                        <div className={`text-sm ${tutor.user.method === 'paypal' ? 'text-indigo-500' : 'text-yellow-500'}`}>{tutor?.user.email2}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">status</div>
                        <div className="text-sm text-gray-500">{tutor?.paid ? 'paid' : 'pending...'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {tutor.user.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                          <input type="file" className={'hide'} onInput={e => {
                              setfile(e.target.files[0])
                              setOpen(true)
                          }} accept='image/*' id='screenshot' />
                            {tutor.paid ? <span onClick={e => {
                                setOpen(true)
                                payment.current = tutor
                                setfile(tutor.user.image)
                            }} className="px-2 pointer inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                view
                            </span> : <label onClick={e => payment.current = tutor} className="px-2 pointer inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" htmlFor="screenshot">
                                confirm
                            </label>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='flex justify-center align-center margin-top'>
             <Pagination count={Math.ceil(tutors.length / 5)} page={pageNumber} onChange={handleChange} siblingCount={0} color="primary" />
          </div>
      </div>
    )
  }
  