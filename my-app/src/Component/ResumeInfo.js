import React, { useEffect, useState } from 'react'

import Base from './Base';
// import { getAllUser } from '../services/user-service';
import { getResumeInfo } from '../services/user-service';
import { getCurrentUserid } from '../auth';
import "./ResumeInfo.css"

import {
  Button, Container,
  Card,
  CardHeader,
  Form,
  Label,
  Row,
  Col,
  Table,
  Input,
  CardBody,
  FormGroup,
} from "reactstrap";
import { toast } from 'react-toastify';
import { changeExpandSkill } from '../services/user-service';

export default function ResumeInfo() {


  const [resume, setResume] = useState({
    "firstName": "",
    "lastName": "",
    "email": "",
    "sscMarks": 0,
    "hscMarks": 0,
    "degreeMarks": 0,
    "graduation": "",
    "branch": "",
    "experience": 0,
    "contact": 0,
    "photo": "",
    "skills": []
  })
  const [skills2, setSkills2] = useState([]);
  const [values, setValues] = useState("");
  const [experience2, SetExperience2] = useState(0);
  const [data, setData] = useState({
    "experience": 0,
    "skills": []
  });
  const [photos, setPhotos] = useState("");
  const handleExperience2 = (e) => {
    // SetExperience2=e.target.value;
    SetExperience2(e.target.value);
    console.log("experience")
    console.log(e.target.value)

  }
  const init = () => {
    getResumeInfo(getCurrentUserid()).then((data) => {
      setResume(data);
      console.log(data);
      setPhotos(resume.photo)
      img();

    }).catch(error => {
      console.log(error)
      if (error.response.data.message == "No entity found for query" ) {
         toast.error("Please complete your profile first in setup profile page")
     }
     if (error.response.data.message == null ) {
      toast.error("Please upload your image ")
   }
    })
  }
  const submitSkillandExp = (event) => {
    event.preventDefault()
    console.log("data object " + JSON.stringify(data));
    //data validate

    //call server api for sending data
    data['experience'] = experience2;
    data['skills'] = skills2;
    changeExpandSkill(getCurrentUserid(), data).then((resp) => {
      console.log(resp)
      console.log("success log");
      toast.success("update is succesfull!!");


    }).catch((error) => {
      console.log(error)
      console.log("error log");
      
     
      // handling errors 

    })

  }
  useEffect(() => {
    //get user from server


    init();


  }, [])
  const updateSkill = () => {
    //setSkills({...skills, event.target.value});
    console.log("skills changed");
    // console.log(event.target.value);

    //updateMyArray( arr => [...arr, `${arr.length}`]);
    setSkills2(skills2 => [...skills2, values])
    // this.setSkills({
    //     skills:arr
    // })
    //console.log(event.target.value);


  }
  const img = () => {
    sessionStorage.setItem("photo", JSON.stringify(resume.photo));
  }


  const updateValues = ({ target }) => {

    setValues(target.value)
  }
  const keyPressed = ({ key }) => {

    if (key === "Enter") {
      updateSkill()
    }
  }
  

  return (
    <div>
      <Base>
        <div className="row">
                <div className="resumeleftside col-4">
                  <div>
                    <h1 className='resumepage'>Resume</h1>
                    <img className="resumeimg img-fluid rounded "  style={{marginleft:"2 rem"}} src="../Images/resume.gif" alt="resume" />

                  </div>
                </div>

          <div className="resumerightside col-8">
            <div>


              <div>
                <table className='resume-table' background="./Images/a.jpg">
                  <td>&nbsp;&nbsp;</td>
                  <td>
                    {/*1st row*/}
                    <tr className='personal'>


                      <tr ><h4><b>Personal Details</b></h4></tr>
                      <tr className='personaldetails'>
                        <td className="Personal-td" >
                          <tr><b>First Name</b></tr>
                          <tr><b>Last Name</b></tr>
                          <tr><b>Email</b></tr>
                          <tr><b>Contact Number</b></tr>
                        </td>
                        <td className="Personal-td">
                          <tr> {resume.firstName}</tr>
                          <tr> {resume.lastName}</tr>
                          <tr> {resume.email}</tr>
                          <tr> {resume.contact}</tr>
                        </td>
                       
                        <td className="Personal-td2" rowspan="3" >
                          <tr > <img src={`../Images/${getCurrentUserid()}.png`} alt="Candidate Photo" height="150px" width="150px" ></img></tr>
                        </td>
                      </tr>
                    </tr>
                    {/*2nd row*/}
                    <br></br>
                    <tr>
                      <td><h4><b>Experience</b></h4></td>
                    </tr>
                    <tr><td>{resume.experience} Years</td></tr>
                    <br></br>
                    {/*3rd row*/}
                    <tr><h4><b>Academic Details</b></h4></tr>
                   
                      <Table style={{ textAlign: "center",border:"3px black" }} striped bordered hover stickyHeader >
                      <tbody >
                        <tr >
                          <th >Level</th>
                          <th>Stream</th>
                          <th>Percentage</th>
                        </tr>
                        <tr>
                          <td>BE</td>
                          <td>{resume.branch}</td>
                          <td>{resume.degreeMarks}</td>
                        </tr>
                        <tr>
                          <td>HSC</td>
                          <td>General</td>
                          <td>{resume.hscMarks}</td>
                        </tr>
                        <tr>
                          <td>SSC</td>
                          <td>General</td>
                          <td>{resume.sscMarks}</td>
                        </tr>
                      </tbody>
                    </Table>
                   


                    <br></br>
                    <tr>
                      <tr><h4><b>Skills</b></h4></tr>
                      <tr>
                        {resume.skills && resume.skills.map(
                          jobr => {
                            return (<tr> {jobr} </tr>);


                          }
                        )}
                      </tr>

                    </tr>
                  </td>
                  <td>&nbsp;&nbsp;</td>
                </table>
              </div>



            </div>
          </div>
        </div>
      </Base>
    </div>

  )
}
