import { myAxios } from './helper'
export const loginUser=(loginDetail)=>
{
    return myAxios.post('/auth/signin',loginDetail).then((response)=>response.data)
    
}

export const signup=(user)=>{
    return myAxios
    .post('/auth/signup',user)
    .then((response)=>response.data)
}