import React, { useEffect, useState } from 'react'
import {Table,Container} from "reactstrap";
import Base from './Base';
import { getAllJobs } from '../services/user-service';
import { toast } from 'react-toastify';
import { deleteJob } from '../services/user-service';
import { Button } from 'reactstrap';
import { getCurrentUserid } from '../auth';


const ViewAllJobs=()=> {


const [jobs,setJobs]=useState([]);
// const [users,setUsers]=useState([]);

const deleteJobs = (jobId) => {
    deleteJob(jobId).then((response) =>{
        console.log(response.data);
        toast.success("job deleted");
        init();

    }).catch(error =>{
        console.log(error);
    })
     
 }
 const init=()=>
 {
    getAllJobs(getCurrentUserid()).then((data) => {
        console.log(data)
        setJobs(data)
        toast.success("jobs loaded");
    }).catch(error => {
        console.log(error)
        toast.error("something went wrong")
    })
 }
useEffect((e)=>{
//get all jobs for recruiter
// e.preventDefault();
console.log("userdeatils");
 init();




},[])

  return (
    <Base>
        <Container>
        <h1>Recuriter Page</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Job id</th>
                        <th>Job Profile</th>
                        <th>Vacancies</th>
                        <th>Experience</th>
                        <th>Publish Date</th>
                        <th>Job Decription</th>
                        <th>Delete Action</th>
                    </tr>
                 </thead>
                <tbody>
                    {
                       jobs&& jobs.map(
                                job =>
                            {
                                    return (<tr key={job.id}>
                                        <td> {job.id} </td>
                                        <td> {job.jobProfile} </td>
                                        <td> {job.jobVacancy} </td>
                                        <td>{job.experience}</td>
                                        <td>{job.publishDate}</td>
                                        <td>{job.jobDescription}</td>
                                        <td>
                                        <button className="btn btn-danger ml-2" onClick = {() => deleteJobs(job.id)}>Delete</button>
                                </td>
                                    </tr>);
                                }
                        )
                    }
                </tbody>
            </Table>


    </Container>
    </Base>
    
  )
}
export default ViewAllJobs;