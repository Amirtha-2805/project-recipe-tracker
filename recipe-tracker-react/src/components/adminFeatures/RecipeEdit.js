import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc,getDoc } from "firebase/firestore";
import { useState,useEffect } from "react";
import "../../styles/recipe_edit.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imagesDb } from "../../firebase";
import {v4} from 'uuid';

const RecipeEdit=()=>{
    let {id} = useParams();
    const[recipeImage,setRecipeImage]=useState("")
    const[editedRecipe,setEditedRecipe]=useState({
        edited_recipe_name:"",
        edited_recipe_category:"",
        edited_Recipe_ingredients:"",
        edited_recipe_instructions:"",
        edited_image:"",
        edited_url:""
    })

const edit=()=>{
    getDoc(doc(db,"default_recipes",id)).then((docSnap)=>{
       if(docSnap.exists()){
        setEditedRecipe(
            {
                edited_recipe_name:docSnap.data()['recipe_name'],
                edited_recipe_category:docSnap.data()['category'],
                edited_Recipe_ingredients:docSnap.data()['ingredients'],
                edited_recipe_instructions:docSnap.data()['instructions'],
                edited_image:docSnap.data()['recipe_image'],
                edited_url:docSnap.data()['recipe_url']
            }
        ) 
       }
    })
}
const updateRecipe=()=>{
    updateDoc(doc(db,"default_recipes",id),{
        recipe_name:editedRecipe.edited_recipe_name,
        category:editedRecipe.edited_recipe_category,
        ingredients:editedRecipe.edited_Recipe_ingredients,
        instructions:editedRecipe.edited_recipe_instructions,
        recipe_image:recipeImage,
        recipe_url:editedRecipe.edited_url
    })  
    alert("recipe updated")  
}

useEffect(()=>{
    edit()
},[])
const handleUpload=(e)=>{
    // console.log("image",e.target.files[0])
    const imgs=ref(imagesDb,`recipe_images/${v4()}`)
    uploadBytes(imgs,e.target.files[0]).then(data=>{
        console.log("images",data)
        getDownloadURL(data.ref).then((imgUrl)=>{
            setRecipeImage(imgUrl)
        })
    })
}


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
                                    <input type="text" className="form-control" defaultValue={editedRecipe.edited_recipe_name} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_recipe_name:e.target.value
                                    })} />      
                                </div>
                                <div className="input-group input-lg">             
                                    <label>Category</label>      
                                    <input type="text" className="form-control" defaultValue={editedRecipe.edited_recipe_category} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_recipe_category:e.target.value
                                    })}/>
                                </div> 
                                <div className="input-group input-lg">             
                                    <label>Ingredients</label>    
                                    <input type="text" className="form-control" defaultValue={editedRecipe.edited_Recipe_ingredients} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_Recipe_ingredients:e.target.value
                                    })}/>
                                </div> 
                                <div className="input-group input-lg">             
                                    <label>Instructions</label>   
                                    <input type="text" className="form-control" defaultValue={editedRecipe.edited_recipe_instructions} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_recipe_instructions:e.target.value
                                    })} />
                                </div>
                                <div className="input-group input-lg">             
                                    <label>Image</label>   
                                    <input type="file" className="form-control"  onChange={(e)=>handleUpload(e)} />
                                </div>
                                <div className="input-group input-lg">             
                                    <label>Recipe url</label>      
                                    <input type="url" className="form-control" defaultValue={editedRecipe.edited_url} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_url:e.target.value
                                    })}/>
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