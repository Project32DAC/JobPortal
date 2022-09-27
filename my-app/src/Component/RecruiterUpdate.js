
import React, { useEffect, useState } from "react";
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

import { recruiteredit } from "../services/user-service";
import { getCurrentUserid } from "../auth";
import { doLogout } from "../auth";
import { deleteRecruiterAccount,viewRecruiterDetails ,editcompleterecru} from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { NavLink as ReactLink } from "react-router-dom";
import AddJob from "./AddJob";
import "./RecruiterUpdate.css"
const RecruiterUpdate = () =>
{
    let navigate = useNavigate()
    // const[user, setUser] = useState(undefined)
    // const [companyName,SetcompanyName]=useState('');
    // const[companyAddress,SetcompanyAddress]=useState('');
    // const[companyContact,SetcompanyContact]=useState('');
    // const[jobProfile,SetJobProfile]=useState('');
    // const[jobVacancy,SetJobVacancy]=useState('');
    // const[experience,SetExperience]=useState('');
    // let [jobs,SetJobs]=useState([]);
  
    

    const[data,setData] =useState({
        firstName:'',
        lastName:'',
        companyName:'',
        companyAddress:'',
        companyContact:'',
       })

       let isSubmit = true;
       const [formErrors, setFormErrors] = useState({});




       const init=()=>{
        viewRecruiterDetails(getCurrentUserid()).then((data)=>{
            setData(data);
            console.log(data);
            
            
        
        }).catch(error=>{
            console.log(error)
        })
        }

       // handle change
   const handleChangeforUpdate=(event,property)=>{
   
    setData({...data,[property]:event.target.value})
    
    console.log("name changed");
    console.log(event.target.property);
    console.log(event.target.value)


   }
  
   const resetData=()=>{
    setData({
        firstName:'',
        lastName:'',
        companyName:'',
        companyAddress:'',
        companyContact:''
        
    

    })
   }
   

   const validate = (values) => {
    const errors = {};
    const regex = /^[6-9]\d{9}$/gi;

    if (!values.firstName) {
        isSubmit=false;
      errors.firstName = "First Name is required!";
    }else if (!isNaN(values.firstName)) {
        isSubmit=false;
        errors.firstName = "First Name should be in text";
      }
    if (!values.lastName) {
        isSubmit=false;
      errors.lastName = "Last Name is required!";
    }else if (!isNaN(values.lastName)) {
        isSubmit=false;
        errors.lastName = "Last Name should be in text";
      }
    if (!values.companyName) {
        isSubmit=false;
      errors.companyName = "Company Name is required!";
    }
    
    if (!values.companyAddress) {
        isSubmit=false;
    errors.companyAddress = " Company Address is required!";
    }  
    if (!values.companyContact) {
        isSubmit=false;
      errors.companyContact = "Contact is required!";
    } else if (!regex.test(values.companyContact)) {
        isSubmit=false;
      errors.companyContact = "This is not a valid contact format!";
    }

    return errors;
  };


  useEffect(()=>{
    //get user from server
    
    
    init();
    
    
    },[])

    

//    useEffect(
//     ()=>
//     {

//        setUser(getCurrentUserDetail())
//     },
//     []
//      )
   
   const editForm=async(event)=>{
    event.preventDefault()
    console.log(data)
    //data validation
    setFormErrors(validate(data))
    // setFormErrors(validate2(prejobs))
    
// const Obj={jobProfile,jobVacancy,experience};
       
//     const data = {companyName,companyAddress,companyContact,arr};
//     console.log(data);
    //data validate
   
    //call server api for sending data
   
    console.log(data);
    
    editcompleterecru(data,getCurrentUserid(),isSubmit).then((resp)=>{
        console.log(resp);
        console.log("success log");
        toast.success("succesfull!!");
        
    }).catch((error)=>{
        console.log(error)
        console.log("error log");
        toast.error("something gone wrong failed");
        // handling errors 
        
    })
   }
   //logout
   const logout=()=>{
    doLogout(()=>{
      //logged out
     
      navigate("/")
    })
  }
   //delete my account
   const DeleteMyAccount= () =>
{
    deleteRecruiterAccount(getCurrentUserid()).then((resp)=>{
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
        // setError(
        //     {
        //         errors:error,
        //         isError:true
        //     }
        // )
    })
    // const updateSkill = () =>{
    //     //setSkills({...skills, event.target.value});
    //     console.log("skills changed");
    //     // console.log(event.target.value);
       
    //     //updateMyArray( arr => [...arr, `${arr.length}`]);
    //      setSkills(skills => [...skills,{ values}])
    //     // this.setSkills({
    //     //     skills:arr
    //     // })
    //     //console.log(event.target.value);
    
        
    //    }
    
    
      
    // const updateValues = ({ target }) => {
    //  console.log(target.value)   
    //  setValues(target.value)
    //    }
    // const keyPressed = ({ key }) => {
       
    //  if (key === "Enter") {
    //        updateSkill()
    //      }
    //  }
    // const AddJobs = () =>
    // {
    //     navigate("/addjob");
    // }
    // const navigateTo= () =>
    // {
    //     AddTobs();
        
    // }
  
    
    
}

    return(
        <div>
            <Base>
                <div className="row">
                    <div className="recruiterupdate-leftside col-4">
                        <div>

                            <div className="row recupdate-profile">
                                
                                    <h3><b>Update Your  Profile</b></h3>
                            </div>
                            <br></br>
                            <div className="employee-button" style={{ display: 'flex', justifyContent: 'center' }} >
                            <Button onClick={() => { navigate("/recruiter/addjobs") }} color="primary">Add More Jobs</Button>
                            &nbsp;&nbsp;  <Button color="danger" onClick={DeleteMyAccount}>Delete My Account</Button>
                               
                            </div>

                            <img className="resumeimg img-fluid rounded " src="../Images/rec3.gif" alt="recruiter" />

                        </div>
                    </div>
                    <div className="recruiterupdate-rightside col-8">
                        <div>
        <Container>
    
            <Row className="mt-4">

               
               <Col sm={{size: 6, offset: 3}}>
               <Card color="dark" outline>
                <CardHeader>
                    <b>Fill Information To Update</b>
                </CardHeader>
                <CardBody>
                    {/*creating form*/}
                    <Form onSubmit= {editForm}>
                    <FormGroup>
                            <Label for="firstname"><b>First Name</b></Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="firstName"
                            onChange={(e)=>handleChangeforUpdate(e,'firstName')}
                            value={data.firstName}
                            ></Input>
                             <p style={{color: "red"}}>{formErrors.firstName}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="name"><b>Last Name</b></Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="lastName"
                            onChange={(e)=>handleChangeforUpdate(e,'lastName')}
                            value={data.lastName}
                            ></Input>
                            <p style={{color: "red"}} >{formErrors.lastName}</p>
                            
                        </FormGroup>
                        <FormGroup>
                            <Label for="companyName"><b>Company Name</b></Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyName"
                            onChange={(e)=>handleChangeforUpdate(e,'companyName')}
                            // onChange={(e)=>SetcompanyName(e.target.value)}
                            value={data.companyName}
                            // value={companyName}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.companyName}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyAddress"><b>Address</b></Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyAddress"
                            onChange={(e)=>handleChangeforUpdate(e,'companyAddress')}
                            value={data.companyAddress}
                            // onChange={(e)=>SetcompanyAddress(e.target.value)}
                            // value={companyAddress}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.companyAddress}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="companyContact"><b>Contact Number</b></Label>
                            <Input type="text" 
                            placeholder="Enter here"
                            id="companyContact"
                            onChange={(e)=>handleChangeforUpdate(e,'companyContact')}
                            value={data.companyContact}
                            // onChange={(e)=>SetcompanyContact(e.target.value)}
                            // value={companyContact}
                            ></Input>
                            <p style={{color: "red"}}>{formErrors.companyContact}</p>
                        </FormGroup>

                        <Container className="text-center">
                            <Button color="primary">Update</Button>
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

export default RecruiterUpdate;