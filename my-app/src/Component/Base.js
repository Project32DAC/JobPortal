import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";

const Base= ({ title = "welcome to job portal",children}) =>
{
    return(
            <div className="container-fluid p-0 m-0" >
                
                 <CustomNavbar></CustomNavbar>
                {children}
            <Footer></Footer>
    
            </div>
    );
};
export default Base;