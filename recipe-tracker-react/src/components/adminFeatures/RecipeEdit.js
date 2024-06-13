import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc,getDoc } from "firebase/firestore";
import { useState,useEffect } from "react";
import "../../styles/recipe_edit.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imagesDb } from "../../firebase";
import {v4} from 'uuid';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AllRecipes from "./AllRecipes";
import { useDispatch } from "react-redux";
import { adminFeatures } from "../../redux/slices/adminSlice";
import axios from "axios";
const RecipeEdit=()=>{
    let {id} = useParams();
    let dispatch=useDispatch()
    const adminSlice=useSelector((state)=>state.adminDetails)
    let navigate=useNavigate()
    const[recipeImage,setRecipeImage]=useState("")
    const[editedRecipe,setEditedRecipe]=useState({
        edited_recipe_name:"",
        edited_recipe_category:"",
        edited_Recipe_ingredients:"",
        edited_recipe_instructions:"",
        edited_image:"",
        edited_url:"",
        edited_iframe:""
    })

    const edit=(paramid)=>{
        axios.get(`https://amirtha14.pythonanywhere.com/viewrecipe/${paramid}`).then((res)=>{
            setEditedRecipe({
                edited_recipe_name:res.data[0].recipe_name,
                edited_recipe_category:res.data[0].recipe_category,
                edited_Recipe_ingredients:res.data[0].recipe_ingredients,
                edited_recipe_instructions:res.data[0].recipe_instructions,
                edited_image:res.data[0].recipe_image,
                edited_url:res.data[0].recipe_url,
                edited_iframe:res.data[0].recipe_iframe
            })
        })

}
let editForm= new FormData()
const updateRecipe=()=>{
    // updateDoc(doc(db,"default_recipes",id),{
    //     recipe_name:editedRecipe.edited_recipe_name,
    //     category:editedRecipe.edited_recipe_category,
    //     ingredients:editedRecipe.edited_Recipe_ingredients,
    //     instructions:editedRecipe.edited_recipe_instructions,
    //     recipe_image:recipeImage,
    //     recipe_url:editedRecipe.edited_url,
    //     recipe_iframe:editedRecipe.edited_iframe
    // })  
    // alert("recipe updated")
    // navigate("/adminhome")   


}


useEffect(()=>{
    edit(id)
},[id])


        const [selectedFile, setSelectedFile] = useState(null);  

        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
        };
        const handleSubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append('file', selectedFile)
            formData.append("recipe_name",editedRecipe.edited_recipe_name)
            formData.append("recipe_category",editedRecipe.edited_recipe_category)
            formData.append("recipe_ingredients",editedRecipe.edited_Recipe_ingredients)
            formData.append("recipe_instructions",editedRecipe.edited_recipe_instructions)
            formData.append("recipe_url",editedRecipe.edited_url)
            formData.append("recipe_iframe",editedRecipe.edited_iframe)

            try {
            
            const response = await axios.put(`https://amirtha14.pythonanywhere.com/editdefault/${id}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Response:', response.data);
            console.log('File uploaded successfully');
            } catch (error) {
            console.error('Error uploading file:', error);
            }
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
                               <form method="PUT" encType="multipart/form-data" onSubmit={handleSubmit}> 
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
                                    <img src={editedRecipe.edited_image} width={"20%"}/>                                      
                                    <input type="file" className="form-control"  onChange={handleFileChange} />
                                </div>
                                <div className="input-group input-lg">             
                                    <label>Recipe url</label>      
                                    <input type="url" className="form-control" defaultValue={editedRecipe.edited_url} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_url:e.target.value
                                    })}/>
                                </div> 
                                <div className="input-group input-lg">             
                                    <label>Recipe iframe</label>      
                                    <input type="url" className="form-control" defaultValue={editedRecipe.edited_iframe} onKeyUp={(e)=>setEditedRecipe({
                                        ...editedRecipe,
                                        edited_iframe:e.target.value
                                    })}/>
                                </div> 
                                <div>
                                    <button type="submit" className="btn btn-danger">Update</button>
                                 </div>
                            
                                </form>
                            </div> 
                            <br/>
                           
                            <br/>
                        </div>
                    </div>
                </div>
            </center>
           
        </>


)

}




export default RecipeEdit