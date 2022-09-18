
import React, { useEffect, useState } from "react";
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
    import { toast } from 'react-toastify';
import Base from "./Base";
import { getCurrentUserDetail } from "../auth";
import { recruiteredit } from "../services/user-service";
import { getCurrentUserid } from "../auth";
import { doLogout } from "../auth";
import { deleteRecruiterAccount } from "../services/user-service";
import { useNavigate } from "react-router-dom";
const RecruiterEdit = () =>
{
    let navigate = useNavigate()
    const[user, setUser] = useState(undefined)
    const[jobs, setJobs]= useState(
        {
             jobProfile:'',
             jobVacancy: '',
             experience:''
        }
    ) 
    const[data,setData] =useState({
        companyName:'',
        companyAddress:'',
        companyContact:''
        
    
       })
       // handle change
   const handleChangeforCompany=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    console.log("name changed");
    console.log(event.target.property);
    console.log(event.target.value)


   }
   const handleChangeforJobs=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    console.log("name changed");
    console.log(event.target.property);
    console.log(event.target.value)

   }
   const resetData=()=>{
    setData({
        companyName:'',
        companyAddress:'',
        companyContact:''
        
    

    })
    setJobs(
        {
            jobProfile:'',
             jobVacancy: '',
             experience:''

        }
    )
    
   

    
   }
   useEffect(
    ()=>
    {

       setUser(getCurrentUserDetail())
    },
    []
     )
   
   const editForm=(event)=>{
    event.preventDefault()
    console.log(data);
    //data validate
   
    //call server api for sending data
    data['userId'] = user.id
    data['jobs']=jobs
    recruiteredit(data).then((resp)=>{
        console.log(resp)
        console.log("success log");
        toast.success("succesfull!!");
        
    }).catch((error)=>{
        console.log(error)
        console.log("error log");
        toast.error("something gone wrong failed");
        // handling errors 
        
    })
   }
   //logout
   const logout=()=>{
    doLogout(()=>{
      //logged out
     
      navigate("/")
    })
  }
   //delete my account
   const DeleteMyAccount= () =>
{
    deleteRecruiterAccount(getCurrentUserid()).then((resp)=>{
        console.log(resp)
        console.log("success log");
        toast.success("account deleted");
        logout();
       // navigate("/");
    }).catch((error)=>{
        console.log(error)
        console.log("error log");
        toast.error("operation failed");
        // handling errors 
        // setError(
        //     {
        //         errors:error,
        //         isError:true
        //     }
        // )
    })
    
    
    
}

    return(
        <div>
        <Base>
        <Container>
        <div>
            {/* <Button onClick={moveToResume} >view my jobs</Button> */}
            <Button onClick={DeleteMyAccount}>Delete My Account</Button>
        </div>
        <h1>Recruiter Page</h1>
            <Row className="mt-4">

               
               <Col sm={{size: 6, offset: 3}}>
               <Card color="dark" outline>
                <CardHeader>
                    Fill Information to register
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit= {editForm}>
                        <FormGroup>
                            <Label for="companyName">Enter company name</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyName"
                            onChange={(e)=>handleChangeforCompany(e,'companyName')}
                            value={data.companyName}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyAddress">Enter Address</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyAddress"
                            onChange={(e)=>handleChangeforCompany(e,'companyAddress')}
                            value={data.companyAddress}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyContact">Enter phone number</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyContact"
                            onChange={(e)=>handleChangeforCompany(e,'companyContact')}
                            value={data.companyContact}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="jobs">Enter job profile recquired</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="text"
                            onChange={(e)=>handleChangeforJobs(e,'jobprofile')}
                            value={jobs.jobProfile}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="jobs">Enter vacancy recquired</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="text"
                            onChange={(e)=>handleChangeforJobs(e,'vacancy')}
                            value={jobs.vacancy}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="jobs">Enter Experience recquired</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="text"
                            onChange={(e)=>handleChangeforJobs(e,'experience')}
                            value={jobs.experience}
                            ></Input>
                        </FormGroup>

                        

                        <Container className="text-center">
                            <Button color="dark">Register</Button>
                            <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                        </Container>
                    </Form>
                 </CardBody>
                 </Card>
               </Col> 
            </Row>
            
        </Container>
        </Base>
        </div>
    );
};

export default RecruiterEdit;