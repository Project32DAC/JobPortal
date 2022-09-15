import { useEffect, useState } from "react";
import { Container,Card,CardHeader,Form,FormGroup,CardBody,Col,Label,Input, Button,Row } from "reactstrap";
import Base from "./Base"
import { signup } from "../services/user-service";
import { toast } from "react-toastify";
import "./Style.css";
import "./Home.css";
const EmployeeEdit = () =>
{
   const[data,setData] =useState({
    gender:'',
    sscMarks:'',
    hscMarks:'',
    degreeMarks:'',
    graduation:'',
    branch:'',
    experience:'',
    contact:'',


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
        gender:'',
        sscMarks:'',
        hscMarks:'',
        degreeMarks:'',
        graduation:'',
        branch:'',
        experience:'',
        contact:'',
    

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
    EmployeeEdit(data).then((resp)=>{
        console.log(resp)
        console.log("success log");
        toast.success("update is succesfull!! with user id"+resp.id);
        setData({
            gender:'',
            sscMarks:'',
            hscMarks:'',
            degreeMarks:'',
            graduation:'',
            branch:'',
            experience:'',
            contact:'',
        
            })
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

                {JSON.stringify(data)}
               <Col sm={{size: 6, offset: 3}}>
               <Card color="dark" outline>
                <CardHeader>
                    Fill Information to update
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="gender">Select Gender</Label>
                            <Input type="select"
                            id="gender"
                            onChange={(e)=>handleChange(e,'gender')}
                            value={data.gender}
                            >
                                <option>choose role</option>
                                <option>MALE</option>
                                <option>FEMALE</option>
                                <option>OTHER</option>
                            
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="sscMarks">
                                        SSC
                            </Label>
                                <Input
                                id="sscMarks"
                                name="number"
                                placeholder="Enter SSC Percentage"
                                type="number"
                                onChange={(e)=>handleChange(e,'sscMarks')}
                                value={data.sscMarks}
                                />
                         </FormGroup>
                         <FormGroup>
                            <Label for="hscMarks">
                                        HSC
                            </Label>
                                <Input
                                id="hscMarks"
                                name="number"
                                placeholder="Enter HSC Percentage"
                                type="number"
                                onChange={(e)=>handleChange(e,'hscMarks')}
                                value={data.hscMarks}
                                />
                         </FormGroup>
                         <FormGroup>
                            <Label for="degreeMarks">
                                        Degree 
                            </Label>
                                <Input
                                id="degreeMarks"
                                name="number"
                                placeholder="Enter Degree Percentage"
                                type="number"
                                onChange={(e)=>handleChange(e,'degreeMarks')}
                                value={data.degreeMarks}
                                />
                         </FormGroup>
                         <FormGroup>
                            <Label for="graduation">Graduation</Label>
                            <Input type="text" 
                            placeholder="Enter Degree Name"
                            id="graduation"
                            onChange={(e)=>handleChange(e,'graduation')}
                            value={data.graduation}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="branch">Branch</Label>
                            <Input type="text" 
                            placeholder="Enter Branch Name"
                            id="branch"
                            onChange={(e)=>handleChange(e,'branch')}
                            value={data.branch}
                            ></Input>
                        </FormGroup>
                        
                        
                        <FormGroup>
                            <Label for="experience">
                                        Experience
                            </Label>
                                <Input
                                id="experience"
                                name="number"
                                placeholder="Enter experience in months"
                                type="number"
                                onChange={(e)=>handleChange(e,'experience')}
                                value={data.experience}
                                />
                         </FormGroup>

                         <FormGroup>
                            <Label for="contact">
                                        Contact
                            </Label>
                                <Input
                                id="contact"
                                name="number"
                                placeholder="Enter contact number"
                                type="number"
                                onChange={(e)=>handleChange(e,'contact')}
                                value={data.contact}
                                />
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
    );
};
export default EmployeeEdit;
