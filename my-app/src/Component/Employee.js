import React from 'react'

import { useNavigate } from "react-router-dom";
import { Button, Container ,
    Card,
    CardHeader,
    Form,
    Label,
    Row,
    Col, 
    
    Input,
    CardBody,
    FormGroup,
    } from "reactstrap";
    import Base from './Base';
    import "./Employee.css"

export default function Employee() {

    let navigate = useNavigate()
    const moveToResume =()=>{
        navigate("/employee/resume");
        
    }
    const searchForJob =()=>{
        navigate("/employee/searchjob");
        
    }

    const moveToEdit =()=>{
        navigate("/employee/empedit");
        
    }

  return (
    <div>
    <Base>
              <div className='row'>
                  <div className='empleftside col-4'>
                      <div className="empheader">
                          <h1>Employee Dashboard</h1>
                      </div>
                      <div className='emp-button'>
                          <br></br>
                          <Button color="primary" onClick={() => { navigate('/employee/empedit') }} style={{ marginLeft: "10px" }} >Setup Profile</Button>
                          <br></br><br></br><Button  color="primary" onClick={searchForJob} style={{ marginLeft: "10px" }}>Search For Job</Button>
                          <br></br><br></br><Button color="primary" onClick={moveToResume} style={{ marginLeft: "10px" }} >View My Resume</Button>
                          <br></br><br></br><Button onClick={() => { navigate("/employee/update") }} color="primary" style={{ marginLeft: "10px" }}>Update Your Info</Button>
                      </div>
                  </div>
                  <div className='emp-page col-8' >
                      <img className="empimg img-fluid rounded " src="../Images/emp-page.jpg" alt="emp" />
                  </div>
              </div>

    </Base>
    </div>
  )
}


