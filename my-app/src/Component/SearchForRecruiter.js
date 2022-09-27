import React, { useEffect, useState } from 'react'
import { Table, Container } from "reactstrap";
import Base from './Base';
import { applyThisJob, getAllUser } from '../services/user-service';
import { toast } from 'react-toastify';
import { deleteUser } from '../services/user-service';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllJobsforEmp } from '../services/user-service';
import { getCurrentUserid } from '../auth';
import { searchCandidate } from '../services/user-service';
import "./SearchForRecruiter.css"
const SearchForRecruiter = () => {


    const [resume, setResume] = useState([]);
    const [experience, SetExperience] = useState(0);
    const [skills, Setskills] = useState("");



    const searchEmp = (e) => {
        e.preventDefault();
        console.log("userdeatils");
        // console.log(getAllUser());
        searchCandidate(skills, experience).then((data) => {
            console.log(data)
            setResume(data)
        }).catch(error => {
            console.log(error)
        })
    }
    // useEffect(()=>{
    // //get user from server


    // init();

    // },[])



    return (
        <div>
            <Base>
                <div className='search-rec'>
                    <div className='search-rec1' >
                        {/*</div><h1>search candidate</h1></div>*/}

                        <Form onSubmit={searchEmp}>
                            <FormGroup>
                                <Label for="exampleSearch">

                                </Label>
                                <div class="card">
                                    <div class="card-body search-box">

                                            <table className='recsearch-table'>
                                                <tbody>
                                                    <tr><h4 className='searchname'>Search Candidate</h4></tr>
                                                        <div className='searchBox'>
                                                            <td >
                                                                <tr > 
                                                                <h5 style={{ margin: '0.5rem' }}><label aligh='center'>Experience</label></h5>
                                                                    <Input
                                                                    id="experience"
                                                                    name="experience"
                                                                    placeholder="Experience"
                                                                    type="experience"
                                                                    style={{ width: "390px" }}
                                                                    onChange={(e) => SetExperience(e.target.value)}
                                                                    value={experience}

                                                                />  </tr>
                                                                <tr><br></br></tr>

                                                                <tr >  
                                                                <h5 style={{ margin: '0.5rem' }}><label aligh='center'>Skill</label></h5>
                                                                    <Input
                                                                    id="skills"
                                                                    name="skills"
                                                                    placeholder="Skill"
                                                                    type="skills"
                                                                    style={{ width: "390px" }}
                                                                    onChange={(e) => Setskills(e.target.value)}
                                                                    value={skills}

                                                                /> </tr>
                                                            </td>
                                                        </div>    
                                                    <td rowSpan="3" align="center"  >
                                                        <button className="btn btn-primary ml-2" >Search</button>
                                                    </td>
                                                </tbody>
                                            </table>
                                        </div>    
                                 </div>           
                            </FormGroup>
                        </Form >
                    </div>


                    <div >
                        <Container>
                            <br></br><br></br>
                            <Table className='search-recdata' style={{ textAlign: "center" }} striped hover stickyHeade bordered>
                                <thead>
                                    <tr class="searchrecheader">
                                        {/* <th> job id </th> */}
                                        <th>Employee Id</th>
                                        <th> First Name </th>
                                        <th>last Name</th>
                                        <th>Email Id </th>
                                        <th>SSC Marks</th>
                                        <th>HSC Marks</th>
                                        <th>Degree Marks</th>
                                        <th>Graduation </th>
                                        <th>Branch Name</th>
                                        <th>Experience </th>
                                        <th>Contact Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        resume && resume.map(
                                            jobr => {
                                                return (<tr key={jobr.id}>
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


                                                </tr>);

                                            }
                                        )
                                    }
                                </tbody>


                            </Table>
                        </Container>
                    </div>

                </div >
            </Base>
        </div>
    )
}
export default SearchForRecruiter;