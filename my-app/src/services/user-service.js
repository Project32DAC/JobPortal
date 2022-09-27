import { myAxios, privateAxios } from './helper'
export const loginUser = (loginDetail,isSubmit) => {
    if(isSubmit)
    return myAxios.post('/auth/signin', loginDetail).then((response) => response.data)
    else
    return;

}

export const signup = (user,isSubmit) => {
    if(isSubmit)
    return myAxios
        .post('/auth/signup', user)
        .then((response) => response.data)
    else
    return;
}

export const recruiteredit = (data, userId,isSubmit) => {
    if(isSubmit)
    return privateAxios.post(`/recruiter/edit/${userId}`, data)
    else
    return;
}

export const employeeedit = (data, userId,isSubmit) => {
    if(isSubmit)
    return privateAxios.post(`/employee/edit/${userId}`, data)
    else
    return;
}
export const getAllUser = () => {
    return privateAxios.get(`/user`)
        .then((response) => response.data);
}

export const deleteUser = (userId) => {
    return privateAxios.delete(`/user/delete/${userId}`).then(Response => Response.data)

}
//http://localhost:8080/employee/generateresume/3
export const getResumeInfo = (userId) => {
    return privateAxios.get(`/employee/generateresume/${userId}`).then(response => response.data);
}
///http://localhost:8080/employee/delete/{userId}
//http://localhost:8080/employee/delete/4

export const deleteEmployeeAccount = (userId) => {
    return privateAxios.delete(`/employee/delete/${userId}`).then(response => response.data);
}

export const deleteRecruiterAccount = (userId) => {
    return privateAxios.delete(`/recruiter/delete/${userId}`).then(response => response.data);
}
//addjob
export const addJob = (data, recruId,isSubmit) => {
    if(isSubmit)
    return privateAxios.post(`/recruiter/addjobs/${recruId}`, data)
    else
    return;

}
//viewalljob
//http://localhost:8080/recruiter/viewJobs/20
export const getAllJobs = (recruId) => {
    return privateAxios.get(`/recruiter/viewJobs/${recruId}`)
        .then((response) => response.data);
}
//deletejob
//("/deletejobs/{jobId}")
export const deleteJob = (jobId) => {
    return privateAxios.delete(`/recruiter/deletejobs/${jobId}`).then(Response => Response.data)

}
//@PostMapping("/search/{jobProfile}/{exp}")
export const getAllJobsforEmp = (job_profile, exp) => {
    return privateAxios.get(`employee/search/${job_profile}/${exp}`)
        .then((response) => response.data);
}
//apply for this job
export const applyThisJob = (jobid, empid) => {
    return privateAxios.get(`/employee/apply/${jobid}/${empid}`).then(Response => Response.data)
}

//http://localhost:8080/recruiter/viewjobapplications/16
//view applicant
export const viewApplicantreq = (jobid) => {
    return privateAxios.get(`/recruiter/viewjobapplications/${jobid}`).then(Response => Response.data)
}

//select candidate through empId
//"/selectcandidate/{empId}"
export const selectCandidatebyEmpid = (empid) => {
    return privateAxios.get(`/recruiter/selectcandidate/${empid}`).then(Response => Response.data)
}

//changing experience and skill

export const changeExpandSkill = (empid, data) => {
    return privateAxios.put(`/employee/change/${empid}`, data).then(Response => Response.data)
}

//recruiter search
// /recruiter/search/{skills}/{exp}
export const searchCandidate = (skills, exp) => {
    return privateAxios.get(`/recruiter/search/${skills}/${exp}`).then(Response => Response.data)
}

//fetchAllEmployees
export const fetchAllEmployees = () => {
    return privateAxios.get(`/user/employeefetch`).then(Response => Response.data)
}

//fetchAllRecruiters
export const fetchAllRecruiters = () => {
    return privateAxios.get(`/user/recruiterfetch`).then(Response => Response.data)
}
//@PutMapping("/editcomplete/{id}")
//update employee
export const putEmployee = (data, userId,isSubmit) => {
    if(isSubmit)
    return privateAxios.put(`/employee/editcomplete/${userId}`, data).then(Response => Response.data)
    else
    return;
   
}
export const viewRecruiterDetails = (recId) => {
    return privateAxios.get(`/recruiter/viewRecruiterDetails/${recId}`).then(Response => Response.data)
}

///recruiter/editcompleterecru/${recId}
export const editcompleterecru = (data, recId,isSubmit) => {
    if(isSubmit)
    return privateAxios.put(`/recruiter/editcompleterecru/${recId}`, data).then(Response => Response.data)
    else
    return;
}
//@GetMapping("/viewEmpAllDetails/{empId}")
export const viewEmplAlldetails = (empId) => {
    return privateAxios.get(`/employee/viewEmpAllDetails/${empId}`).then(Response => Response.data)
}