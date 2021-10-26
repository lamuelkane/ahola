import '../styles/globals.css'
import Globalcontextwrapper from '../context/Globalcontextwrapper'

function MyApp({ Component, pageProps }) {
  return (
  <Globalcontextwrapper>
    <Component {...pageProps} />
  </Globalcontextwrapper>
  )
}

export default MyApp
