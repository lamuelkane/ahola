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
        //    console.log(month)
            return dayjs(new Date(year, month - 1, currentMonthCount))
        })
    })
 
    // console.log(dayMatrix)

    return dayMatrix

    
}