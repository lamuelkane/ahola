import {useState, useContext, useEffect} from 'react'
import CalenderHeader from '../components/CalenderHeader'
import {getMonth} from '../components/utils'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import  GlobalContext  from "../context/Globalcontext";
import ScheduleIcon from '@mui/icons-material/Schedule';
import SegmentIcon from '@mui/icons-material/Segment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CachedIcon from '@mui/icons-material/Cached';
import Avatar from '@mui/material/Avatar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Listdropdown from './Listdropdown'
import Selectstudent2 from './Selectstudent2'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import dayjs from 'dayjs'
import {nextmonth, prevmonth, resetmonth, prevweek, nextweek, resetweek} from '../actions/month'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


const Studentschedule = (student, age, setAge, tutor, day) => {



    
    const handleChange = (event) => {
        setAge(event.target.value);
      };

    const lesson = {
        student: {
            id: student._id,
            name: student.firstname,
        },
        tutor,
        day,
    }


  return  <form className={`bg-white rounded-lg shadow-2xl w-1/4`}>
    <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
        <span className={`text-gray-400`}>lesson</span>
        <button className={` text-gray-400`}  onClick={e => {
            
            }}><CloseIcon /> </button>
    </header>
    <div className={`p-3`}>
           <Selectstudent2 people={student.tutors} />
        <div className={`my-3`}>
        <FormControl component="fieldset">
            <FormLabel component="legend">Lesson Type</FormLabel>
            <RadioGroup row aria-label="Lesson Type" name="row-radio-buttons-group">
                <FormControlLabel value="single" control={<Radio />} label="Single" />
                <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
            </RadioGroup>
            </FormControl>
        </div>
        <div className="bg-blue-50 items-center flex justify-between p-3">
            {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">from</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="Age"
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl> */}
        </div>
        <button onClick={e => console.log(lesson)} className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
            Schedule Lesson
        </button>
        {/* <button className="rounded px-3 mt-3 bg-red-500 hover:bg-red-200 w-full py-2 border-red-100">
            Cancel Lesson
        </button> */}
    </div>
</form>


}


const Eventmodal = () => {
    const {setshoweventmodal, showeventmodal, monthindex, weekindex, setweekindex, user, day} = useContext(GlobalContext)
    const [month, setmonth] = useState(getMonth())
    const [week, setweek] = useState([])
    const [age, setAge] = useState('');
    const [tutor, setutor] = useState([])


    const handleChange = (event) => {
      setAge(event.target.value);
    };

    useEffect(() => {
        setmonth(getMonth(monthindex))
      }, [monthindex])

      useEffect(() => {
        month.filter((week, idx)=> {
         if(week.find(da => da.format('DD-MM-YY') === dayjs().format('DD-MM-YY'))) {
             setweekindex(nextweek(idx))
         }
     })
     }, [])

     useEffect(() => {
        setweek(getweek(weekindex))
    }, [weekindex])

      let getweek = (index) => {
        return  month.find((week, idx)=> {
           if(index == idx){
               return week
          }
           })
     }


    return (
        <>
    { showeventmodal &&   <div className={`h-screen fixed bg-transparent w-full left-0 top-0 flex justify-center items-center`}>
            {/* <form className={`bg-white rounded-lg shadow-2xl w-1/4`}>
                <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
                    <span className={`text-gray-400`}>lesson</span>
                    <button className={` text-gray-400`}  onClick={e => setshoweventmodal(hideeventmodal())}><CloseIcon /> </button>
                </header>
                <div className={`p-3`}>
                    <div className="flex pointer justify-between p-2">
                        <div className="flex justify-between">
                    <span className={`text-gray-400 mx-2`}><PersonAddIcon /></span>
                    <span className={``} >Select Student</span> 

                        </div>
                        <div>
                    <span className={`text-gray-400 mx-2`}><ArrowForwardIosIcon /></span>

                        </div>
                    </div>
                    <div className={`my-3`}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Lesson Type</FormLabel>
                        <RadioGroup row aria-label="Lesson Type" name="row-radio-buttons-group">
                            <FormControlLabel value="single" control={<Radio />} label="Single" />
                            <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="bg-blue-50 items-center flex justify-between p-3">
                        <div className={`pointer text-blue-400	text-sm`}>October 21</div>
                        <div>
                            <span className={`pointer text-blue-400 text-sm	`}>10:00</span>
                            <span><ArrowRightAltIcon /></span>
                            <span className={`pointer text-blue-400	text-sm`}>11:00</span>
                        </div>
                    </div>
                    <button className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
                        Schedule Lesson
                    </button>
                </div>
            </form> */}
              {/* <form className={`bg-white rounded-lg shadow-2xl w-1/4`}>
                <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
                    <span className={`text-gray-400`}>lesson</span>
                    <button className={` text-gray-400`}  onClick={e => {
                        
                        }}><CloseIcon /> </button>
                </header>
                <div className={`p-3`}>
                       <Selectstudent />
                    <div className={`my-3`}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Lesson Type</FormLabel>
                        <RadioGroup row aria-label="Lesson Type" name="row-radio-buttons-group">
                            <FormControlLabel value="single" control={<Radio />} label="Single" />
                            <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="bg-blue-50 items-center flex justify-between p-3">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChange}
                            label="Age"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleChange}
                            label="Age"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>


                        <div className={`pointer text-blue-400	text-sm`}><Listdropdown 
                        array={Array.from(week, (wk, i) => (
                            {
                                name: wk.format('dd'),
                                avatar: wk.format('DD'),
                                id: i
                            }
                        ))} 
                        headline={dayjs(new Date(dayjs().year(), monthindex)).format('MMMM YYYY')}
                        week
                        />
                        </div>
                        <div>
                            <span className={`pointer text-blue-400 text-sm	`}><Listdropdown 
                            array={Array.from(Array(24), (_, i) => ({
                                name: i.toString().length > 1 ?  i + ':00' : '0' + i + ':00',
                                id: i,
                                avatar: ''
                            }) )}  
                            headline={`from`} /></span>
                             <div className={`flex justify-center mt-2 align-center`}><ArrowDownwardIcon  /></div>
                            <span className={`pointer text-blue-400	text-sm`}><Listdropdown 
                            array={Array.from(Array(24), (_, i) => i.toString().length > 1 ?  i + ':00' : '0' + i + ':00' )} 
                             headline={`to`} /></span>
                         </div> 


                    </div>
                    <button className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
                        Reschedule Lesson
                    </button>
                    <button className="rounded px-3 mt-3 bg-red-500 hover:bg-red-200 w-full py-2 border-red-100">
                        Cancel Lesson
                    </button>
                </div>
            </form> */}

            {Studentschedule(user, age, setAge, day)}
        </div> }
        </>
    )
}

export default Eventmodal
