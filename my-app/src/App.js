

import React from 'react';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Home from './Component/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './Component/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecruiterEdit from './Component/RecruiterEdit';
import PrivateRoute from './Component/PrivateRoute';
import EmployeeEdit from './Component/EmployeeEdit';
import ListAllUser from './Component/ListAllUser';
import ToBeDeleted from './Component/toBeDeleted';
import ResumeInfo from './Component/ResumeInfo';
import AddJob from './Component/AddJob';
import ViewAllJobs from './Component/ViewAllJobs';

function App() {
  return (
    <BrowserRouter>
    {/* <ToastContainer></ToastContainer> */}
      <Routes>
         <Route path="/" element={<Home />} /> 
         
          <Route path="/login" element = {<Login/>} />
         <Route path="/Signup" element = {<Signup/>} />
         <Route path="/About" element = {<About/>} />
         
        {/* <Route exact path='/profile'>
               {userType() ==="recruiter" ?
               (
                <RecruiterProfile/>

               ):
               (
                <Profile/>
               )

               }

        </Route>
        <Route>
                <ErrorPage />
        </Route> */}
        <Route path='/recruiter' element = {<PrivateRoute/>}>
          <Route path='update' element = {<RecruiterEdit/>}/>
        </Route>

        <Route path='/Empedit' element = {<EmployeeEdit/>}/>
        <Route path='/admin' element = {<PrivateRoute/>}>
           <Route path='list' element = {<ListAllUser/>}/>
        </Route>
        <Route path="/none" element = {<ToBeDeleted/>} />
        <Route path="/resume" element = {<ResumeInfo/>} />
        <Route path="/addjobs" element = {<AddJob/>} />
        <Route path="/viewjob" element = {<ViewAllJobs/>} />
        
      </Routes>
      
    
    
    
    </BrowserRouter>
  );
}

export default App;
