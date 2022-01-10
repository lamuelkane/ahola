import axios from 'axios'
import Notification from '../components/Notification';

export const setUser = (sever, user) => async(dispatch) => {
    if(user){
        localStorage.setItem('user', JSON.stringify(user))
        dispatch( {
            type:'SET_USER',
            payload: user
        })
    }
    let user2 = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null
    try{
        const {data} = await axios.get(`${sever}/api/users/${user2.type == 'student'? 'student' : 'tutor'}/${user2._id}`)
        localStorage.setItem('user', JSON.stringify(data))
        dispatch( {
            type:'SET_USER',
            payload: data
        })
    } catch(err){
       console.log(err)
    }
 }


 export const removeUser = () => {
        localStorage.removeItem('user')
        dispatch( {
            type:'REMOVE_USER',
            payload: null
        })
   
 }


 export const setcurrency = (Currency) => {
    return {
        type:'SET_CURRENCY',
        payload: Currency
    }
}

export const setcurrencies = (Currency) => {
    return {
        type:'SET_CURRENCIES',
        payload: Currency
    }
}


export const setCourses = (sever) => async(dispatch) => {
    try{
        const {data} = await axios.get(`${sever}/api/users/subjects`)
        dispatch( {
            type:'SET_COURSES',
            payload: data
        })
    } catch(err){
        Notification({
            title:"Error",
            message:`an error ocurred getting courses`,
            type:"danger",
            container:"top-right",
            insert:"top",
            animationIn:"fadeInUp",
            animationOut:"fadeOut",
            duration:10000
          })
    }
 }


 



