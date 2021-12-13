import '../styles/globals.css'
import Globalcontextwrapper , {Wrapper} from '../context/Globalcontextwrapper'
import {useEffect, useContext} from 'react'


function MyApp({ Component, pageProps }) {


  useEffect(() => {
  }, [])

  return (
    <Component {...pageProps} />
  )
}

export default Wrapper.withRedux(MyApp)
