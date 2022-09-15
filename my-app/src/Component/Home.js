import React from "react";
import Base from "./Base";
import "./Style.css";
import "./Home.css";




const Home = () =>
{
    return(
        <div>
        <Base>
        </Base>
            <div className="container-fluid ">
                <div className="row" >
                    <div className="leftside col-7 ">
                        
                        <div className="Home">
                            <p>Find the <br></br> most exiting <br></br>jobs </p>
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
                <div className="row bottom " >
                    <div className="info col-3 "><h4>About us</h4>
                        <div>
                            <p> Heaven frucvitful doesn't cover <br></br>lesser
                                dvsays appear creeping <br></br>seasons so behold.</p>
                        </div>
                    </div>
                    <div className="info col-3 "><h4>Contact Info</h4>
                        <div>
                            Address :Your address goes here, your demo address.<br></br>
                            Phone : +9998882222<br></br>
                            Email : info@gmail.com
                        </div>
                    </div>
                    <div className="info col-3 "><h4>Newsletter</h4>
                        <div>
                            Heaven fruitful doesn't <br></br>over lesser in days.<br></br> Appear creeping.
                        </div>
                    </div>
                    <div className="info col-3 "><h4>Made In</h4>
                        <div><img className="flag" src="./Images/india.png" alt="Flag" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;