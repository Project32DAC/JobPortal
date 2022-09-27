import React, { useEffect, useState } from 'react'
import {Table,Container} from "reactstrap";
import Base from './Base';
import { getAllJobs } from '../services/user-service';
import { toast } from 'react-toastify';
import { deleteJob } from '../services/user-service';
import { Button } from 'reactstrap';
import { getCurrentUserid } from '../auth';
import { setCurrentJobId } from '../auth';
import { useNavigate } from 'react-router-dom';
import "./ViewAllJobs.css"

const ViewAllJobs=()=> {


const [jobs,setJobs]=useState([]);

const navigate = useNavigate ();

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
       
    }).catch(error => {
        console.log(error)
        toast.error("something went wrong")
    })
 }
 const gotoApplicant=(jobId)=>
 {
    setCurrentJobId(jobId)
    navigate("/recruiter/viewApplicant");
 }
useEffect((e)=>{
//get all jobs for recruiter
// e.preventDefault();
console.log("userdeatils");
 init();




},[])

  return (
    <Base>
          <div className="viewalljob"
              style={{

                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
              }} >

        <Container>
        <br></br>
                  <h1 class="alljobitalic">Posted Job List</h1>
                  <div className='alljobtable'>
              <Table style={{ textAlign: "center" }} striped hover stickyHeade bordered>
                <thead>
                  <tr className="alljobheading">
                        <th>Job id</th>
                        <th>Job Profile</th>
                        <th>Vacancies</th>
                        <th>Experience</th>
                        <th>Publish Date</th>
                        <th>Job Description</th>
                        <th>Action</th>
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
                                            <Button color="primary" onClick={() => { gotoApplicant(job.id) }} >View Applicants</Button>
                                            &nbsp; &nbsp; &nbsp;
                                            <button className="btn btn-danger ml-2" onClick={() => deleteJobs(job.id)}>Delete</button>

                                </td>
                                    </tr>);
                                }
                        )
                    }
                </tbody>
            </Table>
</div>

    </Container>
    </div>
    </Base>
    
  )
}
export default ViewAllJobs;