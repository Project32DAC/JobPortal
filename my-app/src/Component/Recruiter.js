import React from 'react'
import { useNavigate } from 'react-router-dom'
import Base from './Base'
import"./Recruiter.css"
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
export default function Recruiter() {
    let navigate = useNavigate();
    const navigateToview=()=>{
            navigate("/recruiter/viewjob");
       }

    const navigateToSearch=()=>{
        navigate("/recruiter/searchCandidate");
       }

    const navigateToEdit=()=>{
        navigate("/recruiter/update");
       }   
  return (
      <div>
    <Base>
        
            
            <div className='row'>
              <div className='recleftside col-4'>
                <div className="recheader">
                <h1>Recruiter Dashboard</h1>
                </div>
                <div className='rec-button'>
                    <br></br>
                            <Button classNmae="recbtn" color="primary" onClick={navigateToEdit} style = {{marginLeft:"10px"}} >Edit Profile</Button> <br></br>  
                          <br></br><Button classNmae="recbtn" cl color="primary" onClick={navigateToview} style={{ marginLeft: "10px" }}>View Posted Jobs</Button> <br></br>  
                          <br></br> <Button classNmae="recbtn" color="primary" onClick={navigateToSearch} style={{ marginLeft: "10px" }}>Search Employee</Button><br></br>  
                          <br></br><Button classNmae="recbtn" onClick={() => { navigate("/recruiter/addjobs") }} color="primary" style={{ marginLeft: "10px" }}>Add More Jobs</Button><br></br>  
                          <br></br> <Button classNmae="recbtn" onClick={ ()=>{navigate("/recruiter/RecruiterUpdate")} } color="primary" style = {{marginLeft:"10px"}}>Update Profile</Button>
                  </div>
            </div>
              <div className='Rec-page col-8' >
                  <img className="recimg img-fluid rounded " src="../Images/rec1.gif" alt="rec" />
              </div> 
            </div>
    </Base>
          </div>

  )
}
