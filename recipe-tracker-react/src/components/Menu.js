import { Link } from "react-router-dom";
import "../styles/menu.css";
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


const NavBar=()=>{
       
    return(
        <>
          <Navbar expand="lg" className="custom-navbar">
              <Navbar.Brand href="/">Recipe Tracker</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                      <Link to="/" className="nav-link">Home</Link>
                      <Link to="/signup" className="nav-link">Register</Link>
                      <NavDropdown title="Login" id="basic-nav-dropdown">
                          <Link to="/loginadmin" className="dropdown-item">Admin</Link>
                          <Link to="/userlogin" className="dropdown-item">User</Link>
                      </NavDropdown>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
        </>

    )
}
export default NavBar