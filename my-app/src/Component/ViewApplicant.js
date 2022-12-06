import React, { useEffect, useState } from 'react'
import {Table,Container} from "reactstrap";
import Base from './Base';
// import { getAllUser } from '../services/user-service';
import { getResumeInfo } from '../services/user-service';
import { getCurrentJobId, getCurrentUserid } from '../auth';
import { viewApplicantreq } from '../services/user-service';
import {Button} from 'reactstrap';
import { toast } from 'react-toastify';
import { selectCandidatebyEmpid } from '../services/user-service';
import "./ViewApplicant.css";

 function ViewApplicant(props) {


const [resume,setResume]=useState([]);


//employeeid pass through props view alljobs component
const init=()=>{
    let empID;
    viewApplicantreq(getCurrentJobId()).then((data)=>{
    setResume(data);
    
    console.log(data);

}).catch(error=>{
    console.log(error)
})
}
useEffect(()=>{
//get user from server


init();

},[])

const selectCandidate = (empId) =>
{
    toast.success("candidate selected")
    selectCandidatebyEmpid(empId).then((data)=>{
        
        
        console.log(data);
    
    }).catch(error=>{
        console.log(error)
    })
}

  return (
    <Base>
    <div className='appinfo'>
        <Container >
            <h1 className='appname'>View Applicants</h1>
             <div className='apptable' >        
                                <Table striped bordered hover stickyHeader>
                                        <thead>
                                        <tr className="appheading">
                                                        {/* <th> job id </th> */}
                                                        <th>Employee id</th>
                                                        <th>First Name </th>
                                                        <th>Last Name</th>
                                                        <th>Email</th>
                                                        <th>SSC Marks</th>
                                                        <th>HSC Marks</th>
                                                        <th>Degree marks</th>
                                                        <th>Graduation</th>
                                                        <th>Branch</th>
                                                        <th>Experience</th>
                                                        <th>Contact</th>
                                                        <th>Action</th>
                                                        
                                                    
                                                        </tr>
                                        </thead> 
                                    
                                    
                                        
                                    <tbody>
                                            {
                                            resume&& resume.map(
                                                        jobr =>
                                                    {
                                                            return (<tr key= {jobr.id}>
                                                                                <td> {jobr.id} </td>
                                                                                {/* <td>{jobr.employeeUser.id} </td> */}
                                                                                <td> {jobr.employeeUser.firstName} </td>
                                                                                <td> {jobr.employeeUser.lastName} </td>
                                                                                <td>{jobr.employeeUser.email}</td>
                                                                                <td> {jobr.sscMarks}</td>
                                                                                <td> {jobr.hscMarks}</td>
                                                                                <td> {jobr.degreeMarks}</td>
                                                                                <td> {jobr.graduation}</td>
                                                                                <td> {jobr.branch}</td>
                                                                                <td> {jobr.experience}</td>
                                                                                <td> {jobr.contact}</td>
                                                                            
                                                                                <td><button className="btn btn-primary ml-2" onClick={()=>{selectCandidate(jobr.employeeUser.id)}} >Select Candidate</button> </td> 
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
export default ViewApplicant;