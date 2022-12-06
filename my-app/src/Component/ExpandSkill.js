import React, { useEffect, useState } from 'react'

import Base from './Base';
// import { getAllUser } from '../services/user-service';
import { getResumeInfo } from '../services/user-service';
import { getCurrentUserid } from '../auth';

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
import "./ExpandSkill.css"

export default function ExpandSkill() {



    const [skills2, setSkills2] = useState([]);
    const [values, setValues] = useState("");
    const [experience2, SetExperience2] = useState(0);
    const [data, setData] = useState({
        "experience": "",
        "skills": []
    });
    const [photos, setPhotos] = useState("");
    const handleExperience2 = (e) => {
        // SetExperience2=e.target.value;
        SetExperience2(e.target.value);
        console.log("experience")
        console.log(e.target.value)

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
            toast.error("operation failed");
            // handling errors 

        })

    }

    const updateSkill = () => {

        console.log("skills changed");



        setSkills2(skills2 => [...skills2, values])
        toast.success("skills added "+values);



    }



    const updateValues = ({ target }) => {

        setValues(target.value)
    }
    const keyPressed = ({ key }) => {

        if (key === "Enter") {
            updateSkill()
        }
    }
    const resetData = () => {
        SetExperience2(
            ""
        )
        setSkills2(
            []
        )
    }

    return (
        <Base>

            <div className='addskill' style={{backgroundImage: "url(/Images/rec2.jpg)",
                 backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
            }}>
                &nbsp;
                <div className='container-fluid'><h1 className="skill-header">Update Your info</h1></div>
                
                <br></br>
                <div className='skilldata'>
                   

                    <Col sm={{ size: 5, offset: 4}}>
                   
                        <Card color="dark" outline>
                            <CardHeader>
                                    <h3><b>Fill Information To Update</b></h3> 
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitSkillandExp}>
                                    <FormGroup>
                                        <Label for="skills">
                                               <b>Skills</b>
                                        </Label>
                                        <Input
                                            id="skills"
                                            name="skills"
                                            placeholder="Enter your skills"
                                            type="text"
                                            // onChange={(e)=>updateskill(e)}
                                            //  value={skills}
                                            onChange={updateValues}
                                            onKeyPress={keyPressed}
                                        />
                                        <br></br>
                                        <Button onClick={updateSkill}color="primary" type="reset" className="ms-2">Add More Skill</Button>
                                        {/* <Label>{JSON.stringify(skills2)}</Label> */}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="experience">
                                            <b>Experience</b>
                                        </Label>
                                        <Input
                                            id="experience"
                                            name="number"
                                            placeholder="Enter experience in years"
                                            type="number"
                                            onChange={(e) => handleExperience2(e)}
                                            value={experience2}
                                        />
                                    </FormGroup>
                                    <Container className="text-center">
                                            <Button color="primary">Submit</Button>&nbsp;&nbsp;
                                        <Button onClick={resetData} color="dark">Reset</Button>
                                    </Container>
                                </Form>

                            </CardBody>
                        </Card>
                    
                    </Col>
                </div>

               
            </div>
        </Base>

    )
}
