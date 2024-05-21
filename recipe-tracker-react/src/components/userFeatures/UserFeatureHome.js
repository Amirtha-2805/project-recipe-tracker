import { useEffect, useState } from "react";
import "../../styles/user-feature-home.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTotalNo,setTotalVeg,setTotalNonVeg,setTotalAiRecipes } from "../../redux/slices/userSlice";

const UserFeatureHome=()=>{
    const userSlice=useSelector((state)=>state.userDetails)
    let dispatch=useDispatch()
   

    const totalSavedRecipes=()=>{
        let recipe_array_total=[]
        let total_veg_recipes=[]
        let total_non_veg_recipes=[]
        let total_ai_recipes=[]
        userSlice.savedRecipes.forEach((each)=>{
            // console.log("total",recipe_array_total)
           recipe_array_total.push(each)
           if(each.recipe_category=="Vegeterian"){
                total_veg_recipes.push(each)
           }
           if(each.recipe_category=="Non-vegeterian"){
            total_non_veg_recipes.push(each)
           }
           if(each.recipe_category=="AI"){
            total_ai_recipes.push(each)
       }
        })
        
        dispatch(setTotalNo(recipe_array_total))
        dispatch(setTotalVeg(total_veg_recipes))
        dispatch(setTotalNonVeg(total_non_veg_recipes))
        dispatch(setTotalAiRecipes(total_ai_recipes))
        
    }
    useEffect(()=>{
        totalSavedRecipes()
    },[])
        return(
        <>
        <div className="user-dash-board-body">

            <div className="saved-total-recipe">
                    <p className="total-head"><b>Total Recipes</b></p>
                    <h2 className="number"><b>{userSlice.totalNo.length}</b></h2>
                    <p className="veg-para">Veg {userSlice.totalVeg.length}</p>                   
                    <p className="nonveg-para">Non-veg {userSlice.totalNonVeg.length}</p>
                    <p className="nonveg-para">Ai-recipe {userSlice.totalAiRecipes.length}</p>

            </div>
        </div>    
        </>
        )
}
export default UserFeatureHome