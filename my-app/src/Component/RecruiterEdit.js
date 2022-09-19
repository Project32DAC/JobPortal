
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

import { recruiteredit } from "../services/user-service";
import { getCurrentUserid } from "../auth";
import { doLogout } from "../auth";
import { deleteRecruiterAccount } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { NavLink as ReactLink } from "react-router-dom";
import AddJob from "./AddJob";
const RecruiterEdit = () =>
{
    let navigate = useNavigate()
    // const[user, setUser] = useState(undefined)
    // const [companyName,SetcompanyName]=useState('');
    // const[companyAddress,SetcompanyAddress]=useState('');
    // const[companyContact,SetcompanyContact]=useState('');
    // const[jobProfile,SetJobProfile]=useState('');
    // const[jobVacancy,SetJobVacancy]=useState('');
    // const[experience,SetExperience]=useState('');
    // let [jobs,SetJobs]=useState([]);
  
    
    
    
    const[prejobs, SetpreJobs]= useState(
        {
             jobProfile:'',
             jobVacancy: '',
             experience:'',
             publishDate:'',
             jobDescription:''
        }
    ) 
    const[data,setData] =useState({
        companyName:'',
        companyAddress:'',
        companyContact:'',
        
        
    
       })
       // handle change
   const handleChangeforCompany=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    console.log("name changed");
    console.log(event.target.property);
    console.log(event.target.value)


   }
   const handleChangeforJobs=(event,property)=>{
   
    SetpreJobs({...prejobs,[property]:event.target.value})
    
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
    SetpreJobs(
        {
             jobProfile:'',
             jobVacancy: '',
             experience:'',
             publishDate:'',
             jobDescription:''

        }
    )
   }
   

    
//    }
//    useEffect(
//     ()=>
//     {

//        setUser(getCurrentUserDetail())
//     },
//     []
//      )
   
   const editForm=(event)=>{
    event.preventDefault()
    
// const Obj={jobProfile,jobVacancy,experience};
        let arr = [];
        arr.push(prejobs);
//     const data = {companyName,companyAddress,companyContact,arr};
//     console.log(data);
    //data validate
   
    //call server api for sending data
    
    data['jobs']=arr;
    console.log(data);
    
    recruiteredit(data,getCurrentUserid()).then((resp)=>{
        console.log(resp);
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
    // const updateSkill = () =>{
    //     //setSkills({...skills, event.target.value});
    //     console.log("skills changed");
    //     // console.log(event.target.value);
       
    //     //updateMyArray( arr => [...arr, `${arr.length}`]);
    //      setSkills(skills => [...skills,{ values}])
    //     // this.setSkills({
    //     //     skills:arr
    //     // })
    //     //console.log(event.target.value);
    
        
    //    }
    
    
      
    // const updateValues = ({ target }) => {
    //  console.log(target.value)   
    //  setValues(target.value)
    //    }
    // const keyPressed = ({ key }) => {
       
    //  if (key === "Enter") {
    //        updateSkill()
    //      }
    //  }
    // const AddJobs = () =>
    // {
    //     navigate("/addjob");
    // }
    // const navigateTo= () =>
    // {
    //     AddTobs();
        
    // }
  
    
    
}
const navigateTo=()=>{
    // setData({
    //     companyName:'',
    //     companyAddress:'',
    //     companyContact:''
        
    

    // })
    // SetpreJobs(
    //     {
    //          jobProfile:'',
    //          jobVacancy: '',
    //          experience:'',
    //          publishDate:'',
    //          jobDescription:''

    //     }
    // )
    console.log("navigate to addjobs");
    navigate("/addjobs");
   }

    return(
        <div>
        <Base>
        <Container>
        <div>
            {/* <Button onClick={moveToResume} >view my jobs</Button> */}
            <Button color="danger" onClick={DeleteMyAccount}>Delete My Account</Button>
            {/* <Button onClick={AddJobs}>Delete My Account</Button> */}
            {/* <NavLink tag={ReactLink} to="/addjob">Login</NavLink> */}
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
                            // onChange={(e)=>SetcompanyName(e.target.value)}
                            value={data.companyName}
                            // value={companyName}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyAddress">Enter Address</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyAddress"
                            onChange={(e)=>handleChangeforCompany(e,'companyAddress')}
                            value={data.companyAddress}
                            // onChange={(e)=>SetcompanyAddress(e.target.value)}
                            // value={companyAddress}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyContact">Enter phone number</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyContact"
                            onChange={(e)=>handleChangeforCompany(e,'companyContact')}
                            value={data.companyContact}
                            // onChange={(e)=>SetcompanyContact(e.target.value)}
                            // value={companyContact}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="jobs">Enter job profile recquired</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="jobProfile"
                            onChange={(e)=>handleChangeforJobs(e,'jobProfile')}
                            value={prejobs.jobProfile}
                            // onChange={(e)=>SetJobProfile(e.target.value)}
                            // value={jobProfile}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="jobs">Enter vacancy recquired</Label>
                            <Input type="number" 
                            placeholder="Enter here"
                            id="jobVacancy"
                            onChange={(e)=>handleChangeforJobs(e,'vacancy')}
                            value={prejobs.vacancy}
                            // onChange={(e)=>SetJobVacancy(e.target.value)}
                            // value={jobVacancy}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="jobs">Enter Experience recquired</Label>
                            <Input type="number" 
                            placeholder="Enter here"
                            id="experience"
                             onChange={(e)=>handleChangeforJobs(e,'experience')}
                            // //    onChange={updateValues}
                            // //    onKeyPress={keyPressed}
                             value={prejobs.experience}
                            // onChange={(e)=>SetExperience(e.target.value)}
                            // value={experience}
                            ></Input>
                        </FormGroup>
                        
                        <FormGroup>
                                <Label for="exampleDate">
                                 Publish Date
                                </Label>
                                <Input
                                id="pub_date"
                                name="date"
                                placeholder="date placeholder"
                                type="date"
                                onChange={(e)=>handleChangeforJobs(e,'publishDate')}
                                value={prejobs.publishDate}
                                />
                            </FormGroup>

                        <FormGroup>
                            <Label for="job_description">Job Description</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="lastjob_descriptionName"
                            onChange={(e)=>handleChangeforJobs(e,'jobDescription')}
                            value={prejobs.jobDescription}
                            ></Input>
                        </FormGroup>

                        

                        <Container className="text-center">
                            <Button color="dark">Register</Button>
                            <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                        </Container>
                    </Form>
                    <Container className="text-center">
                            <Button onClick={ navigateTo } color="dark">Add more jobs</Button>
                            
                        </Container>
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