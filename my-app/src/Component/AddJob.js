import {  useState } from "react";
import { Container,Card,CardHeader,Form,FormGroup,CardBody,Col,Label,Input, Button,Row } from "reactstrap";
import Base from "./Base"
import { addJob } from "../services/user-service";
import { toast } from "react-toastify";
const AddJob = () =>
{
   const[data,setData] =useState({
    job_profile:'',
    vacancies:'',
    experience:'',
    pub_date:'',
    job_description:'',


   })

   const[error,setError]=useState({
    errors:{},
    isError:false
   })

//    useEffect(()=>{
//     console.log(data)
//    },[data])
   
   // handle change
   const handleChange=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    console.log("name changed");
    console.log(event.target.value)

   }
//    const prehandleChange=(event,property)=>
//    {
//     event.target.value.firstName;
//     console.log
//    }

   //resetting form
   const resetData=()=>{
    setData({
    job_profile:'',
    vacancies:'',
    experience:'',
    pub_date:'',
    job_description:'',

    })
   }

   //submit form
   const submitForm=(event)=>{
    event.preventDefault()
    console.log(data);
    //data validate
    if(error.isError){
        toast.error("form data is invalid,correct all details then submit")
        return;
    }
    //call server api for sending data
    addJob(data,recruId).then((resp)=>{
        console.log(resp)
        console.log("success log");
        toast.success("AddJob is succesfull!!");
    }).catch((error)=>{
        console.log(error)
        console.log("error log");
        toast.error("signup failed");
        // handling errors 
        setError(
            {
                errors:error,
                isError:true
            }
        )
    })
   }





    return(
        <Base>
        <Container>
            <Row className="mt-4">

                {/* {JSON.stringify(data)} */}
               <Col sm={{size: 6, offset: 3}}>
               <Card color="dark" outline>
                <CardHeader>
                    Fill Information to add job
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="job_profile">Job Profile</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="job_profile"
                            onChange={(e)=>handleChange(e,'job_profile')}
                            value={data.job_profile}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="vacancies">
                            Vacancies
                            </Label>
                                <Input
                                id="vacancies"
                                name="number"
                                placeholder="Enter Vacancies"
                                type="number"
                                onChange={(e)=>handleChange(e,'vacancies')}
                                value={data.vacancies}
                                />
                         </FormGroup>

                         <FormGroup>
                            <Label for="experience">
                            Experience
                            </Label>
                                <Input
                                id="experience"
                                name="number"
                                placeholder="Enter Experience in Months"
                                type="number"
                                onChange={(e)=>handleChange(e,'experience')}
                                value={data.experience}
                                />
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
                                onChange={(e)=>handleChange(e,'pub_date')}
                                value={data.pub_date}
                                />
                            </FormGroup>

                        <FormGroup>
                            <Label for="job_description">Job Description</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="lastjob_descriptionName"
                            onChange={(e)=>handleChange(e,'job_description')}
                            value={data.job_description}
                            ></Input>
                        </FormGroup>
                        <Container className="text-center">
                            <Button color="dark">Add Job</Button>
                            <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                        </Container>
                    </Form>
                 </CardBody>
                 </Card>
               </Col> 
            </Row>
            
        </Container>
        </Base>
    );
};
export default AddJob;
