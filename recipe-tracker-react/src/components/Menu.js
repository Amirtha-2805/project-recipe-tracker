import { Link } from "react-router-dom";
import "../styles/menu.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";



const NavBar=()=>{
    // const[isClicked,setIsclicked]=useState(false)
    
    return(
        <>
            <div className="menubar"> 
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container className="navbar-container">
                <Navbar.Brand className="nav-title">Recipe Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link className="home" ><Link to={"/"} className="home-link">Home</Link></Nav.Link>                    
                        <Nav.Link className="register" ><Link to={"/signup"} className="register-link">Register</Link></Nav.Link>
                        <NavDropdown title="Login" id="basic-nav-dropdown">
                            <NavDropdown.Item className="item"><Link to={"/loginadmin"} className="dropdown-item">Admin</Link></NavDropdown.Item>
                            <NavDropdown.Item className="item" ><Link to={"/userlogin"} className="dropdown-item">User</Link></NavDropdown.Item>                                 
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </div>        
            
            {/* <div className="navbar-container">
                <h2 className="nav-head">Recipe Tracker</h2>
                <ul>
                    <li><Link to={"/"} className="link-menu">Home</Link></li>
                    <li><Link to={"/signup"}  className="link-menu">Register</Link></li>
                    <li >Login<IoMdArrowDropdown  onClick={()=>setIsclicked(true)}/></li>
               </ul>
            </div> */}

            {/* {isClicked? 
               <div className="dropdown">
                    <ul>
                        <li><Link to={"/loginadmin"} className="dropdown-link">Admin</Link></li>
                        <li><Link to={"/userlogin"} className="dropdown-link">User</Link></li>
                    </ul>
                </div>
                :
               null
            } */}


        </>

    )
}
export default NavBar