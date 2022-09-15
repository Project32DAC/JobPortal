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
} from 'reactstrap';
import {NavLink as ReactLink, useNavigate} from 'react-router-dom'; 
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';

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
  }
  
    return (
      <div>
          
          <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Job-Portal</NavbarBrand>
              <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
              <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                      <NavItem>
                          <NavLink tag={ReactLink} to="/">Home</NavLink>
                      </NavItem>
                      {
                        login && (
                       <>
                        <NavItem>
                            <NavLink onClick={logout}>Logout</NavLink>
                        </NavItem> 
                        <NavItem>
                            <NavLink>{user.email}</NavLink>
                        </NavItem> 
                        </>
                        )
                      }
                      {
                        !login && (
                        <>
                        
                      <NavItem>
                      <NavLink tag={ReactLink} to="/Login">Login</NavLink>
                        </NavItem>
                      
                      <NavItem>
                          <NavLink tag={ReactLink} to="/Signup">Signup</NavLink>
                      </NavItem>

                        
                        </>
                        )
                      }
                      
                  </Nav>
              </Collapse>
          </Navbar>
      </div >
  );
}

export default CustomNavbar;
