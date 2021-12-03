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
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


export const Studentschedule = (student, day, age, setAge, tutor, settutor, sever, weeks) => {

    const {timezone, firstname: name, _id : id} = student
    const handleChange = (event) => {
        setAge(event.target.value);
      };

    const lesson = {
        id: uuidv4(),
        student: {
            id,
            name,
        },
        tutor: tutor,
        day: day,
        timezone
    }

    


  return day?.exist ? ( <form className={`bg-white rounded-lg shadow-2xl w-1/4`}>
    <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
        <span className={`text-gray-400`}>lesson</span>
        <button className={` text-gray-400`}  onClick={e => {
            e.preventDefault()
           
           
            }}><CloseIcon /> </button>
    </header>
    <div className={`p-3`}>
           {/* <Selectstudent2 people={student.tutors} tutor={tutor} settutor={settutor} /> */}

            <select name="" id="" className={`w-80 margin-auto`} onChange={e => {
                const {target : {value}} = e
                settutor(value)
            }}>
                {
                    student?.tutors.map((tut) => (
                        <option value={tut.id} key={tut.id}>{tut.name}</option>
                    ))
                }
            </select>

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
        <button onClick={async(e) => 
            {e.preventDefault()
            try{
                const {data} = await axios.get(`${sever}/api/users/tutor/${tutor}`)
                settutor({
                    id: data._id,
                    name: data.firstname
                })
                student.lessons.push(lesson)
                data.lessons.push(lesson)
                const {data: res} = await axios.post(`${sever}/api/users/student/update`, student)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, data)
                alert('everything went fine')
            } catch(err) {
              alert(err)
            }
            
            localStorage.setItem('lesson', JSON.stringify(lesson))
            localStorage.setItem('user', JSON.stringify(student))
        }
        } className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
            Schedule Lesson
        </button>
        {/* <button className="rounded px-3 mt-3 bg-red-500 hover:bg-red-200 w-full py-2 border-red-100">
            Cancel Lesson
        </button> */}
    </div>
</form>) : ( <form className={`bg-white rounded-lg shadow-2xl w-1/4`}>
    <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
        <span className={`text-gray-400`}>lesson</span>
        <button className={` text-gray-400`}  onClick={e => {
            e.preventDefault()
           
           
            }}><CloseIcon /> </button>
    </header>
    <div className={`p-3`}>
           {/* <Selectstudent2 people={student.tutors} tutor={tutor} settutor={settutor} /> */}

            <select name="" id="" className={`w-80 margin-auto`} onChange={e => {
                const {target : {value}} = e
                settutor(value)
            }}>
                {
                    student?.tutors.map((tut) => (
                        <option value={tut.id} key={tut.id}>{tut.name}</option>
                    ))
                }
            </select>

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
        <select name="" id="" onChange={e => {
                day.day = e.target.value
                localStorage.setItem('sample' , JSON.stringify(e.target.value))
            }}>
                {weeks.map(d => (
                    <option value={d}>{dayjs(d).format('dd')}-{dayjs(d).format('DD')}</option>
                ))}
            </select>
            <select name="" id="" onChange={e => {
                    day.hour = e.target.value
                    localStorage.setItem('hour' , JSON.stringify(e.target.value))
            }}>
                {Array.from(Array(24), (_, i) => i.toString().length > 1 ?  i + ':00' : '0' + i + ':00' ).map((h, dex )=> (
                    <option value={dex}>{h}</option>
                ))}
            </select>

        </div>
        <button onClick={async(e) => 
            {e.preventDefault()
            try{
                const {data} = await axios.get(`${sever}/api/users/tutor/${tutor}`)
                student.lessons.find(les => les.id == exist).day = day
                data.lessons.find(les => les.id == exist).day = day

                const {data: res} = await axios.post(`${sever}/api/users/student/update`, student)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, data)
                alert('everything went fine')
            } catch(err) {
              alert(err)
            }
            
            localStorage.setItem('lesson', JSON.stringify(lesson))
            localStorage.setItem('user', JSON.stringify(student))
        }
        } className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
            Reschedule Lesson
        </button>
        <button onClick={async(e) => 
            {
            e.preventDefault()
            try{
                const {data} = await axios.get(`${sever}/api/users/student/${student}`)
               student.lessons = student.lessons.filter(les => les.id !== day.exist)
               data.lesson = data.lessons.filter(les => les.id !== day.exist)
                const {data: res} = await axios.post(`${sever}/api/users/student/update`, data)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, tutor)
                alert('everything went fine')
            } catch(err) {
              alert(err)
            }
            
            localStorage.setItem('lesson', JSON.stringify(lesson))
            localStorage.setItem('user', JSON.stringify(student))
        }
        }  className="rounded px-3 mt-3 bg-red-500 hover:bg-red-200 w-full py-2 border-red-100">
            Cancel Lesson
        </button>
    </div>
</form>)


}

export const Tutorschedule = (tutor, day, age, setAge, student, setstudent, sever, weeks) => {

    const {timezone, firstname: name, _id : id} = tutor
    const handleChange = (event) => {
        setAge(event.target.value);
      };

    const lesson = {
        id: uuidv4(),
        tutor: {
            id,
            name,
        },
        student,
        day: day,
        timezone
    }

    


  return !day?.exist ? ( <form className={`bg-white rounded-lg shadow-2xl w-1/4`}>
    <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
        <span className={`text-gray-400`}>lesson</span>
        <button className={` text-gray-400`}  onClick={e => {
            e.preventDefault()
           
           
            }}><CloseIcon /> </button>
    </header>
    <div className={`p-3`}>
           {/* <Selectstudent2 people={student.tutors} tutor={tutor} setstudent={setstudent} /> */}

            <select name="" id="" className={`w-80 margin-auto`} onChange={e => {
                const {target : {value}} = e
                setstudent(value)
            }}>
                {
                    tutor?.students.map((stu) => (
                        <option value={stu.id} key={stu.id}>{stu.name}</option>
                    ))
                }
            </select>

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
        <button onClick={async(e) => 
            {e.preventDefault()
            try{
                const {data} = await axios.get(`${sever}/api/users/student/${student}`)
                setstudent({
                    id: data._id,
                    name: data.firstname
                })
                tutor.lessons.push(lesson)
                data.lessons.push(lesson)
                const {data: res} = await axios.post(`${sever}/api/users/student/update`, data)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, tutor)
                alert('everything went fine')
            } catch(err) {
              alert(err)
            }
            
            localStorage.setItem('lesson', JSON.stringify(lesson))
            localStorage.setItem('user', JSON.stringify(student))
        }
        } className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
            Schedule Lesson
        </button>
        {/* <button className="rounded px-3 mt-3 bg-red-500 hover:bg-red-200 w-full py-2 border-red-100">
            Cancel Lesson
        </button> */}
    </div>
</form>) : ( <form className={`bg-white rounded-lg shadow-2xl w-1/4`}>
    <header className={`bg-gray-50 px-4 py-2 flex justify-between items-center`}>
        <span className={`text-gray-400`}>lesson</span>
        <button className={` text-gray-400`}  onClick={e => {
            e.preventDefault()
           
           
            }}><CloseIcon /> </button>
    </header>
    <div className={`p-3`}>
           {/* <Selectstudent2 people={student.tutors} tutor={tutor} setstudent={setstudent} /> */}

            <select name="" id="" className={`w-80 margin-auto`} onChange={e => {
                const {target : {value}} = e
                setstudent(value)
            }}>
                {
                    tutor?.students.map((stu) => (
                        <option value={stu.id} key={stu.id}>{stu.name}</option>
                    ))
                }
            </select>

        <div className={`my-3`}>
        {/* <FormControl component="fieldset">
            <FormLabel component="legend">Lesson Type</FormLabel>
            <RadioGroup row aria-label="Lesson Type" name="row-radio-buttons-group">
                <FormControlLabel value="single" control={<Radio />} label="Single" />
                <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
            </RadioGroup>
            </FormControl> */}
        </div>
        <div className="bg-blue-50 items-center flex justify-between p-3">
        <select name="" id="" onChange={e => {
                day.day = e.target.value
                localStorage.setItem('sample' , JSON.stringify(e.target.value))
            }}>
                {weeks.map(d => (
                    <option value={d}>{dayjs(d).format('dd')}-{dayjs(d).format('DD')}</option>
                ))}
            </select>
            <select name="" id="" onChange={e => {
                    day.hour = e.target.value
                    localStorage.setItem('hour' , JSON.stringify(e.target.value))
            }}>
                {Array.from(Array(24), (_, i) => i.toString().length > 1 ?  i + ':00' : '0' + i + ':00' ).map((h, dex )=> (
                    <option value={dex}>{h}</option>
                ))}
            </select>
        </div>
        <button onClick={async(e) => 
            {e.preventDefault()
            try{
                const {data} = await axios.get(`${sever}/api/users/student/${student}`)
                
                tutor.lessons.find(les => les.id == exist).day = day
                data.lessons.find(les => les.id == exist).day = day
                const {data: res} = await axios.post(`${sever}/api/users/student/update`, data)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, tutor)
                alert('everything went fine')
            } catch(err) {
              alert(err)
            }
            
            localStorage.setItem('lesson', JSON.stringify(lesson))
            localStorage.setItem('user', JSON.stringify(student))
        }
        } className="rounded px-3 mt-3 bg-blue-500 hover:bg-blue-200 w-full py-2 border-blue-100">
            Reschedule Lesson
        </button>
        <button onClick={async(e) => 
            {e.preventDefault()
            try{
                const {data} = await axios.get(`${sever}/api/users/student/${student}`)
               tutor.lessons = tutor.lessons.filter(les => les.id !== day.exist)
               data.lesson = data.lessons.filter(les => les.id !== day.exist)
                const {data: res} = await axios.post(`${sever}/api/users/student/update`, data)
                const {data: dat} = await axios.post(`${sever}/api/users/tutor/update`, tutor)
                alert('everything went fine')
            } catch(err) {
              alert(err)
            }
            
            localStorage.setItem('lesson', JSON.stringify(lesson))
            localStorage.setItem('user', JSON.stringify(student))
        }
        }  className="rounded px-3 mt-3 bg-red-500 hover:bg-red-200 w-full py-2 border-red-100">
            Cancel Lesson
        </button>
    </div>
</form>) 


}


const Eventmodal = () => {
    const {setshoweventmodal, showeventmodal, monthindex, weekindex, setweekindex, user, eventday, sever} = useContext(GlobalContext)
    const [month, setmonth] = useState(getMonth())
    const [weeks, setweeks] = useState([])
    const [age, setAge] = useState('');
    const [tutor, settutor] = useState(null)


    const handleChange = (event) => {
      setAge(event.target.value);
    };

    useEffect(() => {
        localStorage.setItem('day', JSON.stringify(eventday))
        getweeks(weekindex)
    }, [eventday])


      let getweeks = (index) => {
          let weeks = []
        return  month.find((week, idx)=> {
           if(index == idx){
            // weeks.concat(month[idx].concat(month[idx + 1]).concat(month[idx + 2])).filter(day => new Date(day.toISOString()).getTime() > new Date().getTime())
               localStorage.setItem('weeks',  JSON.stringify(weeks.concat(month[idx].concat(month[idx + 1]).concat(month[idx + 2]))))
               const neweek = JSON.parse(localStorage.getItem('weeks')).filter(day => new Date(day).getTime() > new Date().getTime())
               localStorage.setItem('weeks', JSON.stringify(neweek))
               setweeks(neweek)
               return weeks.concat(month[idx + 1].concat(month[idx + 2]))
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

            {
            
            user?.type === 'student' ? Studentschedule(user, eventday, age, setAge, tutor, settutor, sever, weeks)
            
            : Tutorschedule(user, eventday, age, setAge, tutor, settutor, sever, weeks)

            }
        </div> }
        </>
    )
}

export default Eventmodal
