import { useEffect, useState } from "react";
import { Container,Card,CardHeader,Form,FormGroup,CardBody,Col,Label,Input, Button,Row, Toast } from "reactstrap";
import Base from "./Base"
import { employeeedit, uploadImageforemp } from "../services/user-service";
import { toast } from "react-toastify";
import "./Style.css";
import "./Home.css";
import { doLogout, getCurrentUserDetail } from "../auth";
import {NavLink , useNavigate} from 'react-router-dom'; 
import { deleteEmployeeAccount } from "../services/user-service";
import { getCurrentUserid } from "../auth";
import { privateAxios } from "../services/helper";
import "./EmployeeEdit.css"


const EmployeeEdit = () =>
{
    const [skills,setSkills]= useState([])
    let navigate = useNavigate();
    let isSubmit=true;
   const[data,setData] =useState({
    gender:'',
    sscMarks:'',
    hscMarks:'',
    degreeMarks:'',
    graduation:'',
    branch:'',
    experience:'',
    contact:'',
    skills:[]

   })
   const[values,setValues] = useState("")
 
   const[user, setUser] = useState({})

   const [formErrors, setFormErrors] = useState({});

   

   const[error,setError]=useState({
    errors:{},
    isError:false
   })
   
   const validate = (values) => {
    const errors = {};
    const regex = /^[6-9]\d{9}$/gi;

    if (!values.gender) {
      isSubmit=false;
      errors.gender = "Gender is required!";
    }
    var ssc=values.sscMarks
    if (!values.sscMarks) {
        errors.sscMarks = " SSC Marks is required!";
        isSubmit=false;
    }else if (isNaN(ssc) || ssc < 0 || ssc >= 100) {
      isSubmit=false;
        errors.sscMarks = "Marks should be between 0 to 100!";
      }
      var hsc=values.hscMarks
    if (!values.hscMarks) {
      isSubmit=false;
    errors.hscMarks = " HSC Marks is required!";
    }else if (isNaN(hsc) || hsc < 0 || hsc >= 100) {
      isSubmit=false;
        errors.hscMarks = "Marks  should be between 0 to 100!";
      }
      var degree=values.degreeMarks
    if (!values.degreeMarks) {
      isSubmit=false;
    errors.degreeMarks = " Marks  should be between 0 to 100!";
    }else if (isNaN(degree) || degree < 0 || degree >= 100) {
      isSubmit=false;
        errors.degreeMarks = "Marks should be between 0 to 100!";
      }
    if (!values.graduation) {
      isSubmit=false;
    errors.graduation = " Graduation field cannot be empty!";
    }  

    if (!values.branch) {
      isSubmit=false;
    errors.branch = " Branch field cannot be empty!";
    }  
    if (!values.experience) {
      isSubmit=false;
    errors.experience = "experience field cannot be empty!";
    }  else if (isNaN(values.experience) || values.experience < 0) {
      isSubmit=false;
        errors.experience = "experience cannot be negative";
      }

    if (!values.contact) {
      isSubmit=false;
      errors.contact = "Contact field cannot be empty!";
    } else if (!regex.test(values.contact)) {
      isSubmit=false;
      errors.contact = "This is not a valid contact format!";
    }
   
    return errors;
  };

 

  
   
   // handle change
   const handleChange=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    
    console.log("name changed");
    console.log(event.target.value)

   }

   const updateSkill = () =>{
    //setSkills({...skills, event.target.value});
    console.log("skills changed");
    toast.success("skills added "+values);
     setSkills(skills => [...skills, values])
    

    
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
   //sending image
   const [selectedFile, setSelectedFile] = useState(null);
   //handle request through axios
   const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await privateAxios({
        method: "post",
        url: `/employee/setImage/${getCurrentUserid()}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      
    } catch(error) {
      console.log(error)
      toast.error("something went wrong check file size and file format(jpeg,jpg,png)");
    }
    toast.success("image uploaded successfully");
  }

   const handleFileSelect = (event) => {
     setSelectedFile(event.target.files[0])
   }
 

    


   //submit form
   const submitForm=(event)=>{
    event.preventDefault()
   


    
    //data validation
    setFormErrors(validate(data));


    //data validate
    
    //call server api for sending data
    // data['userId'] = user.id
     
    // let skillsdone = skills;
    data['skills']=skills;
    if(!isSubmit)
    {
      toast.error("correct all fields and then submit")
    }
    employeeedit(data,getCurrentUserid(),isSubmit).
    then((resp)=>{
       
        toast.success(" succesfull!! also upload image if uploaded ignore");
       
       
    }).catch((error)=>{
        
        
        // handling errors 
        if(error.response.status==500)
        {
          toast.error("form is aleardy filled if you want to update details go to update your details in home page")
          resetData();
        }
        else
        {
          toast.error("operation failed");
        }
        setError(
            {
                errors:error,
                isError:true
            }
        )
        
    })
   
   }
  

const logout=()=>{
    doLogout(()=>{
      //logged out
     
      navigate("/")
    })
   
  }
  useEffect(()=>{
    
      
    setUser(getCurrentUserDetail())
   
   },[])





    return(
      <div>
        <Base>

          <div className="row ">
            <div className=" employeerleftside newclass col-4">
              <div>

              
                <div className="row employeeprofile">
                  <div className="col-7">
                    <h4><b>Welcome</b></h4>
                    <h5><b>First Name:</b>{user.firstName}</h5>
                    <h5><b>Last Name:</b>{user.lastName}</h5>
                   
                   
                  </div>
                  <div className="col-5">
                   
                  </div>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>


                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="image">
                       <h4><b style={{ justifyContent: 'center',margin: '4rem' }}>Upload Your Id Size Photo</b></h4> 
                      </Label>
                      <Input
                        id="upload image"
                        name="image"
                        placeholder="upload id size photo under 1mb" //1048576 max size 
                        type="file"
                        required
                        onChange={handleFileSelect}
                      />
                    </FormGroup>
                    <Container className="text-center mt-1">
                      
                      <Button style={{ width: '400px' }} color="dark">upload image</Button>
                    </Container>
                  </Form>
                </div>
                <br></br>
                <div className="employee-button " style={{ display: 'flex', justifyContent: 'right',}} >
                
                 
                </div>
                <img className="resumeimg img-fluid rounded " src="../Images/resume.gif" alt="resume" />
                  
              </div>
             
            </div>

            

            <div className="employeerightside col-8">
              <div>


                <Container>

            <Row className="mt-4">

               
               <Col sm={{size: 6, offset: 3}}>
               <Card color="dark" outline>
                <CardHeader>
                  <h3>  <b><lable className="Fillinfo"> &nbsp; &nbsp; &nbsp; &nbsp; Fill up the Information </lable></b> </h3>
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit={submitForm} >
                        <FormGroup>
                            <Label for="gender"><b>Select Gender</b></Label>
                            <Input type="select"
                            id="gender"
                            required
                            onChange={(e)=>handleChange(e,'gender')}
                            value={data.gender}
                            >
                                <option>Select Gender</option>
                                <option>MALE</option>
                                <option>FEMALE</option>
                                <option>OTHER</option>
                            
                            </Input>
                            <p style={{color: "red"}}>{formErrors.gender}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="sscMarks">
                            <b>   SSC </b>
                            </Label>
                                <Input
                                id="sscMarks"
                                name="number"
                                placeholder="Enter SSC Percentage"
                                type="number"
                                required
                                onChange={(e)=>handleChange(e,'sscMarks')}
                                value={data.sscMarks}
                                />
                                <p style={{color: "red"}}>{formErrors.sscMarks}</p>
                         </FormGroup>
                         <FormGroup>
                            <Label for="hscMarks">
                            <b>    HSC </b>
                            </Label>
                                <Input
                                id="hscMarks"
                                name="number"
                                placeholder="Enter HSC Percentage"
                                type="number"
                                required
                                onChange={(e)=>handleChange(e,'hscMarks')}
                                value={data.hscMarks}
                                />
                                <p style={{color: "red"}}>{formErrors.hscMarks}</p>
                         </FormGroup>
                         <FormGroup>
                            <Label for="degreeMarks">
                            <b>     Degree  </b>
                            </Label>
                                <Input
                                id="degreeMarks"
                                name="number"
                                placeholder="Enter Degree Percentage"
                                type="number"
                                required
                                onChange={(e)=>handleChange(e,'degreeMarks')}
                                value={data.degreeMarks}
                                />
                                <p style={{color: "red"}}>{formErrors.degreeMarks}</p>
                         </FormGroup>
                         <FormGroup>
                            <Label for="graduation"><b>Graduation</b></Label>
                            <Input type="text" 
                            placeholder="Enter Degree Name"
                            id="graduation"
                            required
                            onChange={(e)=>handleChange(e,'graduation')}
                            value={data.graduation}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.graduation}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="branch"><b>Branch</b></Label>
                            <Input type="text" 
                            placeholder="Enter Branch Name"
                            id="branch"
                            required
                            onChange={(e)=>handleChange(e,'branch')}
                            value={data.branch}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.branch}</p>
                        </FormGroup>
                        
                        
                        <FormGroup>
                            <Label for="experience">
                            <b>  Experience </b>
                            </Label>
                                <Input
                                id="experience"
                                name="number"
                                required
                                placeholder="Enter experience in months"
                                type="number"
                                onChange={(e)=>handleChange(e,'experience')}
                                value={data.experience}
                                />
                                <p style={{color: "red"}}>{formErrors.experience}</p>
                         </FormGroup>

                         <FormGroup>
                            <Label for="contact">
                            <b>    Contact </b> 
                            </Label>
                                <Input
                                id="contact"
                                name="number"
                                placeholder="Enter contact number"
                                type="number"
                                onChange={(e)=>handleChange(e,'contact')}
                                required
                                value={data.contact}
                                />
                                <p style={{color: "red"}}>{formErrors.contact}</p>
                         </FormGroup>
                         <FormGroup>
                            <Label for="skills">
                            <b>    Skills </b> 
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
                                <p style={{color: "red"}}>{formErrors.skills}</p>
                                <Button onClick={updateSkill} color="secondary" type="reset" className="ms-2">add more skill</Button>
                                {/* <Label>{JSON.stringify(skills)}</Label> */}
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
              </div>
            </div>
          </div>
        </Base>
      </div>
    );
};
export default EmployeeEdit;
