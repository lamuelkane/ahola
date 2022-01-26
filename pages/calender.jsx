import {useState, useContext, useEffect} from 'react'
import GlobalContext from '../context/Globalcontext'
import CalenderHeader from '../components/CalenderHeader'
import Sidebar from '../components/Sidebar'
import Month from '../components/Month'
import {getMonth} from '../components/utils'
import DashBoardHeader from '../components/DashBoardHeader'
import { useSelector, useDispatch } from 'react-redux';
import Eventmodal from "../components/Eventmodal";
import Footer from '../components/Footer'
import Dashboardsubheader from '../components/Dashboardsubheader'
import Head from 'next/head'



const Calender = () => {
    const [currentmonth, setcurrentmonth] = useState(getMonth())
    const dispatch = useDispatch()
    const {monthindex} = useSelector((state) => state);

    useEffect(() => {
      setcurrentmonth(getMonth(monthindex))
    }, [monthindex])

  return (
    <>
            <Head>
                <title>User Calender</title>
                <meta name="description" content="View your events on ahola" />
                <link rel="icon" href="./images/logo1.png" />
                {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/25400134.js"></script> */}
            </Head>
    <Eventmodal />
            <div className="border">
                <DashBoardHeader />
            </div>
            <Dashboardsubheader />
      <div className="h-screen flex flex-col">
        <CalenderHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentmonth} />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Calender
