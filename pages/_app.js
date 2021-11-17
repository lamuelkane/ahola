import '../styles/globals.css'
import Globalcontextwrapper from '../context/Globalcontextwrapper'
import {useEffect, useContext} from 'react'


function MyApp({ Component, pageProps }) {


  useEffect(() => {
  }, [])

  return (
  <Globalcontextwrapper>
    <Component {...pageProps} />
  </Globalcontextwrapper>
  )
}

export default MyApp
