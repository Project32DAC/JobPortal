import React from "react";
import Base from "./Base";
import "./Style.css";
import "./Home.css";
import { Input,Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, roleByLoggedin } from "../auth";
import { toast } from "react-toastify";


const Home = () =>

{   const navigate = useNavigate();
    
  const  navigateTohome=()=>
    {
        if(!isLoggedIn())
        {
            toast.warning('Please login first !', {
                position: toast.POSITION.TOP_CENTER
            });
        }
        if(roleByLoggedin()==="admin")
        { navigate("/admin/home")}
        else if(roleByLoggedin()==="employee")
        {
            navigate("/employee/searchjob")
        }
        else
        {
            navigate("/recruiter/home")
        }  
    }
    return(
        <div>
        <Base>
        
            <div className="container-fluid ">
                <div className="row" >
                    <div className="leftside col-7 ">
                        
                        <div className="row Home">
                                <div ><p>Find the <br></br> most exiting <br></br>jobs</p></div>
                                {/* <div className="col-6"> */}
                                    {/* <br></br> */}
                                    <div className="row " >
                                    <div className="col-10 searchname"><Input type="text" style={{width:"43rem", height:"4.3rem" }} placeholder="Search Jobs"> Search here </Input></div>
                                    
                                    <div className="col-2"> <Button color="primary" className="searchbutton" align="center"  onClick={navigateTohome}>Search</Button> </div>
                                {/* </div> */}
                                </div>
                        </div>
                       

                        <div>
                            <img className="office7" src="./Images/office7.gif" alt="office" />
                        </div>

                        
                        
                    </div>

                    <div className="rightside col-5">
                        <div >
                            <img className="banner img-fluid " src= "./Images/banner.png" alt="my-gif" />
                       </div>
                    </div>
                    
                </div>
                
                
            </div>
            </Base>
        </div>
    );
};
export default Home;