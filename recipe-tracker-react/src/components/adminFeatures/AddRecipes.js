import { setAddRecipes } from "../../redux/slices/adminSlice"
import { useSelector,useDispatch } from 'react-redux';
import "../../styles/addrecipes.css";
import Select from 'react-select'
import { useState } from "react";
import { imagesDb } from "../../firebase";
import {v4} from 'uuid';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";



const AddRecipes=()=>{
    const dispatch=useDispatch()
    const[isSelected,setIsSelected]=useState("")
    const[image,setImage]=useState("")
    const dbref=collection(db,"default_recipes")
    const adminFeaturesSliceData=useSelector((state)=>state.adminDetails)
    let categories=[{value:"Vegeterian",
                     label:"Vegeterian"
                    },
                    {value:"Non-vegeterian",
                     label:"Non-vegeterian"   
                    }]
      
                   
    const submitRecipe=()=>{
        console.log("detailed recipe",adminFeaturesSliceData.addRecipes.recipe_details)
        const addDefaultRecipes=addDoc(dbref,{category:isSelected.label,
            ingredients:adminFeaturesSliceData. addRecipes.ingredients,
            instructions:adminFeaturesSliceData.addRecipes.recipe_details,
            recipe_name:adminFeaturesSliceData.addRecipes.recipe_title,
            recipe_image:image     

      })
    }  

    const handleChange=(selected)=>{
        setIsSelected(selected)
    }

    const handleUpload=(e)=>{
        // console.log("image",e.target.files[0])
        const imgs=ref(imagesDb,`recipe_images/${v4()}`)
        uploadBytes(imgs,e.target.files[0]).then(data=>{
            console.log("images",data)
            getDownloadURL(data.ref).then((imgUrl)=>{
                setImage(imgUrl)
            })
        })
    }

                 
    return(
        <>
        <div className="add">
            <h1 className="add-recipe-heading">Add Recipes</h1> 
            <div className="input-container">           

            <div>
                <label>Select Category</label>
                 <div className="select-box">
                    <Select options={categories}  placeholder="Select category" onChange={handleChange}/>                
                </div>

                <label>Recipe Title</label>
                    <input type="text" className="form-control" placeholder="Enter Recipe Title" onKeyUp={(e)=>dispatch(setAddRecipes({
                    ...adminFeaturesSliceData.addRecipes,
                    recipe_title:e.target.value
                }))}></input>
            </div>
            <div>
               <label>Ingredients</label>
                <input type="text" className="form-control" placeholder="Enter Recipe ingredients" onKeyUp={(e)=>dispatch(setAddRecipes({
                    ...adminFeaturesSliceData.addRecipes,
                    ingredients:e.target.value
                }))}></input>
            </div>
            <div>
            <label>Recipe Details</label>

                <textarea type="text" className="form-control" placeholder="Enter Recipe details" onKeyUp={(e)=>dispatch(setAddRecipes({
                    ...adminFeaturesSliceData.addRecipes,
                    recipe_details:e.target.value
                }))}></textarea>
            </div>
                      
            <div class="mb-3">
                <label for="formFileSm" className="form-label">Choose Recipe Image</label>
                <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={(e)=>handleUpload(e)}/>
            </div>
            </div>
            <div className="recipe-submit-button">
                <button type="button" className="btn btn-warning" onClick={submitRecipe}>Submit</button>
            </div>
           
            </div>

        </>
    )
}
export default AddRecipes