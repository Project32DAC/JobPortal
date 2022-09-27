import {  useState ,useEffect} from "react";
import { Container,Card,CardHeader,Form,FormGroup,CardBody,Col,Label,Input, Button,Row } from "reactstrap";
import Base from "./Base"
import { signup } from "../services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Signup.css"

const Signup = () =>
{
    const navigate = useNavigate ();
    let isSubmit = true;
   const[data,setData] =useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    role:'',


   })

   const [formErrors, setFormErrors] = useState({});
   
  
   const[error,setError]=useState({
    errors:{},
    isError:false
   })


   const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      isSubmit=false;
      errors.firstName = "First Name is required!";
     
    }
    if (!values.lastName) {
      isSubmit=false;
        errors.lastName = "Last Name is required!";
       
      }
    if (!values.email) {
      isSubmit=false;
      errors.email = "Email is required!";
      
    } else if (!regex.test(values.email)) {
      isSubmit=false;
      errors.email = "This is not a valid email format!";
      
    }
    if (!values.password) {
      isSubmit=false;
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      isSubmit=false;
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      isSubmit=false;
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.role) {
      isSubmit=false;
        errors.role = "Role is required!";
      }
    return errors;
  };

   useEffect(()=>{
    console.log(data)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(data);
    }
   },[formErrors])
   
   // handle change
   const handleChange=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    console.log("name changed");
    console.log(event.target.value)

   }


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
   const submitForm=async(event)=>{
    event.preventDefault()
    console.log(data);
    
    setFormErrors(validate(data));
    
    if(!isSubmit)
    {
      toast.error("correct all fields and then submit")
    }

    signup(data,isSubmit).then((resp)=>{
        console.log(resp)
        console.log("success log");
        toast.success("signup is succesfull!!");
        navigate("/login")
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
      <div>
        <Base>
          <div className="row ">
            
            <div className="signinleftside col-5">
              <div>
                <h1 ><b>Buckle up, it's going to be a very interesting journey</b> </h1>
                <img className="loginimg img-fluid rounded " src="./Images/signin1.gif" alt="signin" />

              </div>
            </div>

            <div className="signinrightside col-7">
              <div>
        <Container>
            <Row className="mt-4">

                {/* {JSON.stringify(data)} */}
               <Col sm={{size: 7, offset: 2}}>
               <Card color="dark" outline>
                <CardHeader>
                          <h3>Fill Information to register</h3>
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="firstname">First Name</Label>
                            <Input type="text" 
                           
                            placeholder="Enter First Name"
                            id="firstName"
                            onChange={(e)=>handleChange(e,'firstName')}
                            value={data.firstName}
                            ></Input>
                             <p style={{color: "red"}}>{formErrors.firstName}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="name">Last Name</Label>
                            <Input type="text" 
                            placeholder="Enter Last Name"
                            id="lastName"
                            onChange={(e)=>handleChange(e,'lastName')}
                            value={data.lastName}
                            ></Input>
                            <p style={{color: "red"}} >{formErrors.lastName}</p>
                            
                        </FormGroup>

                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" 
                            placeholder="Enter Email Here"
                            id="email"
                            onChange={(e)=>handleChange(e,'email')}
                            value={data.email}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.email}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" 
                            placeholder="Enter Password here"
                            id="password"
                            onChange={(e)=>handleChange(e,'password')}
                            value={data.password}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.password}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleSelect">Select Role</Label>
                            <Input type="select"
                            id="exampleSelect"
                            onChange={(e)=>handleChange(e,'role')}
                            value={data.role}
                            >
                                <option>choose role</option>
                                <option value= "ROLE_EMPLOYEE">EMPLOYEE</option>
                                <option value="ROLE_RECRUITER">RECRUITER</option>
                            
                            </Input>
                            <p style={{color: "red"}}>{formErrors.role}</p>

                        </FormGroup>

                            <Container className="text-center mt-5">
                            <Button color="dark">Register</Button>
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
export default Signup;
