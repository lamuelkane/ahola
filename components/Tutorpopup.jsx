import { PayPalButton } from "react-paypal-button-v2";
import { Fragment, useState, useEffect } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {paypalclient} from './keys'
import {boughthours} from '../Templates/tutor'
import Notification from "./Notification";
import {useRouter} from 'next/router'


let packages = [
  { name: 'Trial', inStock: true, value:1 },
  { name: '6hrs', inStock: true,  value:6  },
  { name: '8hrs', inStock: true,  value:8  },
  { name: '10hrs', inStock: true,  value:10  },
  { name: '12hrs', inStock: true,  value:12  },
  { name: '16hrs', inStock: true,  value:16  },
  { name: '18hrs', inStock: true,  value:18  },
  { name: '20hrs', inStock: true ,  value:20 },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tutorpopup({open, setOpen, teacher}) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState(packages[2])
  const [paypalready, setpaypalready] = useState()
  const {sever, user: student,  Currency, Currencies} = useSelector((state) => state);

  packages =  router.locale  === 'en-US' ? [
    { name: 'Trial', inStock: true, value:1 },
    { name: '6hrs', inStock: true,  value:6  },
    { name: '8hrs', inStock: true,  value:8  },
    { name: '10hrs', inStock: true,  value:10  },
    { name: '12hrs', inStock: true,  value:12  },
    { name: '16hrs', inStock: true,  value:16  },
    { name: '18hrs', inStock: true,  value:18  },
    { name: '20hrs', inStock: true ,  value:20 },
  ]

  : router.locale === 'fr' ? [
    { name: 'Procès', inStock: true, value:1 },
    { name: '6heures', inStock: true,  value:6  },
    { name: '8heures', inStock: true,  value:8  },
    { name: '10heures', inStock: true,  value:10  },
    { name: '12heures', inStock: true,  value:12  },
    { name: '16heures', inStock: true,  value:16  },
    { name: '18heures', inStock: true,  value:18  },
    { name: '20heures', inStock: true ,  value:20 },
  ]
  
  : router.locale === 'de' ?
  [
    { name: 'Versuch', inStock: true, value:1 },
    { name: '6Std', inStock: true,  value:6  },
    { name: '8Std', inStock: true,  value:8  },
    { name: '10Std', inStock: true,  value:10  },
    { name: '12Std', inStock: true,  value:12  },
    { name: '16Std', inStock: true,  value:16  },
    { name: '18Std', inStock: true,  value:18  },
    { name: '20Std', inStock: true ,  value:20 },
  ]
  : router.locale === 'es' ?
  [
    { name: 'Juicio', inStock: true, value:1 },
    { name: '6horas', inStock: true,  value:6  },
    { name: '8horas', inStock: true,  value:8  },
    { name: '10horas', inStock: true,  value:10  },
    { name: '12horas', inStock: true,  value:12  },
    { name: '16horas', inStock: true,  value:16  },
    { name: '18horas', inStock: true,  value:18  },
    { name: '20horas', inStock: true ,  value:20 },
  ]
  : router.locale === 'zh' ?
  [
    { name: '审判', inStock: true, value:1 },
    { name: '6小时', inStock: true,  value:6  },
    { name: '8小时', inStock: true,  value:8  },
    { name: '10小时', inStock: true,  value:10  },
    { name: '12小时', inStock: true,  value:12  },
    { name: '16小时', inStock: true,  value:16  },
    { name: '18小时', inStock: true,  value:18  },
    { name: '20小时', inStock: true ,  value:20 },
  ]
  : [
    { name: 'Trial', inStock: true, value:1 },
    { name: '6hrs', inStock: true,  value:6  },
    { name: '8hrs', inStock: true,  value:8  },
    { name: '10hrs', inStock: true,  value:10  },
    { name: '12hrs', inStock: true,  value:12  },
    { name: '16hrs', inStock: true,  value:16  },
    { name: '18hrs', inStock: true,  value:18  },
    { name: '20hrs', inStock: true ,  value:20 },
  ]


  const addpaypalscript = () => {
   let script = document.createElement('script')
   script.type = 'text/javascript'
   script.src = `https://www.paypal.com/sdk/js?client-id=${paypalclient}`
   script.async = true
   script.onload = () => {
    setpaypalready(true)
   }

   document.body.appendChild(script)
  }

    useEffect(() => {
      if(!window.paypal){
        addpaypalscript()
      } else {
        setpaypalready(true)
      }
      console.log(teacher)
      
    }, [paypalready])


    const savehoursbought = async(e) => {
      // e.preventDefault()
      const {_id: id, rate, firstname: name, timezone} = teacher
      const tutor = student.tutors.find(tut => tut.id === teacher._id)
      const stu = teacher.students.find(stu => stu.id === student._id)
      
      if(tutor || stu){
          tutor.hours += selectedSize.value 
          stu.hours += selectedSize.value
          if(student?.currentearning > 0){
            if((selectedSize.value * tutor.rate) > student?.currentearning) {
                student.currentearning = 0
            }
            else{
              student.currentearning = student.currentearning - (selectedSize.value * tutor.rate) 
            }
          }
          try{
            const {data} = await axios.post(`${sever}/api/users/student/update`, student)
            const {data: res} = await axios.post(`${sever}/api/users/tutor/update`, teacher)
            const sample = await axios.post(`${sever}/api/users/tutor/hoursbought`, {
              template: boughthours(teacher.firstname, student.firstname, selectedSize.value),
              email: teacher.email
            })
            Notification({
              title:"Hours Bought",
              message:`successfully bought additional ${selectedSize.value} with tutor ${name}`,
              type:"success",
              container:"top-right",
              insert:"top",
              animationIn:"fadeInUp",
              animationOut:"fadeOut",
              duration:10000
            })
        localStorage.setItem('user', JSON.stringify(student))

          } catch(error) {
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
          localStorage.setItem('user', JSON.stringify(student))
          return
      }

      if(student?.currentearning > 0){
        if((selectedSize.value * teacher.rate) > student?.currentearning) {
            student.currentearning = 0
        }
        else{
          student.currentearning = student.currentearning - (selectedSize.value * teacher.rate) 
        }
      }

      student.tutors.push({
        id,
        rate,
        hours: selectedSize.value,
        name,
        timezone, 
      })

      teacher.students.push({
        id: student._id,
        rate,
        name: student.firstname,
        hours: selectedSize.value,
        timezone: student.timezone
      })


      try{
        const {data: res} = await axios.post(`${sever}/api/users/tutor/update`, teacher)
        const {data} = await axios.post(`${sever}/api/users/student/update`, student)
       const sample = await axios.post(`${sever}/api/users/tutor/hoursbought`, {
          template: boughthours(teacher.firstname, student.firstname, selectedSize.value),
          email: teacher.email
        })
        Notification({
          title:"Hours Bought",
          message:`successfully bought additional ${selectedSize.value} with tutor ${name}`,
          type:"success",
          container:"top-right",
          insert:"top",
          animationIn:"fadeInUp",
          animationOut:"fadeOut",
          duration:10000
        })

        localStorage.setItem('user', JSON.stringify(student))

      } catch(error) {
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
      localStorage.setItem('user', JSON.stringify(student))
    }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                  <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                    <img src={teacher.image} className="object-center object-cover" />
                  </div>
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">{teacher.firstname}</h2>

                    <section aria-labelledby="information-heading" className="mt-2">
                      <h3 id="information-heading" className="sr-only">
                        Product information
                   
                      </h3>

                      <p className="text-2xl text-gray-900">${teacher.rate}/hr</p>
                      <p className="text-2xl text-gray-900">
                      {  router.locale  === 'en-US' ? 'Ahola funds  '

: router.locale === 'fr' ? 'Fonds Ahola'

: router.locale === 'de' ?
                          'Ahola-Gelder'
: router.locale === 'es' ?
                          'Fondos Ahola'
: router.locale === 'zh' ?
                          '阿霍拉基金'
:  'Ahola funds  '
}

  {Currency === 'USD' ?  student?.currentearning  : (student?.currentearning * Currencies?.data[Currency] ).toFixed(2)} {Currency}</p> 

                      <div className="mt-6">
                        {/* <h4 className="sr-only">Reviews</h4> */}
                        <div className="flex items-center">
                        <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {selectedSize.value}      {  router.locale  === 'en-US' ? `hrs`

: router.locale === 'fr' ? `heures`

: router.locale === 'de' ?
                          `Std`
: router.locale === 'es' ?
                            `horas`
: router.locale === 'zh' ?
                          `个小时`
:  'hrs'
}
                          </a>
                          <a href="#" className="ml-3 font-medium">
                            X
                          </a>
                          <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            
                            {  router.locale  === 'en-US' ? `${Currency === 'USD' ?  teacher.rate  : (teacher.rate * Currencies?.data[Currency] ).toFixed(2)} ${Currency}  per hour `

: router.locale === 'fr' ? `${Currency === 'USD' ?  teacher.rate  : (teacher.rate * Currencies?.data[Currency] ).toFixed(2)} ${Currency}   par heure`

: router.locale === 'de' ?
                          `${Currency === 'USD' ?  teacher.rate  : (teacher.rate * Currencies?.data[Currency] ).toFixed(2)} ${Currency}  pro Stunde`
: router.locale === 'es' ?
                            `${Currency === 'USD' ?  teacher.rate  : (teacher.rate * Currencies?.data[Currency] ).toFixed(2)} ${Currency}  por hora`
: router.locale === 'zh' ?
                          `每小时 ${Currency === 'USD' ?  teacher.rate  : (teacher.rate * Currencies?.data[Currency] ).toFixed(2)} ${Currency}   个`
:  'per hour '
}
                            {  } 
                          </a>

                          <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            -
                          </a>
                          <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {Currency === 'USD' ?  student?.currentearning  : (student?.currentearning * Currencies?.data[Currency] ).toFixed(2)} {Currency} = 
                          </a>
                          <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            {Currency === 'USD' ?  ((selectedSize.value * teacher.rate) - student?.currentearning)  : (((selectedSize.value * teacher.rate) - student?.currentearning) * Currencies?.data[Currency] ).toFixed(2)} {Currency}
                          </a>
                        </div>
                      </div>
                    </section>

                    <section aria-labelledby="options-heading" className="mt-10">
                      <h3 id="options-heading" className="sr-only">
                        Product options
                      </h3>

                      <form>
                        <div className="mt-10">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm text-gray-900 font-medium">
                            {  router.locale  === 'en-US' ? `packages`

: router.locale === 'fr' ? `paquets`

: router.locale === 'de' ?
                          `Pakete`
: router.locale === 'es' ?
                            `paquetes`
: router.locale === 'zh' ?
                          `包裹`
:  'packages'
}
                            </h4>
                            {/* <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                              Package guide
                            </a> */}
                          </div>

                          <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                            <RadioGroup.Label className="sr-only">Choose a package</RadioGroup.Label>
                            <div className="grid grid-cols-4 gap-4">
                              {packages.map((size) => (
                                <RadioGroup.Option
                                  key={size.name}
                                  value={size}
                                  disabled={!size.inStock}
                                  className={({ active }) =>
                                    classNames(
                                      size.inStock
                                        ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                        : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                      active ? 'ring-2 ring-indigo-500' : '',
                                      'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                                      {size.inStock ? (
                                        <div
                                          className={classNames(
                                            active ? 'border' : 'border-2',
                                            checked ? 'border-indigo-500' : 'border-transparent',
                                            'absolute -inset-px rounded-md pointer-events-none'
                                          )}
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <div
                                          aria-hidden="true"
                                          className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                        >
                                          <svg
                                            className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            stroke="currentColor"
                                          >
                                            <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                          </svg>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="mt-4">
                           {(selectedSize.value * teacher.rate) > student?.currentearning ?  paypalready && <PayPalButton
                              amount={(selectedSize.value * teacher.rate) - student.currentearning} 
                              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                              // onSuccess={savehoursbought}
                              onSuccess={(details, data) => {
                                // alert("Transaction completed by " + details.payer.name.given_name);
                                savehoursbought()
                                // OPTIONAL: Call your server to save the transaction
                                // return savehoursbought()
                              }}
                            /> :
                             <button
                          type="submit"
                          onClick={savehoursbought}
                          className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          
                          {  router.locale  === 'en-US' ? `Buy hours with Ahola funds`

: router.locale === 'fr' ? `Acheter des heures avec des fonds Ahola`

: router.locale === 'de' ?
                          `Kaufen Sie Stunden mit Ahola-Geldern`
: router.locale === 'es' ?
                            `Compra horas con fondos Ahola`
: router.locale === 'zh' ?
                          `用 Ahola 基金购买时间`
:  'Buy hours with Ahola funds'
}
                        </button> }
                        </div>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
