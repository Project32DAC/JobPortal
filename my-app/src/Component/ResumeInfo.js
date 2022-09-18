import React, { useEffect, useState } from 'react'
import {Table,Container} from "reactstrap";
import Base from './Base';
// import { getAllUser } from '../services/user-service';
import { getResumeInfo } from '../services/user-service';
import { getCurrentUserid } from '../auth';


export default function ResumeInfo() {


const [resume,setResume]=useState({"firstName": "",
"lastName": "",
"email": "",
"sscMarks": 0,
"hscMarks": 0,
"degreeMarks": 0,
"graduation": "",
"branch": "",
"experience": 0 ,
"contact": 0,
"skills": []})

const init=()=>{
getResumeInfo(getCurrentUserid()).then((data)=>{
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

  return (
    <Base>
        <Container>
        <Table>
                <thead>
                <tr>
                                
                                <th> first name </th>
                                <th>last name</th>
                                <th>email</th>
                                <th>sscMarks</th>
                                <th>hscMarks</th>
                                <th>degree marks</th>
                                <th>graduation</th>
                                <th>branch</th>
                                <th>experience</th>
                                <th>contact</th>
                                <th>skills</th>
                </tr>
                 </thead>
                <tbody>
                <tr>
                               {/* //he kamm omkar la css  */}
                                <td> {resume.firstName} </td>
                                <td>{resume.lastName}</td>
                                <td>{resume.email}</td>
                                <td>{resume.sscMarks}</td>
                                <td>{resume.hscMarks}</td>
                                <td>{resume.degreeMarks}</td>
                                <td>{resume.graduation}</td>
                                <td>{resume.branch}</td>
                                <td>{resume.experience}</td>
                                <td>{resume.contact}</td>
                                <td>{resume.skills}</td> {/*skill*/}
                            </tr>
                </tbody>
            </Table>

    </Container>
    </Base>
    
  )
}
