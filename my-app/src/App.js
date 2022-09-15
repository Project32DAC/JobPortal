

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
function App() {
  return (
    <BrowserRouter>
    <ToastContainer></ToastContainer>
      <Routes>
         <Route path="/" element={<Home />} /> 
         
          <Route path="/login" element = {<Login/>} />
         <Route path="/Signup" element = {<Signup/>} />
         <Route path="/About" element = {<About/>} />
         <Route path='/RecruiterUpdate' element = {<RecruiterEdit/>}/>
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
        <Route path='/user' element = {<PrivateRoute/>}>
          <Route path='RecruiterUpdate' element = {<RecruiterEdit/>}/>
        </Route>


      </Routes>
    
    
    
    </BrowserRouter>
  );
}

export default App;
