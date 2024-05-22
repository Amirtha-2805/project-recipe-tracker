import { useEffect, useState } from "react"
import "../../styles/savedrecipe.css"
import { useSelector } from "react-redux"
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { userFeature,setsavedRecipes,setRecipeName } from "../../redux/slices/userSlice";
const SavedRecipes=()=>{
    const userSlice=useSelector((state)=>state.userDetails)
    let dispatch=useDispatch()

    const getSavedRecipes=()=>{
        getDocs(collection(db,"saved_recipes")).then((docSnap)=>{
            let saved_recipes=[]
            docSnap.forEach((doc)=>{
              if(doc.data().login_email==userSlice.userlogin.email){
                    saved_recipes.push({...doc.data(),id:doc.id})
              }
            })
          dispatch(setsavedRecipes(saved_recipes))            
        })
    }
    
    useEffect(()=>{
        getSavedRecipes()
    },[])

    const deleteSaved=(savedId)=>{
        deleteDoc(doc(db,"saved_recipes",savedId))
        alert("deleted")
        getSavedRecipes()
    }

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
                               userSlice.savedRecipes.map((saved,i)=>{
                                    return(
                                            <div id="recipe-box" key={i}>
                                                 <div className="recipe-content">
                                                    <h4><Link onClick={()=>savedContent(saved.recipe_name)}>{saved.recipe_name}</Link></h4>
                                                    <h5>Category : {saved.recipe_category}</h5>                                                    
                                                    <h5>Ingredients : {saved.recipe_ingredients}</h5>
                                                    <h5><Button type="button" variant="danger" onClick={()=>deleteSaved(saved.id)}>Delete</Button></h5>
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