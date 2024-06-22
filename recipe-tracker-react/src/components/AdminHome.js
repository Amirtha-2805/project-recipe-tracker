import { Link } from "react-router-dom"
import "../styles/adminhome.css"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { adminFeatures, setAdmin, setAdminDetails, setAdminIsLogged } from "../redux/slices/adminSlice";
import AddRecipes from "./adminFeatures/AddRecipes";
import UserList from "./adminFeatures/UserList"; 
import { IconName } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { PiUserListFill } from "react-icons/pi";
import { MdFoodBank } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";
import AllRecipes from "./adminFeatures/AllRecipes";
import Ingredients from "./adminFeatures/Ingredients";
import { setAdminId } from "../redux/slices/adminSlice";
import AdminFeatureHome from "./adminFeatures/AdminFeatureHome";
import noUser from "../styles/no-user.webp"
import IngredientList from "./adminFeatures/IngredientList";
import { IoOptions } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import axios from "axios";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


export default function AdminHome(){
    const adminSlice=useSelector((state)=>state.adminDetails)
    const dispatch=useDispatch()
    const navigate = useNavigate();
    const adminLogOut=()=>{
        dispatch(setAdminDetails({
            admin_id:"",
            admin_name:"",
            admin_email:""
        }))
        dispatch(setAdmin({
            adminId:"", 
            admin_name:"",
            admin_email:"",
            admin_pwd:""
        }))
        localStorage.removeItem("admin_token")
        alert("You are logged out")
        navigate("/")

    }
    
       return(

        <>
    
            
    <div className="sidenav">
                <div className="no-user">
                    <img src={noUser} className="admin-no-user"/>
                    <h6  className="admin-name">{adminSlice.admin_details.admin_name}</h6>
                    <h6 className="admin-email">{adminSlice.admin_details.admin_email}</h6>
                </div>
                <h4 className="adminhometitle"><b>Features</b>  </h4>
                    <ul>
                        <li className="userlist"><Link className="link" onClick={()=>dispatch(adminFeatures("adminHome"))}><AiFillHome className="icons"/> Dashboard</Link></li>
                        <li className="userlist"><Link className="link" onClick={()=>dispatch(adminFeatures("allUsers"))}><PiUserListFill className="icons"/>  UserList</Link></li>
                        <li className="userlist"><Link className="link" onClick={()=>dispatch(adminFeatures("allRecipes"))} ><MdFoodBank className="icons"/> All Recipes</Link></li>
                        <li className="userlist"><Link className="link" onClick={()=>dispatch(adminFeatures("addRecipes"))}><MdAssignmentAdd className="icons"/> Add Recipes</Link></li>                   
                        <li className="userlist"><Link className="link" onClick={()=>dispatch(adminFeatures("ingredientList"))}><IoOptions className="icons"/> Ingredient option</Link></li>                   
                    </ul>
                
                <div className="adminlogout">
                   <button className="btn btn-danger btn-sm " onClick={adminLogOut}>Logout</button>
                </div>

            </div>
            
            <div className="adminhomebody">  
                <button id="home-link" type="button" onClick={()=>navigate("/")}><FaHome className="home-icon" /> Home</button>
                {adminSlice.adminFeatureStatus=="addRecipes" ? <AddRecipes/>:null}
                {adminSlice.adminFeatureStatus=="allUsers" ? <UserList/>:null}
                {adminSlice.adminFeatureStatus=="allRecipes" ? <AllRecipes/>:null} 
                {adminSlice.adminFeatureStatus=="ingredientList" ? <IngredientList/>:null} 
                {adminSlice.adminFeatureStatus=="adminHome" ? <AdminFeatureHome/>:null} 
                {adminSlice.adminFeatureStatus=="addIngredients"? <Ingredients/>:null}
            </div>
        </>
        
    )
}