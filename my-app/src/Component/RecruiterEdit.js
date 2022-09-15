
import React, { useState } from "react";
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

const RecruiterEdit = () =>
{
    const[data,setData] =useState({
        companyName:'',
        companyAddress:'',
        companyContact:'',
        jobs:''
    
       })
       // handle change
   const handleChange=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    console.log("name changed");
    console.log(event.target.value)

   }
   const resetData=()=>{
    setData({
        companyName:'',
        companyAddress:'',
        companyContact:'',
        jobs:''
    

    })

    
   }
   const submitForm=(event)=>{
    event.preventDefault()
    console.log(data);
    //data validate
    // if(error.isError){
    //     toast.error("form data is invalid,correct all details then submit")
    //     return;
    // }
    RecruiterEdit.then((resp)=>{
        console.log(resp)
        console.log("success log");
        toast.success("signup is succesfull!! with user id"+resp.id);
    }).catch((error)=>{
        console.log(error)
        console.log("error log");
        toast.error("signup failed");
        // handling errors 
        
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
                    Fill Information to register
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit= {submitForm}>
                        <FormGroup>
                            <Label for="companyName">Enter company name</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyName"
                            onChange={(e)=>handleChange(e,'companyName')}
                            value={data.companyName}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyAddress">Enter Address</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyAddress"
                            onChange={(e)=>handleChange(e,'companyAddress')}
                            value={data.companyAddress}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyContact">Enter phone number</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyContact"
                            onChange={(e)=>handleChange(e,'companyContact')}
                            value={data.companyContact}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="jobs">Enter jobs recquired</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="text"
                            onChange={(e)=>handleChange(e,'jobs')}
                            value={data.jobs}
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
    );
};

export default RecruiterEdit;