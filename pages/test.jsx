import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useSelector, useDispatch} from 'react-redux';
import DashBoardHeader from '../components/DashBoardHeader'

const test = () => {
    const {user, sever} = useSelector((state) => state);
    const [lesson, setlesson] = useState('Mon Dec 13 2021 0000 GMT+14:00 (Pacific/Kiritimati)')

const getaccuratehours2 = (lesson) => {
        if(lesson?.toString()?.length == 1) {
          return '0' + lesson
        }

        return lesson
}

    const getlessonstring = () => {
        const leson =  user?.lessons[user?.lessons.length - 1]
        const day = dayjs(leson?.day?.day).format('ddd')
        const month = dayjs(leson?.day?.day).format('MMM')
        const date = dayjs(leson?.day?.day).format('DD')
        const year = dayjs(leson?.day?.day).format('YYYY')
        const time = getaccuratehours2(leson?.day?.hour)

        setlesson(day + " " + month + ' ' + date + ' ' + year + ' ' + time + ':30' +  '  ' + leson?.timezone?.offset + ' ' + "(" + leson?.timezone?.name + ')' )
    }

    useEffect(() => {
        getlessonstring()
    }, [user])

    return (
        <div>
            <DashBoardHeader />
            <div>{lesson}</div>
            {
                lesson && <div>{new Date(lesson).toLocaleString()}</div>
            }
        </div>
    )
}

export default test
