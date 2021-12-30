import '../styles/globals.css'
import {Wrapper} from '../context/Globalcontextwrapper'
import {useEffect, useContext} from 'react'
import 'react-notifications-component/dist/theme.css'
// import 'aos-animations/dist/animations.min.css';
// import 'aos-animations/dist/animations.min.js';
import 'swiper/css';



function MyApp({ Component, pageProps }) {


  useEffect(() => {
  }, [])

  return (
    <Component {...pageProps} />
  )
}

export default Wrapper.withRedux(MyApp)
