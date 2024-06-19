import { Link } from "react-router-dom"
import "../styles/userhome.css"
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { setRecipeName, setsavedRecipes, userFeature } from "../redux/slices/userSlice";
import RecipeList from "./userFeatures/TodoList";
import SavedRecipes from "./userFeatures/SavedRecipes";
import { AiFillHome } from "react-icons/ai";
import { BiSolidFoodMenu } from "react-icons/bi";
import { RiSaveFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import UserFeatureHome from "./userFeatures/UserFeatureHome";
import noUser from "../styles/no-user.webp";
import { signup,setId,uLogin, setIsLogged,setUserAllDetails  } from "../redux/slices/userSlice";
import Button from 'react-bootstrap/Button';
import SavedRecipeView from "./userFeatures/SavedRecipeView";
import { FaHome } from "react-icons/fa";
import TodoList from "./userFeatures/TodoList";


export default function UserHome(){
    const userSlice=useSelector((state)=>state.userDetails)
    const navigate = useNavigate();
    const dispatch=useDispatch();
    
    const userLogOut=()=>{
        dispatch(setUserAllDetails({
            user_name:"",
            user_email:"",
            user_password:"",
            user_age:"",
            user_gender:"",
            user_phone:"",
            user_address:""
        }))
        dispatch(uLogin({
            email:"",
            password:""
        }))
        dispatch(setsavedRecipes([]))
        dispatch(setRecipeName(""))
        dispatch(setIsLogged(false))
        localStorage.removeItem("user_token")
        alert("You are logged out!")
            navigate("/")
    }
       
    useEffect(()=>{
        dispatch(userFeature("savedRecipe"))      
    },[])
    
    // useEffect(()=>{        
    //     if(userSlice.token){
    //         navigate("/userhome")
    //     }
    //     else{           
    //         navigate("/")
    //     }
    // },[])
   

    
    return(       
        <>  

         {/* <div className="sidenav">
                    <div className="no-user">
                            <img src={noUser} className="user-no-user"/>
                            <h6 className="user-name">{userSlice.userAllDetails.user_name}</h6>
                            <h6 className="user-email">{userSlice.userAllDetails.user_email}</h6>                                                        
                    </div>           
                    <h4 className="userhometitle"><b>Features</b></h4>
                        <ul>
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("savedRecipe"))}><RiSaveFill className="icons" /> Saved Recipes</Link></li>                   
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("Dashboard"))}> <AiFillHome className="icons"/> Dashboard</Link></li>                            
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("todoList"))}><BiSolidFoodMenu className="icons"/> Todo List</Link></li>
                        </ul>
                                
                    <div className="userlogout">
                        <button className="btn btn-danger btn-sm " onClick={userLogOut}>Logout</button>
                    </div>                
            </div>  */}
             <div className="sidebar" data-color="default" data-active-color="danger">
     
     
      <div className="sidebar-wrapper">
        <div className="user">
          <div className="photo">
            <img src={noUser}/>
          </div>
          <div className="info" id="user-details">
            <a data-toggle="collapse" href="#collapseExample" className="collapsed">
              <span>
              <div className="no-user">
                  <h6 className="user-name">{userSlice.userAllDetails.user_name}</h6>
                  <h6 className="user-email">{userSlice.userAllDetails.user_email}</h6>                                                        
              </div>            
              </span>
            </a>
           
          </div>
        </div>
        <ul className="nav">
       
          <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("savedRecipe"))}><RiSaveFill className="icons" /> Saved Recipes</Link></li>                   

          <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("Dashboard"))}> <AiFillHome className="icons"/> Dashboard</Link></li>                            

          <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("todoList"))}><BiSolidFoodMenu className="icons"/> Todo List</Link></li>         
        </ul>
        <div className="userlogout">
                        <button className="btn btn-danger btn-sm " onClick={userLogOut}>Logout</button>
                    </div>      
      </div>
    </div>

    <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button type="button" className="navbar-toggler">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    <div className="main-panel">
            <div className="userhomebody">
                    <button id="home-link" type="button" onClick={()=>navigate("/")}><FaHome classNameName="home-icon" /> Home</button>
                    {userSlice.userFeatureStatus=="todoList" ? <TodoList/>:null}
                    {userSlice.userFeatureStatus=="savedRecipe" ? <SavedRecipes/>:null} 
                    {userSlice.userFeatureStatus=="Dashboard" ? <UserFeatureHome/>:null} 
                    {userSlice.userFeatureStatus=="viewSaved" ? <SavedRecipeView />:null}                              
            </div>
               
    </div>
 
          
        </>
    )
}