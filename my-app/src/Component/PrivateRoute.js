import { Navigate, Outlet } from "react-router-dom";
import RecruiterEdit from "./RecruiterEdit";
import { isLoggedIn } from '../auth'
const PrivateRoute =()=>
{
    
    console.log(isLoggedIn());
    return isLoggedIn() ? <Outlet/> : <Navigate to ={"/login"}/>

}

export default PrivateRoute ;