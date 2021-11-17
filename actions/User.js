export const setUser = () => {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null
     return {
         type:'SET_USER',
         payload: user
     }
 }

 



