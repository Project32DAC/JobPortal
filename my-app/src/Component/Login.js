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
import { doLogin } from "../auth";
import { myAxios } from "../services/helper";
import { loginUser } from "../services/user-service";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () =>
{
const [loginDetail,setLoginDetail]= useState({
        email:'',
        password:''
    })
const navigate = useNavigate ()
const handleChange=(event,field)=>
{
    let actualValue=event.target.value
    setLoginDetail({
        ...loginDetail,
        [field]:actualValue
})
}
const handleFormSubmit=(event)=>{
    event.preventDefault();
    console.log(loginDetail);
    if(
    loginDetail.email.toString().trim() == "" ||
    loginDetail.password.toString().trim() == ""
    )
    {
        toast.error("username or password is required")
        return; 
    }
  // submit data to generate jwt token
    loginUser(loginDetail).then((data)=>{
        console.log("user login"+JSON.stringify(data));
        doLogin(data,()=>{
            console.log("login detail is saved to localstorage");
            //redirect to something according to role based
            navigate("/user/RecruiterUpdate")
        })
        toast.success("login success");
        //pending

    }).catch(error=>
        {
            console.log(error)
            if(error.response.status==400 || error.response.status==404)
            {
                toast.error(error.response.data.message)
            }
            else{
            toast.error("something went wrong !!!");
            }
        })
    
    

};

    return(
        <Base>
         
            {/* <Button>This is login</Button> */}
            <Container>
                <Row className="mt-4">
                    <Col sm={
                        {
                            size:6,
                            offset:3,
                        }

                    }>
                        <Card>
                            <CardHeader>
                                <h3>Login Here !!</h3>
                            </CardHeader>
                            <CardBody>

                                <Form onSubmit={handleFormSubmit}>
                                    {/*Email */}
                                    <FormGroup>
                                        <Label form="email">
                                            Enter Email
                                        </Label>
                                        <Input 
                                          type="text" 
                                          id="email"
                                          value={loginDetail.email}
                                          onChange={(e)=> handleChange(e,'email')}
                                          />
                                    </FormGroup>
                                    {/*Password */}
                                    <FormGroup>
                                        <Label form="PassWord">
                                            Enter Password
                                        </Label>
                                        <Input 
                                          type="text" 
                                          id="Password"
                                          placeholder=""
                                          value={loginDetail.password}
                                          onChange={(e)=> handleChange(e,'password')}
                                          />
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button color="primary" outline >
                                            Login
                                        </Button>
                                    </Container>
                                </Form>
                                {/*signup is pending redirect*/}
                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            </Container>

        </Base>

    );
};
export default Login;