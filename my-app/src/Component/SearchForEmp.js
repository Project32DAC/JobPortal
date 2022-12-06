import React, { useEffect, useState } from 'react'
import { Table, Container } from "reactstrap";
import Base from './Base';
import { applyThisJob } from '../services/user-service';
import { toast } from 'react-toastify';

import { Form, FormGroup, Label, Input, Card } from 'reactstrap';
import { getAllJobsforEmp } from '../services/user-service';
import { getCurrentUserid } from '../auth';
import "./SearchForEmp.css";


const SearchForEmp = () => {


    const [jobs, setJobs] = useState([]);
    const [profile, setProfile] = useState("");
    const [experience, SetExperience] = useState(0);



    const searchjob = (e) => {
        e.preventDefault();
        console.log("userdeatils");
        // console.log(getAllUser());
        getAllJobsforEmp(profile, experience).then((data) => {
            console.log(data)
            setJobs(data)
        }).catch(error => {
            console.log(error)
        })
    }
    // useEffect(()=>{

    // },[])
    const ApplyJobs = (jobId, jobname) => {
        applyThisJob(jobId, getCurrentUserid()).then((data) => {
            console.log(data)
            toast.success("applied for job profile: " + jobname);
        }).catch(error => {
            if(error.response.data.message=="Invalid Employee Id")
            {
                toast.error("setup your profile to apply jobs in Setup Profile !!")
            }
            else if(error.response.status==500)
         {
                 toast.error("already applied for job")
        }
            console.log(error)
        })

    }

    return (

        <Base>
            <div className='backgroundcolor'>


                <div className='search-emp ' >

                    <Form onSubmit={searchjob}>
                        <FormGroup>

                            <Label for="exampleSearch">

                            </Label>
                            <div class="card">
                                <div class="card-body search-box">

                                    <table className='search-table'>
                                        <tbody>

                                            <td style={{ margin: '0.5rem' }}>
                                                <h4 className='alignsearch' >Search Job </h4>
                                                <div className='searchBox'>

                                                            <h5 style={{ margin: '0.5rem' }}><label aligh='center'>Profile Or Skill</label></h5>
                                                            <Input
                                                                id="profile"
                                                                name="profile"
                                                                placeholder="Enter profile or Skill" 
                                                                type="text"
                                                                onChange={(e) => setProfile(e.target.value)}
                                                                value={profile}
                                                                required
                                                                style={{ width: "390px" }}
                                                            />

                                                            <br></br>
                                                            <h5 style={{ margin: '0.5rem' }}><label aligh='center'>Experience</label></h5>
                                                            <Input
                                                                id="experience"
                                                                name="experience"
                                                                placeholder="Enter Experience"
                                                                type="number"
                                                                onChange={(e) => SetExperience(e.target.value)}
                                                                value={experience}
                                                                required
                                                                style={{ width: "390px" }}

                                                    /> 
                                                </div>
                                            </td>
                                            <td align="center"   >
                                                <button className="btn btn-primary margintops" >Search Jobs</button>
                                            </td>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </FormGroup>
                    </Form >

                </div>


                <div className='search-info'>

                    <table  >
                        <tbody>
                            <tr className='search-content'>


                                {
                                    jobs && jobs.map(
                                        job => {

                                            return (<div className='search-details'><tr key={job.id} className='search'>

                                                <tr>
                                                    {/*<tr>Company id: {job.id} </tr> */}
                                                    <tr>&nbsp;<b> Company Name: {job.companyName}</b> </tr>
                                                    <tr> &nbsp;<b> Address: {job.companyAddress} </b> </tr>
                                                    <tr> &nbsp;<b>  Contact Number: {job.companyContact}</b></tr>
                                                </tr>


                                                {
                                                    job.jobs.map(
                                                        jobr => {
                                                            return (<table className='job' ><td key={jobr.id} >

                                                                <table  >

                                                                    <td className='td1' >
                                                                        <tr>&nbsp; <b>Profile:{jobr.jobProfile} </b> </tr>
                                                                        <tr>&nbsp;<b>  Description: {jobr.jobDescription}</b></tr>
                                                                        <tr>&nbsp; <b>  Job Id: {jobr.id} </b></tr>

                                                                    </td>

                                                                    <td className='td2'>
                                                                        <tr>  <b> Experience:{jobr.experience}</b></tr>
                                                                        <tr><b>  Vacancies: {jobr.jobVacancy} </b></tr>
                                                                        <tr> <b>Publish Date: {jobr.publishDate}</b></tr>

                                                                    </td>

                                                                    <td rowspan="3" align="center" className='td3'>
                                                                        <button className="btn btn-primary ml-2" onClick={() => ApplyJobs(jobr.id, jobr.jobProfile)}>Apply</button>
                                                                    </td>

                                                                </table>

                                                            </td> <tr > <hr /></tr></table>);

                                                        }
                                                    )
                                                }

                                            </tr> <br></br></div>);
                                        }
                                    )
                                }
                            </tr>
                        </tbody>

                        <br></br>
                    </table>
                </div>


            </div>

        </Base>


    )
}
export default SearchForEmp;