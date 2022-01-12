import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import timezones from 'timezones-list';
import axios from 'axios'


const Test = () => {
    const {user, sever, socket, sever3} = useSelector((state) => state);
    // const [videourl, setvideourl] = useState()



    const getuservideo = async() => {

    }

    useEffect(() => {

    }, [])

    return (
        <>
            <video src={`${sever3}/file/7182a4c5d70593547b5491b3940f3490`} controls id='Video'></video>
        </>
    )
}

export default Test
