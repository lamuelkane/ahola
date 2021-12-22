import dayjs from 'dayjs';
import day from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'


export function getMonth(month = dayjs().month()) {
    const year = dayjs().year()
    const firstdayofmonth = dayjs(new Date(year, month, 1)).day()
    let currentMonthCount = 0 ;
    let currenthourcount = -1
    const dayMatrix = new Array(24).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currenthourcount++    
            currentMonthCount++
            return dayjs(new Date(year, month - 1, currentMonthCount))
        })
    })
 
    return dayMatrix

    
}

export const getlessonintimezone = (lesson) => {
   
    dayjs.extend(utc)
    dayjs.extend(timezone)

    
    // const day = dayjs(new Date(lesson.day.year, lesson.day.month , lesson.day.date)).format('ddd')
    const month = dayjs(new Date(lesson.day.year, lesson.day.month , lesson.day.date)).format('MMM')
    const date = dayjs(new Date(lesson.day.year, lesson.day.month , lesson.day.date)).format('DD')
    const year = dayjs(new Date(lesson.day.year, lesson.day.month , lesson.day.date)).format('YYYY')
    const time = getaccuratehours2(lesson?.day?.hour)
    const les = lesson.day.day + " " + month + ' ' + date + ' ' + year + '  ' + time + ':00' +  '  ' + lesson?.timezone?.offset + ' ' + "(" + lesson?.timezone?.name + ')'
    // console.log(dayjs('Wed Dec 22 2021 12:00  GMT+14:00 (Pacific/Kiritimati)').tz('Pacific/Kiritimati').toLocaleString())
    console.log(les)
    // console.log(dayjs(les).toLocaleString(), new Date(les).toLocaleString(), les)
    // console.log(dayjs("2013-11-18 11:55").tz("America/Toronto"))
    return new Date(les).toLocaleString()
    
}


export const getlessoninactualtime3 = (day, hour) => {
    const year = day.year()
    const month = day.month()
    const day1 = day.date()

    return new Date(year, month , day1, getaccuratehours2(hour)).toLocaleString()
}

export const getlessoninactualtime = (lesson) => {
    const year = parseInt(lesson.day.day.toISOString().slice(0, 4))
    const month = parseInt(lesson.day.day.toISOString().slice(5, 8)) - 1
    const day1 = parseInt(lesson.day.day.toISOString().slice(8, 10)) + 1
    
    return new Date(year, month , day1, parseInt(getaccuratehours2(lesson.day.hour))).toLocaleString()
}
export const getlessoninactualtime2 = (lesson) => {
    const year = parseInt(lesson.day.day.slice(0, 4))
    const month = parseInt(lesson.day.day.slice(5, 8)) - 1
    const day1 = parseInt(lesson.day.day.slice(8, 10)) 
    
    return new Date(year, month , day1, parseInt(getaccuratehours2(lesson.day.hour))).toLocaleString()
}
export const getaccuratehours2 = (lesson) => {
        if(lesson.toString().length == 1) {
          return '0' + lesson
        }

        return lesson
}
export const checklessonstate = (lesson) => {
    const date = new Date(getlessonintimezone(lesson)).getTime()
    if(date < new Date().getTime()){
        return true
    }
    return false
}