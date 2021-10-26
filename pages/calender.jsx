import {useState, useContext, useEffect} from 'react'
import GlobalContext from '../context/Globalcontext'
import CalenderHeader from '../components/CalenderHeader'
import Sidebar from '../components/Sidebar'
import Month from '../components/Month'
import {getMonth} from '../components/utils'
import Eventmodal from "../components/Eventmodal";



const Calender = () => {

    const [currentmonth, setcurrentmonth] = useState(getMonth())
    const {monthindex, setMonthindex} = useContext(GlobalContext)

    useEffect(() => {
      setcurrentmonth(getMonth(monthindex))
    }, [monthindex])

  return (
    <>
    <Eventmodal />
      <div className="h-screen flex flex-col">
        <CalenderHeader />
        <div className="flex flex-1">
          {/* <Sidebar /> */}
          <Month month={currentmonth} />
        </div>
      </div>
    </>
  )
}

export default Calender
