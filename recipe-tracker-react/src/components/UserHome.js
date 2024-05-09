import { Link } from "react-router-dom"
import "../styles/userhome.css"
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { userFeature } from "../redux/slices/userSlice";
import RecipeList from "./userFeatures/RecipeList";
import SavedRecipes from "./userFeatures/SavedRecipes";
import { AiFillHome } from "react-icons/ai";
import { BiSolidFoodMenu } from "react-icons/bi";
import { RiSaveFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import UserFeatureHome from "./userFeatures/UserFeatureHome";
import noUser from "../styles/no-user.webp";
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import { signup } from "../redux/slices/userSlice";
import { setId } from "../redux/slices/userSlice";


export default function UserHome(){
    const userSlice=useSelector((state)=>state.userDetails)
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const[userName,setUserName]=useState("")
    const[userEmail,setUserEmail]=useState("")
    

    const userLogOut=()=>{
        navigate("/")
    }
    
    const setUser=()=>{
        setUserName(userSlice.usersignup.name)
        setUserEmail(userSlice.usersignup.email)
    }
   
    // console.log("name",userName,"email",userEmail)
    useEffect(()=>{
        setUser()
    },[])
    
    // localStorage.setItem("user_token",userSlice.token)        
    // let user_token=localStorage.getItem("user_token")
    // useEffect(()=>{
        
    //     if(userSlice.token){
    //         navigate("/userhome")
    //     }
    //     else{           
    //         navigate("/")
    //     }
    // })
    return(       
        <>        
            <div className="sidenav">
                    <div className="no-user">
                            <img src={noUser} className="user-no-user"/>
                            <h6 className="user-name">{userName}</h6>
                            <h6 className="user-email">{userEmail}</h6>                                                        
                    </div>           
                    <h4 className="userhometitle"><b>Features</b></h4>
                        <ul>
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("userFeature"))}> <AiFillHome className="icons"/> Dashboard</Link></li>                                       
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("recipeList"))}><BiSolidFoodMenu className="icons"/> Recipe List</Link></li>
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature("savedRecipe"))}><RiSaveFill className="icons" /> Saved Recipes</Link></li>                   
                        </ul>
                                
                    <div className="userlogout">
                        <button className="btn btn-danger btn-sm " onClick={userLogOut}>Logout</button>
                    </div>                
            </div>
            <div className="userhomebody">
                    {userSlice.userFeatureStatus=="recipeList" ? <RecipeList/>:null}
                    {userSlice.userFeatureStatus=="savedRecipe" ? <SavedRecipes/>:null} 
                    {userSlice.userFeatureStatus=="userFeature" ? <UserFeatureHome/>:null}                                
            </div>
               
        </>
    )
}