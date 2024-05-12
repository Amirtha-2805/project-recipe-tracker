import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc,getDoc } from "firebase/firestore";
import { useState,useEffect } from "react";
import "../../styles/recipe_edit.css";


const RecipeEdit=()=>{
    let {id} = useParams();
    const[recipeName,setRecipeName]=useState("")
    const[recipeCategory,setRecipeCategory]=useState("")
    const[recipeIngredients,setRecipeIngredients]=useState("")
    const[recipeInstructions,setRecipeInstructions]=useState("")
    const[editedRecipe,setEditedRecipe]=useState({
        edited_recipe_name:"",
        edited_recipe_category:"",
        edited_Recipe_ingredients:"",
        edited_recipe_instructions:""
    })

const edit=()=>{
    getDoc(doc(db,"default_recipes",id)).then((docSnap)=>{
        let recipe_title=""
        let recipe_category=""
        let recipe_ingredients=""
        let recipe_instructions=""
       if(docSnap.exists()){
            recipe_title=docSnap.data()['recipe_name'];
            recipe_category=docSnap.data()['category'];
            recipe_ingredients=docSnap.data()['ingredients'];
            recipe_instructions=docSnap.data()['instructions']
       }
       setRecipeName(recipe_title)
       setRecipeCategory(recipe_category)
       setRecipeIngredients(recipe_ingredients)
       setRecipeInstructions(recipe_instructions)       
    })
}
const updateRecipe=()=>{
    updateDoc(doc(db,"default_recipes",id),{
        recipe_name:editedRecipe.edited_recipe_name,
        category:editedRecipe.edited_recipe_category,
        ingredients:editedRecipe.edited_Recipe_ingredients,
        instructions:editedRecipe.edited_recipe_instructions
    })  
    alert("recipe updated")  
}

useEffect(()=>{
    edit()
},[])


return(
        <>
           <center>
                <div className="card-body">
                    <div className="body">  
                        <h3 className="card-title">Edit Recipe</h3>
                        <br/>
                        <div className="box">     
                            <div className="input-edit">
                                <div className="input-group input-lg">                             
                                    <label>Recipe</label>          
                                    <input type="text" className="form-control" defaultValue={recipeName} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_recipe_name:e.target.value
                                    })} />      
                                </div>
                                <div className="input-group input-lg">             
                                    <label>Category</label>      
                                    <input type="text" className="form-control" defaultValue={recipeCategory} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_recipe_category:e.target.value
                                    })}/>
                                </div> 
                                <div className="input-group input-lg">             
                                    <label>Ingredients</label>    
                                    <input type="text" className="form-control" defaultValue={recipeIngredients} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_Recipe_ingredients:e.target.value
                                    })}/>
                                </div> 
                                <div className="input-group input-lg">             
                                    <label>Instructions</label>   
                                    <input type="text" className="form-control" defaultValue={recipeInstructions} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_recipe_instructions:e.target.value
                                    })} />
                                </div>
                            </div> 
                            <br/>
                            <div>
                                <button type="button" className="btn btn-danger" onClick={updateRecipe}>Update</button>
                            </div>
                            <br/>
                        </div>
                    </div>
                </div>
            </center>
        </>


)

}




export default RecipeEdit