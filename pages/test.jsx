import React, { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
// import { format, compareAsc } from 'date-fns'
import { format, utcToZonedTime } from 'date-fns-tz'
import timezones from 'timezones-list';
import axios from 'axios'


const Test = () => {
    const {user, sever, socket, sever3} = useSelector((state) => state);
    // const [videourl, setvideourl] = useState()

    useEffect(() => {
    //   dayjs.extend(utc)
    //   dayjs.extend(timezone)
    //   dayjs.tz.setDefault("Etc/GMT-12")

    //   // The same behavior with dayjs.tz("2014-06-01 12:00", "America/New_York")
    //   // dayjs.tz("2014-06-01 12:00")
    //  const date =  dayjs.tz("2022-1-7")
    //   // console.log(date, dayjs.tz("2022-1-7", "Asia/Tokyo"))
          const date = new Date('2022-01-25T10:46:20Z')

      const nyDate = utcToZonedTime(date, 'America/New_York')
      const parisDate = utcToZonedTime(date, 'America/Dawson_Creek')

      format(nyDate, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone: 'America/New_York' }) // 2014-10-25 06:46:20-04:00
      format(nyDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'America/New_York' }) // 2014-10-25 06:46:20 EST
      format(parisDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Europe/Paris' }) // 2014-10-25 10:46:20 GMT+2


      console.log(
        timezones
        )
      // console.log(format(new Date(), 'MM/dd/yyyy'))
    }, [])


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
