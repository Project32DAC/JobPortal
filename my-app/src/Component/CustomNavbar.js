import React, { useState } from 'react';
//use react router dom  navlinks pending
import { useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import {NavLink as ReactLink, useNavigate} from 'react-router-dom'; 
import { doLogout, getCurrentUserDetail, isLoggedIn, roleByLoggedin } from '../auth';

const CustomNavbar= () => {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate()
  const toggle = () => setIsOpen(!isOpen);
  const [login,setLogin]=useState(false)
  const [user,setUser]= useState(undefined)

  useEffect(()=>{
    setLogin(isLoggedIn())
    console.log(login)
    setUser(getCurrentUserDetail())

  },[login])
  const logout=()=>{
    doLogout(()=>{
      //logged out
      setLogin(false)
      navigate("/")
    })
    //redirect to role by login
  
}
const redirect =()=>{
  if(roleByLoggedin()==="admin")
  { navigate("/admin/home")}
  else if(roleByLoggedin()==="employee")
  {
      navigate("/employee/home")
  }
  else
  {
      navigate("/recruiter/home")
  }
}
    return (
      <div>
      <div>
          
          <Navbar color="light" light expand="md">
              {/*<NavbarBrand href="/">Job-Portal</NavbarBrand>*/}
            <div className="LeftNavbar">
              <NavbarBrand href="/"><img className="logo" src={("../Images/logo1.jpg")} alt="logo" style={{ height: 50 }} /></NavbarBrand>
            </div>

              <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />

            <div className="RightNavbar ">
              <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                      
                      {
                        login && (
                       <>

                       <NavItem>
                          <NavLink onClick={redirect} ><h5 style={{ color: "black" }}><b> Home</b></h5></NavLink>
                      </NavItem>
                        <NavItem>
                          <NavLink onClick={logout}><h5 style={{ color: "black" }}><b>Logout</b></h5></NavLink>
                        </NavItem> 
                        <NavItem>
                          <NavLink ><h5 style={{ fontStyle: 'italic', color: "purple" }}> <b>{user.email}</b></h5></NavLink>
                            
                        </NavItem>
                        <br/>
                        <NavItem>
                          <NavLink onClick={() => navigate(-1)}><h5>Back</h5></NavLink>
                        </NavItem> 
                        <NavItem>
                          <NavLink onClick={() => navigate(+1)}><h5>Next</h5></NavLink>
                        </NavItem> 
                        </>
                        )
                      }
                      {
                        !login && (
                        <>
                        
                      <NavItem>
                          <NavLink tag={ReactLink} to="/Login"><h5 style={{ color: "black" }}><b> Login</b></h5></NavLink>
                        </NavItem>
                      
                      <NavItem>
                          <NavLink tag={ReactLink} to="/Signup"><h5 style={{ color: "black" }}><b> Signup</b></h5></NavLink>
                      </NavItem>

                        
                        </>
                        )
                      }
                      
                  </Nav>
              </Collapse>
              </div>
          </Navbar>
      </div >
     
      </div>
  );
}

export default CustomNavbar;
