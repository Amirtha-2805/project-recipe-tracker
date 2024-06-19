import { Link } from "react-router-dom";
import "../styles/menu.css";
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';



const NavBar=()=>{
   
    return(
        <>
          {/* <Navbar expand="lg" className="custom-navbar">
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
          </Navbar> */}
      <Nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent" id="navbar-box" >
        <div className="container-fluid" id="custom-navbar">
          <div className="navbar-wrapper">
            <Link className="navbar-brand" to={"/"} style={{color:"white"}}>Recipe Tracker</Link>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navigation">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link btn-magnify" to={"/"}>
                 <p >Home</p>
                </Link>
              </li>
              <li className="nav-item btn-rotate dropdown">
                <Link className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <p >Login</p>
                </Link>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <Link className="dropdown-item" to={"/loginadmin"} >Admin</Link>
                  <Link className="dropdown-item" to={"/userlogin"}>User</Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn-rotate" to={"/signup"}>
                  <p >Register</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Nav>
        </>


    )
}
export default NavBar