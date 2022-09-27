import {  useState } from "react";
import { Container,Card,CardHeader,Form,FormGroup,CardBody,Col,Label,Input, Button,Row } from "reactstrap";
import Base from "./Base"
import { addJob } from "../services/user-service";
import { toast } from "react-toastify";
import { getCurrentUserid } from "../auth";
import "./AddJob.css";

const AddJob = () =>
{
    const [formErrors, setFormErrors] = useState({});

  


    let isSubmit = true;
   const[data,setData] =useState({
    jobProfile:'',
    jobVacancy:'',
    experience:'',
    publishDate:'',
    jobDescription:''


   })
  
   const validate = (values) => {
    
    const errors = {};
    

    if (!values.jobProfile) {
        isSubmit=false;
        errors.jobProfile = " Job Profile is required!";
    }
    
    if (!values.jobVacancy) {
        isSubmit=false;
        errors.jobVacancy = " Job Vacancy  is required!";
    }else if (isNaN(values.jobVacancy) || values.jobVacancy <= 1) {
        isSubmit=false;
        errors.jobVacancy = "Vacancies should be greater than zero";
      }
     
    if (!values.experience) {
        isSubmit=false;
    errors.experience = " Experience is required!";
    }else if (isNaN(values.experience) || values.experience <0) {
        isSubmit=false;
        errors.experience = "Experience should be greater than zero";
      }
      
    if (!values.publishDate) {
        isSubmit=false;
    errors.publishDate = " Publish Date is required!";
    }
    if (!values.jobDescription) {
        isSubmit=false;
    errors.jobDescription = " Job Description is required!";
    }  

   
   
    return errors;
  };
   
   
   
   // handle change
   const handleChange=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    console.log("name changed");
    console.log(event.target.value)
    

   }
   

   //resetting form
   const resetData=()=>{
    setData({
        jobProfile:'',
        jobVacancy:'',
        experience:'',
        publishDate:'',
        jobDescription:''
    
    
       })
   }

   //submit form
   const submitForm=(event)=>{
    event.preventDefault()
    console.log(data);
    //data validate
   
     
    setFormErrors(validate(data));
   
    let arr = [];
    arr.push(data)
   
    addJob(arr,getCurrentUserid(),isSubmit).then((resp)=>{
        console.log(resp)
        console.log("success log");
        toast.success("AddJob is succesfull!!");
    }).catch((error)=>{
        console.log(error)
        console.log("error log");
        toast.error("add job failed");
        // handling errors 
              
    })
   }
   




    return(
        <Base>
            <div className="addjob" style={{
                backgroundImage: "url(/Images/rec2.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
            }}>
                <br></br>
                <h1 class="addjobitalic">Add Jobs</h1>
               
          <div className="add-job"> 

                
               <Col sm={{size: 6, offset: 3}}>
               <Card color="dark" outline>
                <CardHeader>
                    <b>Fill Information To Add Job</b>
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="job_profile"><b>Job Profile</b></Label>
                            <Input type="text" 
                            placeholder="Enter Job Profile"
                            id="job_profile"
                            onChange={(e)=>handleChange(e,'jobProfile')}
                            value={data.jobProfile}
                            ></Input>
                             <p style={{color: "red"}}>{formErrors.jobProfile}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="vacancies">
                            <b>Vacancies</b>
                            </Label>
                                <Input
                                id="vacancies"
                                name="number"
                                placeholder="Enter Vacancies"
                                type="number"
                                onChange={(e)=>handleChange(e,'jobVacancy')}
                                value={data.jobVacancy}
                                // required
                                />
                                 <p style={{color: "red"}}>{formErrors.jobVacancy}</p>
                         </FormGroup>

                         <FormGroup>
                            <Label for="experience">
                            <b>Experience</b>
                            </Label>
                                <Input
                                id="experience"
                                name="number"
                                placeholder="Enter Experience in Years"
                                type="number"
                                onChange={(e)=>handleChange(e,'experience')}
                                value={data.experience}
                                // required
                                />
                                 <p style={{color: "red"}}>{formErrors.experience}</p>
                         </FormGroup>

                         <FormGroup>
                                <Label for="exampleDate">
                                <b> Publish Date</b>
                                </Label>
                                <Input
                                id="pub_date"
                                name="date"
                                placeholder="date placeholder"
                                type="date"
                                onChange={(e)=>handleChange(e,'publishDate')}
                                value={data.publishDate}
                                />
                                 <p style={{color: "red"}}>{formErrors.publishDate}</p>
                            </FormGroup>

                        <FormGroup>
                            <Label for="job_description"><b>Job Description</b></Label>
                            <Input type="text" 
                            placeholder="Enter Job Description"
                            id="lastjob_descriptionName"
                            onChange={(e)=>handleChange(e,'jobDescription')}
                            value={data.jobDescription}
                            ></Input>
                             <p style={{color: "red"}}>{formErrors.jobDescription}</p>
                        </FormGroup>
                        <Container className="text-center">
                            <Button color="primary">Add Job</Button>
                            <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                           
                        </Container>
                    </Form>
                 </CardBody>
                 </Card>
               </Col> 
                    </div>
               
            </div>


        </Base>
    );
};
export default AddJob;
