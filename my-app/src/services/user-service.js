import { myAxios, privateAxios } from './helper'
export const loginUser=(loginDetail)=>
{
    return myAxios.post('/auth/signin',loginDetail).then((response)=>response.data)
    
}

export const signup=(user)=>{
    return myAxios
    .post('/auth/signup',user)
    .then((response)=>response.data)
}

export const recruiteredit=(data,userId)=>
{
    
    return privateAxios.post(`/recruiter/edit/${userId}`,data)
    
}

export const employeeedit=(data,userId)=>
{
    return privateAxios.post(`/employee/edit/${userId}`,data)
}
export const getAllUser=()=>
{
    return privateAxios.get(`/user`)
    .then((response)=>response.data);
}

export const deleteUser=(userId)=>{
    return privateAxios.delete(`/user/delete/${userId}`).then(Response=>Response.data)
    
}
//http://localhost:8080/employee/generateresume/3
export const getResumeInfo=(userId)=>
{
    return privateAxios.post(`/employee/generateresume/${userId}`).then(response=>response.data);
}
///http://localhost:8080/employee/delete/{userId}
//http://localhost:8080/employee/delete/4

export const deleteEmployeeAccount=(userId)=>
{
    return privateAxios.delete(`/employee/delete/${userId}`).then(response=>response.data);
}

export const deleteRecruiterAccount=(userId)=>
{
    return privateAxios.delete(`/recruiter/delete/${userId}`).then(response=>response.data);
}
//addjob
export const addJob=(data,recruId)=>
{
    
    return privateAxios.post(`/recruiter/addjobs/${recruId}`,data)
    
}
//viewalljob
//http://localhost:8080/recruiter/viewJobs/20
export const getAllJobs=(recruId)=>
{
    return privateAxios.post(`/recruiter/viewJobs/${recruId}`)
    .then((response)=>response.data);
}
//deletejob
//("/deletejobs/{jobId}")
export const deleteJob=(jobId)=>{
    return privateAxios.delete(`/recruiter/deletejobs/${jobId}`).then(Response=>Response.data)
    
}

