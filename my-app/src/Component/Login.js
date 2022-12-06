import React, { useState } from "react";
import {
    Button, Container,
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
import { NavLink as ReactLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Base from "./Base";
import { doLogin } from "../auth";
import { myAxios } from "../services/helper";
import { exam, loginUser } from "../services/user-service";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'reactstrap';
import { roleByLoggedin } from "../auth";
import { useEffect } from "react";
import "./Login.css"
const Login = () => {
    const [loginDetail, setLoginDetail] = useState({
        email: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState({});
    let isSubmit = true;
    const navigate = useNavigate()
    const[some,setSome]=useState(
        
            {
                "b_email": "YXR0YXJhbWFuOTFAZ21haWwuY29t",
            "b_name": "Attar Aman Touficalii",
            "b_reg_no": "220340120033",
            "email": "attaraman91@gmail.com",
            "name": "Attar Aman Touficalii",
            "personal_code": "KAFKA",
            "reg_no": "220340120033"
            }
        
    );
    const handleChange = (event, field) => {
        let actualValue = event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]: actualValue
        })
    }
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            isSubmit=false;
            errors.email = "email is required";
        }
        else if (!regex.test(values.email)) {
            isSubmit=false;
            errors.email = "invalid email format... (example@gmail.com)";
        }
        if (!values.password) {
            isSubmit=false;
            errors.password = "password is required";
        }
        else if (values.password.length < 4) {
            isSubmit=false;
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            isSubmit=false;
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;


    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(loginDetail,isSubmit);
        if (
            loginDetail.email.toString().trim() == "" ||
            loginDetail.password.toString().trim() == ""
        ) {
            toast.error("username or password is required")
            return;
        }
        setFormErrors(validate(loginDetail))
        
        // submit data to generate jwt token
        loginUser(loginDetail,isSubmit).then((data) => {
            console.log("user login" + JSON.stringify(data));
            doLogin(data, () => {
                console.log("login detail is saved to storage");
                //redirect to something according to role based
                if (roleByLoggedin() === "admin") { navigate("/admin/home") }
                else if (roleByLoggedin() === "employee") {
                    navigate("/employee/home")
                }
                else {
                    navigate("/recruiter/home")
                }
            })
            toast.success("login success");
            //pending

        }).catch(errors => {
            console.log(errors)
            if (errors.response.status == 400 || errors.response.status == 404) {
                toast.error(errors.response.data.message)
            }
            if(errors.message==="Network Error")
            {
                toast.error("backend not running");
            }
            else {
                toast.error("Bad Credentials !!!");
            }
        })





    };
   






    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(loginDetail);
        }
    })

    return (

        <div>
                <Base>
                    <div className="row">
                        <div className="loginleftside col-5">
                            <div>
                                <h1><b>WELCOME BACK</b> </h1>
                                <img className="loginimg img-fluid rounded " src="./Images/login.gif" alt="login" />
                            </div>
                        </div>

                    <div className="loginrightside col-7">
                        <div>
            <Container>
                <Row className="mt-4">
                    <Col sm={
                        {
                            size: 8,
                            offset: 2,
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
                                             Email
                                        </Label>
                                        <Input
                                           
                                            type="text"
                                            id="email"
                                            placeholder="Enter Email"
                                            value={loginDetail.email}
                                            onChange={(e) => handleChange(e, 'email')}
                                        />
                                        <p style={{ color: "red" }}>{formErrors.email}</p>
                                    </FormGroup>
                                    {/*Password */}
                                    <FormGroup>
                                        <Label form="Password">
                                            Password
                                        </Label>
                                        <Input
                                            type="password"
                                            id="Password"
                                            placeholder=" Enter Password"
                                            value={loginDetail.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                        />
                                        <p style={{ color: "red" }}>{formErrors.password}</p>
                                    </FormGroup>
                                     <Container className="text-center mt-5">
                                        <Button color="primary"  style={{width:"19rem" }} >
                                            Login
                                        </Button>
                                       <br></br>

                                        Dont have an account?<br /> <Button color="primary" onClick={() => { navigate("/Signup") }} style={{width:"19rem" }} >Signup
                                        </Button>
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
export default Login;