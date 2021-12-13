import axios from 'axios'

// export const setUser = (sever, user) => async(dispatch) => {
//     if(user){
//         localStorage.setItem('user', JSON.stringify(user))
//         dispatch( {
//             type:'SET_USER',
//             payload: user
//         })
//     }
//     let user2 = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null
//     try{
//         const {data} = await axios.get(`${sever}/api/users/${user2.type == 'student'? 'student' : 'tutor'}/${user2._id}`)
//         localStorage.setItem('user', JSON.stringify(data))
//         dispatch( {
//             type:'SET_USER',
//             payload: data
//         })
//     } catch(err){
//         alert('an error occured while getting user' + "  " + err)
//     }
//  }

export const setUser = (sever, user) => async(dispatch) => {
    if(user){
        localStorage.setItem('user', JSON.stringify(user))
        dispatch( {
            type:'SET_USER',
            payload: user
        })
    }
    let user2 = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null
    dispatch( {
        type:'SET_USER',
        payload: user2
    })
 }

 



