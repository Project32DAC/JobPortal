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
    import "./Admin.css";

export default function Admin() {

    
  let navigate = useNavigate()
    const navigateToEmployee=()=>{
        navigate("/admin/ViewEmployee");
   }
   const navigateToRecruiters=()=>{
    navigate("/admin/ViewRecruiters");
}

const navigateToAllUser=()=>{
  navigate("/admin/user");
}


  return (
    <div>
    <Base>
        <div className='row'>
          <div className='adminleftside col-4'>
            <div className="adminheader">
              <h1>Admin Dashboard</h1>
            </div>
            <div className='admin-button'>
              <br></br>
              <br></br><br></br>  <Button color="primary" onClick={navigateToEmployee} style={{ marginLeft: "10px" }}>View Employee</Button>
              <br></br> <br></br> <Button color="primary" onClick={navigateToRecruiters} style={{ marginLeft: "10px" }}>View Recruiters</Button>
              <br></br> <br></br> <Button color="primary" onClick={navigateToAllUser} style={{ marginLeft: "10px" }}>View All Users</Button>
            </div>
          </div>
          <div className='admin-page col-8' >
            <img className="adminimg img-fluid rounded " src="../Images/login.gif" alt="emp" />
          </div>
        </div>
        
    </Base>
    </div>

  )
}
