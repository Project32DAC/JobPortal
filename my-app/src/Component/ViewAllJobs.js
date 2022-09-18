import React, { useEffect, useState } from 'react'
import {Table,Container} from "reactstrap";
import Base from './Base';
import { getAllJobs } from '../services/user-service';
import { toast } from 'react-toastify';
import { deleteJob } from '../services/user-service';
import Button from 'reactstrap';


const ViewAllJobs=()=> {


const [jobs,setJobs]=useState([]);

const deleteJobs = (jobId) => {
    deleteJob(jobId).then((response) =>{
        getAllJobs().then((data) => {
            console.log(data)
            setJobs(data)
        }).catch(error => {
            console.log(error)
        })

    }).catch(error =>{
        console.log(error);
    })
     
 }

useEffect(()=>{
//get all users from server
console.log("userdeatils");
// console.log(getAllUser());
getAllJobs(recruId).then((data) => {
    console.log(data)
    setUsers(data)
}).catch(error => {
    console.log(error)
})



},[])

  return (
    <Base>
        <Container>
        <h1>Recuriter Page</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Job Profile</th>
                        <th>Vacancies</th>
                        <th>Experience</th>
                        <th>Publish Date</th>
                        <th>Job Decription</th>
                    </tr>
                 </thead>
                <tbody>
                    {
                       jobs&& jobs.map(
                                job =>
                            {
                                    return <tr key={job.id}>
                                        <td> {job.jobProfile} </td>
                                        <td> {job.jobVacancy} </td>
                                        <td>{job.experience}</td>
                                        <td>{job.publishDate}</td>
                                        <td>{job.jobDescription}</td>
                                        <td>
                                    <Button color="blue" onClick = {() => deleteJobs(job.id)}>Delete</Button>
                                </td>
                                    </tr>;
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