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
import { useEffect } from "react";



export default function UserHome(){
    const userSlice=useSelector((state)=>state.userDetails)
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const userLogOut=()=>{
        navigate("/")
    }
    useEffect(()=>{
        if(userSlice.token){
            navigate("/userhome")
        }
        else{           
            navigate("/")
        }
    },[])
    return(
       
        <>
        
            <div className="sidenav">
                                
                    <h4 className="userhometitle"><b>Features</b></h4>
                        <ul>
                            <li className="userfeaturelist"><Link className="link" onClick={()=>dispatch(userFeature(""))}> <AiFillHome className="icons"/> Home</Link></li>                                       
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
            </div>
               
        </>
    )
}