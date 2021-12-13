import {useState, useContext, useEffect} from 'react'
import GlobalContext from '../context/Globalcontext'
import CalenderHeader from '../components/CalenderHeader'
import Sidebar from '../components/Sidebar'
import Month from '../components/Month'
import {getMonth} from '../components/utils'
import DashBoardHeader from '../components/DashBoardHeader'
import { useSelector, useDispatch } from 'react-redux';
import Eventmodal from "../components/Eventmodal";
import Dashboardsubheader from '../components/Dashboardsubheader'



const Calender = () => {

    const [currentmonth, setcurrentmonth] = useState(getMonth())

    const dispatch = useDispatch()
    const {monthindex} = useSelector((state) => state);

    useEffect(() => {
      setcurrentmonth(getMonth(monthindex))
    }, [monthindex])

  return (
    <>
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
    </>
  )
}

export default Calender
