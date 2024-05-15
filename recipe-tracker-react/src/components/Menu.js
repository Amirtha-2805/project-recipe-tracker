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
import { FiAlignJustify } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";




const NavBar=()=>{
    // const[isClicked,setIsclicked]=useState(false)
    
    return(
        <>
        {/* bootstrap
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
            </div>          */}

          <div className="nav">
            <nav className="navbar navbar-expand-lg  fixed-top navbar-transparent " color-on-scroll="300">
              <div className="container">
                  <div className="navbar-translate">     
                    <h3>Recipe-Tracker</h3>    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"  aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                      <FiAlignJustify />
                    </button>
                  </div>
              <div className="collapse navbar-collapse" id="navigation">
       {/* <div class="col-6 collapse-close text-right">
              <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navigation"  aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
              <IoCloseSharp />
              </button>
            </div> */}
                  <ul className="navbar-nav ml-auto">        
                    <Link  to={"/"} className="nav-item dropdown" id="home-menu">Home</Link>       
                    <Link to={"/signup"} className="nav-item dropdown" id="reg-menu">Register</Link>        
                    <li className="dropdown nav-item">           
                      <Link href="#" className="dropdown-toggle nav-link" data-toggle="dropdown"> Login</Link> 
                      <div className="dropdown-menu dropdown-with-icons">
                        <Link to={"/loginadmin"} className="dropdown-item"> Admin</Link>
                        <Link to={"/userlogin"} className="dropdown-item">User</Link>
                      </div>
                   </li>        
                 </ul>
               </div>
             </div>
            </nav>
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