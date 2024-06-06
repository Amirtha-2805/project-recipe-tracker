import { Link } from "react-router-dom"
import "../styles/userhome.css"
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { setRecipeName, setsavedRecipes, userFeature } from "../redux/slices/userSlice";
import RecipeList from "./userFeatures/RecipeList";
import SavedRecipes from "./userFeatures/SavedRecipes";
import { AiFillHome } from "react-icons/ai";
import { BiSolidFoodMenu } from "react-icons/bi";
import { RiSaveFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import UserFeatureHome from "./userFeatures/UserFeatureHome";
import noUser from "../styles/no-user.webp";
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc,getDoc } from "firebase/firestore";
import { signup,setId,uLogin, setIsLogged,setUserAllDetails  } from "../redux/slices/userSlice";
import Button from 'react-bootstrap/Button';
import SavedRecipeView from "./userFeatures/SavedRecipeView";
import { FaHome } from "react-icons/fa";


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
        alert("You are logged out!")
            navigate("/")
    }
    
    
   
    
    // console.log(fireBaseUserData.id)
       
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

            <div className="sidenav">
                    <div className="no-user">
                            <img src={noUser} className="user-no-user"/>
                            <h6 className="user-name">{userSlice.userAllDetails.user_name}</h6>
                            <h6 className="user-email">{userSlice.userAllDetails.user_email}</h6>                                                        
                    </div>           
                    <h4 className="userhometitle"><b>Features</b></h4>
                        <ul>
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("savedRecipe"))}><RiSaveFill className="icons" /> Saved Recipes</Link></li>                   
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("Dashboard"))}> <AiFillHome className="icons"/> Dashboard</Link></li>                            
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("recipeList"))}><BiSolidFoodMenu className="icons"/> Recipe List</Link></li>
                        </ul>
                                
                    <div className="userlogout">
                        <button className="btn btn-danger btn-sm " onClick={userLogOut}>Logout</button>
                    </div>                
            </div>
            <div className="userhomebody">
                     <button id="home-link" type="button" onClick={()=>navigate("/")}><FaHome className="home-icon" /> Home</button>
                    {userSlice.userFeatureStatus=="recipeList" ? <RecipeList/>:null}
                    {userSlice.userFeatureStatus=="savedRecipe" ? <SavedRecipes/>:null} 
                    {userSlice.userFeatureStatus=="Dashboard" ? <UserFeatureHome/>:null} 
                    {userSlice.userFeatureStatus=="viewSaved" ? <SavedRecipeView />:null}                               
            </div>
               
        </>
    )
}