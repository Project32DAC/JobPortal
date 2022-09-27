import React from "react";
import { Container } from "reactstrap";
import "./Footer.css";


const Footer = () => {
    return (
        <div className= " row bottom" >
           
            <div className="tagname">  
                <h3 style={{ fontStyle: 'italic', color: "white" }}><img className="logo" src={("../Images/logo1.jpg")} alt="logo" style={{ height: 50 }} />    Your Future Begins Here</h3>
            </div>
        
          
            <div className="row " >
                <div className="info col-3 "><h4>About us</h4>
                    <div>
                        <p> Online Job Portal <br></br>&nbsp;&nbsp;Project group number 32
                         <br></br>CDAC PUNE</p>
                    </div>
                </div>
                <div className="info col-3 "><h4>Contact Info</h4>
                    <div>
                        Address :Cdac Pune.<br></br>
                        Phone : +919451586786<br></br>
                        Email : onlineJob@gmail.com
                    </div>
                </div>
                <div className="info col-3 "><h4>Online Job Portal</h4>
                    <div>
                       <br></br>&nbsp;CDAC MARCH : 2022 BATCH<br></br>
                    </div>
                </div>
                <div className="info col-3 "><h4>Made In</h4>
                    <div><img className="flag" src="../Images/india.png" alt="Flag" /></div>
                </div>
            </div>
        </div>
            
        
    );
};
export default Footer;
