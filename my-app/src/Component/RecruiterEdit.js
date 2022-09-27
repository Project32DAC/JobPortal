
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
import "./RecruiterEdit.css"
import userEvent from "@testing-library/user-event";
import { getCurrentUserDetail } from "../auth";

const RecruiterEdit = () =>
{
    let navigate = useNavigate()
    let isSubmit = true;
    const[user, setUser] = useState("")
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


       const [formErrors, setFormErrors] = useState({});





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
   

   const validate = (values) => {
    const errors = {};
    const regex = /^[6-9]\d{9}$/gi;

    if (!values.companyName) {
        isSubmit=false;
      errors.companyName = "Company Name is required!";
    }
    
    if (!values.companyAddress) {
        isSubmit=false;
    errors.companyAddress = " Company Address is required!";
    }  
    if (!values.companyContact) {
        isSubmit=false;
      errors.companyContact = "Contact is required!";
    } else if (!regex.test(values.companyContact)) {
        isSubmit=false;
      errors.companyContact = "This is not a valid contact format!";
    }

    // if (!values.jobs.jobProfile) {
    // errors.jobProfile = " jobProfile is required!";
    // } 

    // var vacancy= values.jobs.jobVacancy
    // if (!values.jobs.jobVacancy) {
    // errors.jobVacancy = " jobVacancy is required!";
    // }else if (isNaN(values.jobs.jobVacancy) || values.jobs.jobVacancy > 0 ) {
    //     errors.jobVacancy = "This is not a valid format! Or Vacancy cant be zero";
    //   }  
    //   if (!values.jobs.experience) {
    //     errors.experience = " experience is required!! if not enter 0";
    //     } 
   
    return errors;
  };

//   const validate2 = (values) => {
//     const errors = {};

//     if (!values.jobProfile) {
//     errors.jobProfile = " jobProfile is required!";
//     } 

//     // var vacancy= values.jobs.jobVacancy
//     if (!values.jobVacancy) {
//     errors.jobVacancy = " jobVacancy is required!";
//     }else if (isNaN(values.jobVacancy) || values.jobVacancy > 0 ) {
//         errors.jobVacancy = "This is not a valid format! Or Vacancy cant be zero";
//       }  
//       if (!values.experience) {
//         errors.experience = " experience is required!! if not enter 0";
//         } 
   
//     return errors;
//   };

















    
//    }
   useEffect(
    ()=>
    {

       setUser(getCurrentUserDetail())
    },
    []
     )
   
   const editForm=async(event)=>{
    event.preventDefault()
    console.log(data)
    //data validation
    setFormErrors(validate(data))
    // setFormErrors(validate2(prejobs))
    
// const Obj={jobProfile,jobVacancy,experience};
        let arr = [];
        arr.push(prejobs);
//     const data = {companyName,companyAddress,companyContact,arr};
//     console.log(data);
    //data validate
   
    //call server api for sending data
    
    data['jobs']=arr;
    console.log(data);
    
    recruiteredit(data,getCurrentUserid(),isSubmit).then((resp)=>{
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

    return(
        <div>
            <Base>
                <div className="row">
                    <div className="recruiterleftside col-4">
                        <div>

                           
                            <div className="row rec-profile">
                                <div >
                                    <h4><b>Welcome  </b></h4>
                                    <h5><b>First Name:</b> {user.firstName}</h5>
                                    <h5><b>Last Name:</b> {user.lastName}</h5>
                                   
                                </div>
                                

                            </div>
                            
                            <div className="employee-button" style={{ display: 'flex', justifyContent: 'center' }} >
                              
                                <Button onClick={() => { navigate("/recruiter/addjobs") }} color="primary">Add More Jobs</Button>
                            </div>

                            <img className="resumeimg img-fluid rounded " src="../Images/rec3.gif" alt="recruiter" />

                        </div>
                    </div>
                    <div className="recruiterrightside col-8">
                        <div>
        <Container>
       
        
            <Row className="mt-4">

               
               <Col sm={{size: 6, offset: 3}}>
               <Card color="dark" outline>
                <CardHeader>
                    <b>Fill Information To Register</b>
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit= {editForm}>
                        <FormGroup>
                            <Label for="companyName"><b>Company Name</b></Label>
                            <Input type="text" 
                            placeholder="Enter Company Name"
                            id="companyName"
                            onChange={(e)=>handleChangeforCompany(e,'companyName')}
                            // onChange={(e)=>SetcompanyName(e.target.value)}
                            value={data.companyName}
                            // value={companyName}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.companyName}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyAddress"><b>Company Address</b></Label>
                            <Input type="text" 
                            placeholder="Enter Company Address"
                            id="companyAddress"
                            onChange={(e)=>handleChangeforCompany(e,'companyAddress')}
                            value={data.companyAddress}
                            // onChange={(e)=>SetcompanyAddress(e.target.value)}
                            // value={companyAddress}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.companyAddress}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyContact"><b>Phone Number</b></Label>
                            <Input type="text" 
                            placeholder="Enter Phone Number"
                            id="companyContact"
                            onChange={(e)=>handleChangeforCompany(e,'companyContact')}
                            value={data.companyContact}
                            // onChange={(e)=>SetcompanyContact(e.target.value)}
                            // value={companyContact}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.companyContact}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="jobs"><b>Job Profile</b></Label>
                            <Input type="text" 
                            placeholder="Enter Job Profile"
                            id="jobProfile"
                            required
                            onChange={(e)=>handleChangeforJobs(e,'jobProfile')}
                            value={prejobs.jobProfile}
                            // onChange={(e)=>SetJobProfile(e.target.value)}
                            // value={jobProfile}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.jobProfile}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="jobVacancy"><b>Vacancy</b></Label>
                            <Input type="number" 
                            placeholder="Enter Vacancy "
                            id="jobVacancy"
                            required
                            onChange={(e)=>handleChangeforJobs(e,'jobVacancy')}
                            value={prejobs.jobVacancy}
                            // onChange={(e)=>SetJobVacancy(e.target.value)}
                            // value={jobVacancy}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.jobVacancy}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="jobs"><b>Experience</b></Label>
                            <Input type="number" 
                            placeholder="Enter Experience "
                            id="experience"
                            required
                             onChange={(e)=>handleChangeforJobs(e,'experience')}
                            // //    onChange={updateValues}
                            // //    onKeyPress={keyPressed}
                             value={prejobs.experience}
                            // onChange={(e)=>SetExperience(e.target.value)}
                            // value={experience}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.experience}</p>
                        </FormGroup>
                        
                        <FormGroup>
                                <Label for="exampleDate">
                                <b>Publish Date</b>
                                </Label>
                                <Input
                                id="pub_date"
                                name="date"
                                required
                                placeholder="date placeholder"
                                type="date"
                                onChange={(e)=>handleChangeforJobs(e,'publishDate')}
                                value={prejobs.publishDate}
                                />
                            </FormGroup>

                        <FormGroup>
                            <Label for="job_description"><b>Job Description</b></Label>
                            <Input type="text" 
                            placeholder="Enter Job Description "
                            id="lastjob_descriptionName"
                            required
                            onChange={(e)=>handleChangeforJobs(e,'jobDescription')}
                            value={prejobs.jobDescription}
                            ></Input>
                        </FormGroup>

                        

                        <Container className="text-center">
                            <Button color="primary">Register</Button>
                            <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                        </Container>
                    </Form>
                    
                 </CardBody>
                 </Card>
               </Col> 
            </Row>
            
        </Container>
                        </div>
                    </div>
                </div>
        </Base>
        </div>
    );
};

export default RecruiterEdit;