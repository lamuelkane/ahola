import dayjs from 'dayjs';
import day from 'dayjs'


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
    const year2 = parseInt(lesson?.day?.day?.slice(0, 4))
    const month2 = parseInt(lesson?.day?.day?.slice(5, 8)) - 1
    const day1 = parseInt(lesson?.day?.day?.slice(8, 10)) 
  
    const day = dayjs(new Date(year2, month2 , day1)).format('ddd')
    const month = dayjs(new Date(year2, month2 , day1)).format('MMM')
    const date = dayjs(new Date(year2, month2 , day1)).format('DD')
    const year = dayjs(new Date(year2, month2 , day1)).format('YYYY')
    const time = getaccuratehours2(lesson?.day?.hour)
    const les = day + " " + month + ' ' + date + ' ' + year + ' ' + time + ':00' +  '  ' + lesson?.timezone?.offset + ' ' + "(" + lesson?.timezone?.name + ')'
    //  console.log(new Date(les.toString()))
    return new Date(les).toLocaleString()
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
    const day1 = parseInt(lesson.day.day.slice(8, 10)) + 1
    
    return new Date(year, month , day1, parseInt(getaccuratehours2(lesson.day.hour))).toLocaleString()
}

export const getaccuratehours2 = (lesson) => {
        if(lesson.toString().length == 1) {
          return '0' + lesson
        }

        return lesson
}

export const checklessonstate = (lesson) => {
    const year = parseInt(lesson.day.day.slice(0, 4))
    const month = parseInt(lesson.day.day.slice(5, 8)) - 1
    const day1 = parseInt(lesson.day.day.slice(8, 10)) + 1

    if( new Date(year, month , day1, getaccuratehours2(lesson.day.hour)).getTime('en-us', {timeZone: lesson.timezone.name, }) < new Date().getTime()){
        return true
    }

    return false
}