import { useEffect, useState } from "react";
import { Container,Card,CardHeader,Form,FormGroup,CardBody,Col,Label,Input, Button,Row } from "reactstrap";
import Base from "./Base"
import { signup } from "../services/user-service";
import { toast } from "react-toastify";
const Signup = () =>
{
   const[data,setData] =useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    role:'',


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
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    role:'',

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
    signup(data).then((resp)=>{
        console.log(resp)
        console.log("success log");
        toast.success("signup is succesfull!! with user id"+resp.userId);
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
                    Fill Information to register
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="firstname">First Name</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="firstName"
                            onChange={(e)=>handleChange(e,'firstName')}
                            value={data.fname}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="name">Last Name</Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="lastName"
                            onChange={(e)=>handleChange(e,'lastName')}
                            value={data.lname}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Enter Email</Label>
                            <Input type="email" 
                            placeholder="Enter here"
                            id="email"
                            onChange={(e)=>handleChange(e,'email')}
                            value={data.email}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Enter Password</Label>
                            <Input type="password" 
                            placeholder="Enter here"
                            id="password"
                            onChange={(e)=>handleChange(e,'password')}
                            value={data.password}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleSelect">Select Role</Label>
                            <Input type="select"
                            id="exampleSelect"
                            onChange={(e)=>handleChange(e,'role')}
                            value={data.role}
                            >
                                <option>choose role</option>
                                <option>ROLE_EMPLOYEE</option>
                                <option>ROLE_RECRUITER</option>
                            
                            </Input>
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
export default Signup;
