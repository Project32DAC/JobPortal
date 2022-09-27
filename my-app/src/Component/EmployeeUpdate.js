import { useEffect, useState } from "react";
import { Container, Card, CardHeader, Form, FormGroup, CardBody, Col, Label, Input, Button, Row } from "reactstrap";
import Base from "./Base"

import { toast } from "react-toastify";
import "./Style.css";
import "./Home.css";
import { viewEmplAlldetails } from "../services/user-service";
import { NavLink, useNavigate } from 'react-router-dom';
import { getResumeInfo } from "../services/user-service";
import { getCurrentUserid } from "../auth";
import { deleteEmployeeAccount } from "../services/user-service";
import { putEmployee } from "../services/user-service";
import "./EmployeeUpdate.css"
import { doLogout } from "../auth";

const EmployeeUpdate = () => {

    let navigate = useNavigate()

    

    //    const[user, setUser] = useState(undefined)
 
    const [formErrors, setFormErrors] = useState({})
    let isSubmit=true;
   

    const [details, setDetails] = useState(
        {
            firstName: "",
            lastName: "",
            sscMarks: "",
            hscMarks: "",
            degreeMarks: "",
            graduation: "",
            branch: "",
            contact: ""
 
        })
        const validate = (values) => {
            const errors = {};
            const regexs = /^[6-9]\d{9}$/gi;
        
            if (!values.firstName) {
              isSubmit=false;
              errors.firstName = "first name is required!";
            }
            if (!values.lastName) {
                isSubmit=false;
                errors.lastName = "last name is required!";
              }
            var ssc=values.sscMarks
            if (!values.sscMarks) {
                errors.sscMarks = " SSC marks is required!";
                isSubmit=false;
            }else if (isNaN(ssc) || ssc < 0 || ssc >= 100) {
              isSubmit=false;
                errors.sscMarks = "marks should be between 0 to 100!";
              }
              var hsc=values.hscMarks
            if (!values.hscMarks) {
              isSubmit=false;
            errors.hscMarks = " HSC marks is required!";
            }else if (isNaN(hsc) || hsc < 0 || hsc >= 100) {
              isSubmit=false;
                errors.hscMarks = "marks should be between 0 to 100!";
              }
              var degree=values.degreeMarks
            if (!values.degreeMarks) {
              isSubmit=false;
            errors.degreeMarks = " marks should be between 0 to 100!";
            }else if (isNaN(degree) || degree < 0 || degree >= 100) {
              isSubmit=false;
                errors.degreeMarks = "marks should be between 0 to 100!";
              }
            if (!values.graduation) {
              isSubmit=false;
            errors.graduation = " Graduation field cannot be empty!";
            }  
        
            if (!values.branch) {
              isSubmit=false;
            errors.branch = " Branch field cannot be empty!";
            }  
              
        
            if (!values.contact) {
              isSubmit=false;
              errors.contact = "Contact field cannot be empty!";
            } else if (!regexs.test(values.contact)) {
              isSubmit=false;
              errors.contact = "This is not a valid contact format!";
            }
           
            return errors;
          };
        
    const init = () => {
        let id = getCurrentUserid();
        viewEmplAlldetails(id).then((data) => {
            setDetails(data);
            console.log(data);



        }).catch(error => {
            console.log(error)
        })
    }
    useEffect(() => {


        // setUser(getCurrentUserDetail())
        init();
    }, [])
    
    
    



    // handle change
    const handleChange = (event, property) => {

        setDetails({ ...details, [property]: event.target.value })


        console.log("name changed");
        console.log(event.target.value)

    }


    const resetData = () => {
        setDetails({
            
            firstName: "",
            lastName: "",
            sscMarks: "",
            hscMarks: "",
            degreeMarks: "",
            graduation: "",
            branch: "",
            contact: ""



        })

    }
  

    const updateEmp=()=>{
        const id=getCurrentUserid();
        putEmployee(details,id,isSubmit).then((resp)=>{
            console.log(resp)
            console.log("success log");
            toast.success("updated successfully");
          
        }).catch((error)=>{
            console.log("error log");
            console.log(error)
            
            toast.error("operation failed");
            // handling errors 
            
        })}



    //    submit form
    const submitForm = (event) => {
        event.preventDefault();
        console.log("data object " + JSON.stringify(details));


        //data validation
        setFormErrors(validate(details));
        

        //data validate
            if(isSubmit)
            {
            updateEmp();
            }
            else
            {
                toast.error("check all fields and then submit");
            }
           
      
       

        
 

    }
    

    const logout=()=>{
        doLogout(()=>{
          //logged out
         
          navigate("/")
        })
    }
    const DeleteMyAccount= () =>
    {
        deleteEmployeeAccount(getCurrentUserid()).then((resp)=>{
            console.log(resp)
            console.log("success log");
            toast.success("account deleted");
            logout();
          
        }).catch((error)=>{
            console.log("error log");
            console.log(error)
            
            toast.error("operation failed");
            // handling errors 
            
        })
        
        
        
    }






    return (
        <div>
            <Base>
                <div className="row">
                    <div className="empleftside col-4">
                        <div>
                            <h1 className='updatepage'>Employee Update</h1>
                            <Button color="danger" className="buttonjsp" onClick={DeleteMyAccount}>Delete My Account</Button>
                            <img className="updateimg img-fluid rounded " style={{ marginleft: "2 rem" }} src="../Images/empUpdate.gif" alt="resume" />
                        </div>
                    </div>
                    <div className="emprightside col-8">
                    <Row className="mt-4">
                        <div className="empupdate">
                        <Col sm={{size: 7, offset: 3}}>
                            <Card color="dark" outline >
                                <CardHeader>
                                    <b>Fill Information to update</b>
                                </CardHeader>
                                <CardBody>
                                    {/*creating form*/}

                                    <Form onSubmit={submitForm} >
                                        <FormGroup>
                                            <Label for="firstname"><b>First Name</b></Label>
                                            <Input type="text"

                                                placeholder="Enter First Name"
                                                id="firstName"
                                                onChange={(e) => handleChange(e, 'firstName')}
                                                value={details.firstName}
                                            ></Input>
                                            <p style={{ color: "red" }}>{formErrors.firstName}</p>
                                        </FormGroup>
                                        <FormGroup>

                                            <Label for="name"><b>Last Name</b></Label>
                                            <Input

                                                type="text"
                                                placeholder="Enter Last Name"
                                                id="lastName"
                                                onChange={(e) => handleChange(e, 'lastName')}
                                                value={details.lastName}
                                            ></Input>
                                            <p style={{ color: "red" }} >{formErrors.lastName}</p>

                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="sscMarks">
                                                <b>SSC</b>
                                            </Label>
                                            <Input

                                                id="sscMarks"
                                                name="number"
                                                placeholder="Enter SSC Percentage"
                                                type="number"

                                                onChange={(e) => handleChange(e, 'sscMarks')}
                                                value={details.sscMarks}

                                            />
                                            <p style={{ color: "red" }}>{formErrors.sscMarks}</p>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="hscMarks">
                                                <b>HSC</b>
                                            </Label>
                                            <Input

                                                id="hscMarks"
                                                name="number"
                                                placeholder="Enter HSC Percentage"
                                                type="number"
                                          
                                                onChange={(e) => handleChange(e, 'hscMarks')}
                                                value={details.hscMarks}
                                            />
                                            <p style={{ color: "red" }}>{formErrors.hscMarks}</p>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="degreeMarks">
                                                <b>Degree</b>
                                            </Label>
                                            <Input

                                                id="degreeMarks"
                                                name="number"
                                                placeholder="Enter Degree Percentage"
                                                type="number"
                                               
                                                onChange={(e) => handleChange(e, 'degreeMarks')}
                                                value={details.degreeMarks}
                                            />
                                            <p style={{ color: "red" }}>{formErrors.degreeMarks}</p>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="graduation"><b>Graduation</b></Label>
                                            <Input
                                                type="text"
                                                placeholder="Enter Degree Name"
                                                id="graduation"
                                                
                                                onChange={(e) => handleChange(e, 'graduation')}
                                                value={details.graduation}
                                            ></Input>
                                            <p style={{ color: "red" }}>{formErrors.graduation}</p>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="branch"><b>Branch</b></Label>
                                            <Input

                                                type="text"
                                                placeholder="Enter Branch Name"
                                                id="branch"
                                            
                                                onChange={(e) => handleChange(e, 'branch')}
                                                value={details.branch}
                                            ></Input>
                                            <p style={{ color: "red" }}>{formErrors.branch}</p>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="contact">
                                                <b>Contact</b>
                                            </Label>
                                            <Input
                                                id="contact"
                                                value={details.contact}
                                                name="number"
                                                placeholder="Enter contact number"
                                                type="number"
                                                onChange={(e) => handleChange(e, 'contact')}
                                            

                                            />
                                            <p style={{ color: "red" }}>{formErrors.contact}</p>
                                        </FormGroup>



                                        <Container className="text-center">
                                            <Button color="primary">Update</Button>
                                            <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>
                                            <br></br>
                                            <br></br>
                                            <Button onClick={() => { navigate("/employee/updateSkill") }} color="primary"  >Update Skill and Experience </Button> {/*style={{ float: 'right',marginRight:'23%' }}*/}
                                        </Container>
                                    </Form>


                                </CardBody>
                            </Card>
                            </Col>
                        </div>

                        </Row>
                    </div>
                </div>    
                
            </Base>

        </div>
    );
};
export default EmployeeUpdate;
