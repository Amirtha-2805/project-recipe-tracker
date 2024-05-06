import { Link } from "react-router-dom"
import "../styles/adminhome.css"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { adminFeatures } from "../redux/slices/adminSlice";
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
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";


export default function AdminHome(){
    const adminSlice=useSelector((state)=>state.adminDetails)
    const dispatch=useDispatch()
    const navigate = useNavigate();

    const adminLogOut=()=>{
        navigate("/")
    }
//   let getAdmin=getDocs(collection(db,"admin_login_details")).then((docSnap)=>{
//         docSnap.forEach((doc)=>{
//             dispatch(setAdminId(doc.id))
//         })
//     })
    useEffect(()=>{
        if(adminSlice.adminId){
            navigate("/adminhome")
        }
        else{            
            navigate("/")
        }
    },[])
       return(

            <>
    
            <div className="sidenav">
                               
                <h4 className="adminhometitle"><b>Features</b></h4>
                    <ul>
                        <li className="userlist"><Link className="link"  onClick={()=>dispatch(adminFeatures(""))}><AiFillHome className="icons"/> Home</Link></li>
                        <li className="userlist"><Link className="link" onClick={()=>dispatch(adminFeatures("allUsers"))}><PiUserListFill className="icons"/>  UserList</Link></li>
                        <li className="userlist"><Link className="link" onClick={()=>dispatch(adminFeatures("allRecipes"))} ><MdFoodBank className="icons"/> All Recipes</Link></li>
                        <li className="userlist"><Link className="link" onClick={()=>dispatch(adminFeatures("addRecipes"))}><MdAssignmentAdd className="icons"/> Add Recipes</Link></li>                   
                        <li className="userlist"><Link className="link" onClick={()=>dispatch(adminFeatures("addIngredients"))}><MdAssignmentAdd className="icons"/> Add Ingredients</Link></li>                   
                    </ul>
                
                <div className="adminlogout">
                   <button className="btn btn-danger btn-sm " onClick={adminLogOut}>Logout</button>
                </div>

            </div>
            <div className="adminhomebody">
                {adminSlice.adminFeatureStatus=="addRecipes" ? <AddRecipes/>:null}
                {adminSlice.adminFeatureStatus=="allUsers" ? <UserList/>:null}
                {adminSlice.adminFeatureStatus=="allRecipes" ? <AllRecipes/>:null} 
                {adminSlice.adminFeatureStatus=="addIngredients" ? <Ingredients/>:null} 

            </div>
                
        </>
        
    )
}