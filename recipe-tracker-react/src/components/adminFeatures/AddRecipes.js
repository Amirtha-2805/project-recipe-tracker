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
import { adminFeatures } from "../../redux/slices/adminSlice";
import Footer from "../Footer";



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
                    }
                ]
                   
    const submitRecipe=()=>{
        console.log("detailed recipe",adminFeaturesSliceData.addRecipes.recipe_details)
        const addDefaultRecipes=addDoc(dbref,{category:isSelected.label,
            ingredients:adminFeaturesSliceData.addRecipes.ingredients,
            instructions:adminFeaturesSliceData.addRecipes.recipe_details,
            recipe_name:adminFeaturesSliceData.addRecipes.recipe_title,
            recipe_image:image,
            recipe_url:adminFeaturesSliceData.addRecipes.recipe_url,
            recipe_iframe:adminFeaturesSliceData.addRecipes.recipe_iframe   
      })
      
      alert("Recipe added")
      dispatch(adminFeatures("addRecipes"))
     
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
        <div className="add-body">
            <h1 className="add-recipe-heading">Add Recipes</h1> 
            <div className="input-container">           
                <div className="recipe-input">
                    <div className="select">
                        <label>Select Category</label>
                        <div className="select-box">
                            <Select options={categories} placeholder="Select category" onChange={handleChange}/>                
                        </div>
                    </div>
                    <div className="input-group input-lg">
                        <label>Recipe Name</label>
                        <input type="text" className="form-control" placeholder="Enter Recipe Title" onKeyUp={(e)=>dispatch(setAddRecipes({
                            ...adminFeaturesSliceData.addRecipes,
                            recipe_title:e.target.value
                        }))}/>
                    </div>
                    <div className="input-group input-lg">
                        <label>Ingredients</label> 
                        <input type="text" className="form-control" placeholder="Enter Recipe ingredients" onKeyUp={(e)=>dispatch(setAddRecipes({
                            ...adminFeaturesSliceData.addRecipes,
                            ingredients:e.target.value
                        }))}/>
                    </div>
                    <div className="input-group input-lg">
                        <label>Recipe Details</label>
                        <textarea type="text" className="form-control" placeholder="Enter Recipe details" onKeyUp={(e)=>dispatch(setAddRecipes({
                            ...adminFeaturesSliceData.addRecipes,
                            recipe_details:e.target.value
                        }))}></textarea>
                    </div>
                    <div className="input-group input-lg">
                        <label>Recipe image</label>
                        <input type="file" className="form-control" placeholder="Enter Recipe Title" onChange={(e)=>handleUpload(e)}/>
                    </div>
                    <div className="input-group input-lg">
                        <label>Recipe url</label> 
                        <input type="url" className="form-control" placeholder="Enter Recipe link" onKeyUp={(e)=>dispatch(setAddRecipes({
                            ...adminFeaturesSliceData.addRecipes,
                            recipe_url:e.target.value
                        }))}/>
                    </div>
                    <div className="input-group input-lg">
                        <label>Recipe Iframe</label> 
                        <input type="url" className="form-control" placeholder="Enter Recipe link" onKeyUp={(e)=>dispatch(setAddRecipes({
                            ...adminFeaturesSliceData.addRecipes,
                            recipe_iframe:e.target.value
                        }))}/>
                    </div>
                </div>
                <center>
                <div className="recipe-submit-button">
                    <button type="button" className="btn btn-warning" id="add-submit-btn" onClick={submitRecipe}>Submit</button>
                </div>
                </center>
            </div>
        </div>
        <Footer/>
    </>
    
    )
}
export default AddRecipes