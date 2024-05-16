import { Link } from "react-router-dom";
import "../styles/menu.css";
import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";




const NavBar=()=>{
    // const[isClicked,setIsclicked]=useState(false)
    
    return(
        <>
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
                      <Link className="dropdown-toggle nav-link" data-toggle="dropdown"> Login</Link> 
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

            

           

        </>

    )
}
export default NavBar