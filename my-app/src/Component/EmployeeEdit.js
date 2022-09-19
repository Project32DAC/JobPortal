import { useEffect, useState } from "react";
import { Container,Card,CardHeader,Form,FormGroup,CardBody,Col,Label,Input, Button,Row } from "reactstrap";
import Base from "./Base"
import { employeeedit, signup } from "../services/user-service";
import { toast } from "react-toastify";
import "./Style.css";
import "./Home.css";
import { doLogout, getCurrentUserDetail } from "../auth";
import {NavLink as ReactLink, useNavigate} from 'react-router-dom'; 
import { deleteEmployeeAccount } from "../services/user-service";
import { getCurrentUserid } from "../auth";
const EmployeeEdit = () =>
{
    const [skills,setSkills]= useState([])
    let navigate = useNavigate()
   const[data,setData] =useState({
    gender:'',
    sscMarks:'',
    hscMarks:'',
    degreeMarks:'',
    graduation:'',
    branch:'',
    experience:'',
    contact:'',
    // skills:setSkills//how to set this property as array of strings
    //add fruits
    skills:[]

   })
   const[values,setValues] = useState("")
   
   const[user, setUser] = useState(undefined)

   const[error,setError]=useState({
    errors:{},
    isError:false
   })
   

   useEffect(()=>{
    
    console.log(data)
    setUser(getCurrentUserDetail())
   },[data])
   
   // handle change
   const handleChange=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    
    console.log("name changed");
    console.log(event.target.value)

   }

   const updateSkill = () =>{
    //setSkills({...skills, event.target.value});
    console.log("skills changed");
    // console.log(event.target.value);
   
    //updateMyArray( arr => [...arr, `${arr.length}`]);
     setSkills(skills => [...skills, values])
    // this.setSkills({
    //     skills:arr
    // })
    //console.log(event.target.value);

    
   }


  
   const updateValues = ({ target }) => {
    
    setValues(target.value)
  }
  const keyPressed = ({ key }) => {
   
    if (key === "Enter") {
      updateSkill()
    }
  }
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
    setSkills(
        ''
    )
   }

   //submit form
   const submitForm=(event)=>{
    event.preventDefault()
    console.log("data object "+JSON.stringify(data));
    //data validate
    if(error.isError){
        toast.error("form data is invalid,correct all details then submit")
        return;
    }
    //call server api for sending data
    // data['userId'] = user.id
     let userid=user.id;
    // let skillsdone = skills;
    data['skills']=skills;
    employeeedit(data,userid).then((resp)=>{
        console.log(resp)
        console.log("success log");
        toast.success("update is succesfull!! with user id"+resp.id);
       
       
    }).catch((error)=>{
        console.log(error)
        console.log("error log");
        toast.error("operation failed");
        // handling errors 
        setError(
            {
                errors:error,
                isError:true
            }
        )
    })
   }
  
const moveToResume =()=>{
    navigate("/resume");
    
}
const logout=()=>{
    doLogout(()=>{
      //logged out
     
      navigate("/")
    })
  }
//deleting own account
const DeleteMyAccount= () =>
{
    deleteEmployeeAccount(getCurrentUserid()).then((resp)=>{
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
        <h1>Employee Page</h1>
        <div>
            <Button color="danger" onClick={moveToResume} >view my resume</Button>
            <Button onClick={DeleteMyAccount}>Delete My Account</Button>
        </div>
            
            <Row className="mt-4">

               
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
                                <option>Select Gender</option>
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
                         <FormGroup>
                            <Label for="skills">
                                        skills
                            </Label>
                                <Input
                                id="skills"
                                name="skills"
                                placeholder="Enter your skills"
                                type="text"
                                // onChange={(e)=>updateskill(e)}
                                //  value={skills}
                                onChange={updateValues}
                               onKeyPress={keyPressed}
                                />
                                <Button onClick={updateSkill} color="secondary" type="reset" className="ms-2">add more skill</Button>
                                <Label>{JSON.stringify(skills)}</Label>
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
