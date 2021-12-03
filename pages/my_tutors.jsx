import React, {useEffect, useContext, useState} from 'react'
import DashBoardHeader from '../components/DashBoardHeader'
import GlobalContext from '../context/Globalcontext'
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router'
import styles from '../styles/Studentdashboard.module.css'
import Link from 'next/link'

const Mytutor = () => {

    const {user} = useContext(GlobalContext)
    const [tutor, settutor] = useState(null)
    const router = useRouter()
  
    useEffect(() => {
        if(user){
          if(user?.type !== 'student') {
            router.push('/login')
          }
        }
    }, [user])

    const people = [
        {
          name: 'Jane Cooper',
          title: 'Regional Paradigm Technician',
          department: 'Optimization',
          role: 'Admin',
          email: 'jane.cooper@example.com',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        },
        {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'jane.cooper@example.com',
            image:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
          },
          {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'jane.cooper@example.com',
            image:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
          },
          {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'jane.cooper@example.com',
            image:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
          },
          {
            name: 'Jane Cooper',
            title: 'Regional Paradigm Technician',
            department: 'Optimization',
            role: 'Admin',
            email: 'jane.cooper@example.com',
            image:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
          },
      ]


    return (
        <div>
            <div className="border">
                <DashBoardHeader />
            </div>
            <div className={`${styles.mytutorswrapper}`}>
              {
                user?.tutors.map(tut => (
                  <div className={`flex justify-between align-center border p-3`} key={tut.id}>
                        <div className={`flex align-center`}>
                            <div className={`margin-right`}>  <Avatar sx={{ bgcolor: deepPurple[500] }}>N</Avatar></div>
                            <div className={`margin-right`}>{tut.name}</div>
                            <div className={`margin-right`}>${tut.rate} /hr</div>
                        </div>
                        <div className={`margin-right`}>{tut.hours} hours left</div>
                        <div className={`flex`}>
                            <div className={`margin-right`}>
                              <Link href={`messages?convid=${tut.id + user._id}&&name=${tut.name}&&rcrid=${tut.id}`} >message </Link>
                            </div>
                            <div className={`margin-right pointer`} onClick={e => settutor(tut.id)} >lessons</div>
                        </div>
                  </div>
                ))
              }
            </div>
        </div>
    )
}

export default Mytutor
