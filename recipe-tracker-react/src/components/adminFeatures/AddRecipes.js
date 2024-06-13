import { setAddRecipes } from "../../redux/slices/adminSlice"
import { useSelector,useDispatch } from 'react-redux';
import "../../styles/addrecipes.css";
import Select from 'react-select'
import { useEffect, useState } from "react";
import { imagesDb } from "../../firebase";
import {v4} from 'uuid';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import { adminFeatures } from "../../redux/slices/adminSlice";
import Footer from "../Footer";
import axios from "axios";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";



const AddRecipes=()=>{
    const dispatch=useDispatch()
    const[isSelected,setIsSelected]=useState("")
    const[image,setImage]=useState("")
    const[fbimg,setfbimg]=useState([])
    const dbref=collection(db,"default-recipe-images")
    const adminFeaturesSliceData=useSelector((state)=>state.adminDetails)
    let categories=[{value:"Vegeterian",
                     label:"Vegeterian"
                    },
                    {value:"Non-vegeterian",
                     label:"Non-vegeterian"   
                    }
                ]
    let defaultForm=new FormData()
    defaultForm.append("recipe_name",adminFeaturesSliceData.addRecipes.recipe_title)
    defaultForm.append("recipe_category",isSelected.label) 
    defaultForm.append("recipe_ingredients",adminFeaturesSliceData.addRecipes.ingredients)
    defaultForm.append("recipe_instructions",adminFeaturesSliceData.addRecipes.instructions)
    defaultForm.append("recipe_image",image)
    defaultForm.append("recipe_url",adminFeaturesSliceData.addRecipes.recipe_url)
    defaultForm.append("recipe_iframe",adminFeaturesSliceData.addRecipes.recipe_iframe)


    const submitRecipe=async()=>{
    //     const addDefaultRecipes=addDoc(dbref,{
    //         recipe_images:image,
    //         recipe_name:adminFeaturesSliceData.addRecipes.recipe_title,
    //         recipe_category:isSelected.label             
    //   })
    //     let addDefault= await axios.post("https://amirtha14.pythonanywhere.com/defaultrecipes",defaultForm)
    //     console.log("add",addDefault)
        
          alert("Recipe added")
          dispatch(adminFeatures("addRecipes"))          
    }

   
        const handleChange=(selected)=>{
            setIsSelected(selected)
        }
    
        const [selectedFile, setSelectedFile] = useState(null);  

        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
          };

        const handleSubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append('file', selectedFile)
            formData.append("recipe_name",adminFeaturesSliceData.addRecipes.recipe_title)
            formData.append("recipe_category",isSelected.label)
            formData.append("recipe_ingredients",adminFeaturesSliceData.addRecipes.ingredients)
            formData.append("recipe_instructions",adminFeaturesSliceData.addRecipes.recipe_details)
            formData.append("recipe_url",adminFeaturesSliceData.addRecipes.recipe_url)
            formData.append("recipe_iframe",adminFeaturesSliceData.addRecipes.recipe_iframe)
        
            try {
             
              const response = await axios.post('https://amirtha14.pythonanywhere.com/upload', formData, {
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
       
         <div className="add-body">
            <h1 className="add-recipe-heading">Add Recipes</h1> 
            <div className="input-container">           
                <div className="recipe-input">
                  <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
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
                    <div className="input-group input-lg" style={{color:"white"}}>
                        <label>Recipe image</label>
                        <input type="file" onChange={handleFileChange}/>
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
                    <div className="recipe-submit-button">
                        <button type="submit" className="btn btn-warning" id="add-submit-btn">Submit</button>
                    </div>
                    </form>
                </div>
                <center>
               
                </center>
            </div>
        </div>  
         {/* <Footer/> */}
         {/* <center>
         <div>
            <h2>Upload File</h2>
                <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange}/>
                    <button type="submit">Upload</button>
                </form>
         </div>
         </center> */}

    

       
    </>
    
    )
}

export default AddRecipes