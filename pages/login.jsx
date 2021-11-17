
import { LockClosedIcon } from '@heroicons/react/solid'
import Header2 from '../components/Header2'
import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import GlobalContext from '../context/Globalcontext'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Redirect from '../components/redirect'


export default function Example() {
 const [email, setemail ] = useState('')
 const [pass, setpass] = useState('')
 const [tutor, settutor] = useState(true)

 const router = useRouter()

 const {sever, user} = useContext(GlobalContext)

 useEffect(() => {
  if(user){
    router.push('/messages')
  }
 }, [user])

  return (
    <>
      <Header2 />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your {tutor? 'tutor' : 'student'} account  <small> Or{' '} <span onClick={e => settutor(!tutor)} className="font-medium pointer text-indigo-600 hover:text-indigo-500">
                sign in as a {tutor ? 'student' : 'tutor'}
              </span></small> </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              do not have an account? {' '}
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                <Link href={tutor? '/tutor_signup' : 'student_signup'}  > register </Link>
              </span>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST"   onSubmit={async(e) => {
                e.preventDefault()
                if (!email || !password) {
                  alert('input full credential')
                  return
                }
                const info ={
                  email,
                  password: pass
                }
                 try {
                   
                  const {data} = await axios.post(`${sever}/api/users/${tutor? 'teacher' : 'student'}/signin`, info)
                  localStorage.setItem('user', JSON.stringify(data))
                  router.push('/messages')
                 } catch (error) {
                   alert(error)
                 }
              }}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                value={email}
                onChange={e => setemail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                value={pass}
                onChange={e => setpass(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
             
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <Redirect item={user} page={'/messages'} />
    </>
  )
}
