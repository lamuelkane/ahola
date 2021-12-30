/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {useRouter} from 'next/router'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Languagedropdown() {

    const router = useRouter()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Options
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
         
                {/* {
                    router.locales.map((locale, i) =>  <span className={`text-gray-100 text-sm`} key={i}><Link href={router.asPath} locale={locale} >{locale}</Link></span>)
                } */}
                {
                    router.locales.map((locale, i) =>  
                    <div className="py-1" key={i} >
                    <div>
                         {/* <Link href={router.asPath} locale={locale} >{locale}</Link> */} heyy ffd
                    </div>
                  </div> 
                    
                    )
                }
        </div>
      </Transition>
    </Menu>
  )
}
