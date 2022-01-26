import React, {useContext} from 'react'
import { showeventmodalaction, hideeventmodal } from "../actions/Event";
import  GlobalContext  from "../context/Globalcontext";

const Createeventbutton = () => {
    const {setshoweventmodal, showeventmodal} = useContext(GlobalContext)


    return (
        <button onClick={e => setshoweventmodal(showeventmodalaction())} className={`p-2 border rounded-full flex items-center shadow-md hover:shadow-lg`}>
            <img src="./images/createevent.png" alt="" className={`w-7 h-7`} />
            <span className="pl-3 pr-7">Schedule lesson</span>
        </button>
    )
}

export default Createeventbutton
