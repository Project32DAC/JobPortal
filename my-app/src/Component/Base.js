import CustomNavbar from "./CustomNavbar";

const Base= ({ title = "welcome to job portal",children}) =>
{
    return(
            <div className="container-fluid p-0 m-0">
                {/* <h1>This is header</h1> */}
                 <CustomNavbar></CustomNavbar>
                {children}
 
               
            </div>
    );
};
export default Base;