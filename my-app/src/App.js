import React from 'react';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Home from './Component/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './Component/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecruiterEdit from './Component/RecruiterEdit';
import PrivateRoute from './Component/PrivateRoute';
import EmployeeEdit from './Component/EmployeeEdit';
import ListAllUser from './Component/ListAllUser';
import Admin from './Component/Admin';
import ResumeInfo from './Component/ResumeInfo';
import AddJob from './Component/AddJob';
import ViewAllJobs from './Component/ViewAllJobs';
import SearchForEmp from './Component/SearchForEmp';
import ViewApplicant from './Component/ViewApplicant';
import SearchForRecruiter from './Component/SearchForRecruiter';
import { useEffect } from 'react';
import Recruiter from './Component/Recruiter';
import Employee from './Component/Employee';
import ViewEmployee from './Component/ViewEmployee';
import ViewRecruiters from './Component/ViewRecruiters';
import EmployeeUpdate from './Component/EmployeeUpdate';
import RecruiterUpdate from './Component/RecruiterUpdate';
import ExpandSkill from './Component/ExpandSkill';
function App() {
  useEffect(() => {
    document.title = "Job portal"
  }, [])
  return (
    <BrowserRouter>
      {/* <ToastContainer></ToastContainer> */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/About" element={<About />} />

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
        <Route path='/recruiter' element={<PrivateRoute />}>
          <Route path="viewjob" element={<ViewAllJobs />} />
          <Route path='home' element={<Recruiter />} />
          <Route path='update' element={<RecruiterEdit />} />
          <Route path="viewApplicant" element={<ViewApplicant />} />
          <Route path="searchCandidate" element={<SearchForRecruiter />} />
          <Route path="addjobs" element={<AddJob />} />
          <Route path="RecruiterUpdate" element={<RecruiterUpdate />} />
        </Route>


        <Route path='/admin' element={<PrivateRoute />}>
          <Route path='home' element={<Admin />} />
          <Route path='ViewEmployee' element={<ViewEmployee />} />
          <Route path='ViewRecruiters' element={<ViewRecruiters />} />
          <Route path='user' element={<ListAllUser />} />
        </Route>
        <Route path='/employee' element={<PrivateRoute />}>
          <Route path='home' element={<Employee />} />
          <Route path='empedit' element={<EmployeeEdit />} />
          <Route path="resume" element={<ResumeInfo />} />
          <Route path="update" element={<EmployeeUpdate />} />
          <Route path="updateSkill" element={<ExpandSkill />} />
          <Route path="searchjob" element={<SearchForEmp />} />
        </Route>


      </Routes>




    </BrowserRouter>
  );
}

export default App;