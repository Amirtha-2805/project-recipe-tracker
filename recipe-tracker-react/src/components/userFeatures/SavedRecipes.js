import { useEffect, useState } from "react"
import "../../styles/savedrecipe.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { userFeature,setsavedRecipes,setRecipeName } from "../../redux/slices/userSlice";
import axios from "axios";
const SavedRecipes=()=>{
    const userSliceDetails=useSelector((state)=>state.userDetails)
   
    let dispatch=useDispatch()

    const getSavedRecipes=()=>{
        let getToken= localStorage.getItem("user_token")
        let parsedToken=JSON.parse(getToken)
        const headers={'Authorization':`Bearer ${parsedToken}`}
        axios.get(`https://amirtha14.pythonanywhere.com/getsavedrecipes/${userSliceDetails.userAllDetails.id}`,{headers}).then((res)=>{
            dispatch(setsavedRecipes(res.data))
        })  

    }
    const deleteSavedRecipe=(recId)=>{
            axios.post(`https://amirtha14.pythonanywhere.com/deletesaveddata/${recId}`)
            alert("deleted")     
            getSavedRecipes()


    }
    const deleteSavedAiRecipe=(ainame)=>{
        axios.delete(`https://amirtha14.pythonanywhere.com/deletesavedaidata/${ainame}`).then((res)=>{
            getSavedRecipes()
    })
    }
    useEffect(()=>{
        getSavedRecipes()
    },[])

    const savedContent=(rec_name)=>{
        dispatch(setRecipeName(rec_name))
        dispatch(userFeature("viewSaved"))
    }

    return(
        <>
       
                <center>
            <div className="saved-body">
                <h1 className="saved-recipe-head">Saved Recipes</h1>
                <div className="saved-recipelist-table" >
                       
                            {
                               userSliceDetails.savedRecipes.map((saved,i)=>{
                                    return(
                                            <div id="recipe-box" key={i}>
                                                 <div className="recipe-content">
                                                    <h4><Link onClick={()=>savedContent(saved.recipe_name)}>{saved.recipe_name}</Link></h4>
                                                    <h5>Category : {saved.recipe_category}</h5>                                                    
                                                    <h5>Ingredients : {saved.recipe_ingredients}</h5>
                                                    <h5><Button type="button" variant="danger" onClick={()=>deleteSavedRecipe(saved.savedId)}>Delete</Button></h5>
                                                 </div>
                                                
                                            </div>
                                        )
                                    }
                                )
                            }
                       
                   
                    </div>


              
                </div>
            </center>
       
        </>
    )

}
export default SavedRecipes