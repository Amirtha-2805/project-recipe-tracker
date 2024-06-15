import { setAddRecipes } from "../../redux/slices/adminSlice"
import { useSelector,useDispatch } from 'react-redux';
import "../../styles/addrecipes.css";
import Select from 'react-select'
import { useState } from "react";
import { adminFeatures } from "../../redux/slices/adminSlice";
import Footer from "../Footer";
import axios from "axios";


const AddRecipes=()=>{
    const dispatch=useDispatch()
    const[isSelected,setIsSelected]=useState("")
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

   
const handleChange=(selected)=>{
    setIsSelected(selected)
}
    
const [selectedFile, setSelectedFile] = useState(null);  

const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
};
const handleSubmit = async (event) => {
            let admin_token=localStorage.getItem("admin_token")
            let parsed_admin_token=JSON.parse(admin_token) 
            const headers={"Authorization":`Bearer ${parsed_admin_token}`}
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
             
              const response = await axios.post('https://amirtha14.pythonanywhere.com/upload', formData,{headers});
              console.log('File uploaded successfully');
              alert("Recipe submitted successfully")
              setIsSelected("")
              document.getElementById("recipe_name").value=""
              document.getElementById("ingredients").value=""
              document.getElementById("instructions").value=""
              document.getElementById("recipe_url").value=""
              document.getElementById("image").value=""
              document.getElementById("iframe").value=""
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
                             <Select options={categories} placeholder="Select category" onChange={handleChange} id="category"/>                
                         </div>
                     </div>
                    <div className="input-group input-lg">
                        <label>Recipe Name</label>
                        <input type="text" className="form-control" placeholder="Enter Recipe Title" id="recipe_name" onKeyUp={(e)=>dispatch(setAddRecipes({
                            ...adminFeaturesSliceData.addRecipes,
                            recipe_title:e.target.value
                        }))}/>
                    </div>
                    <div className="input-group input-lg">
                        <label>Ingredients</label> 
                        <input type="text" className="form-control" placeholder="Enter Recipe ingredients" id="ingredients" onKeyUp={(e)=>dispatch(setAddRecipes({
                            ...adminFeaturesSliceData.addRecipes,
                            ingredients:e.target.value
                        }))}/>
                    </div>
                    <div className="input-group input-lg">
                        <label>Recipe Details</label>
                        <textarea type="text" className="form-control" placeholder="Enter Recipe details" id="instructions" onKeyUp={(e)=>dispatch(setAddRecipes({
                            ...adminFeaturesSliceData.addRecipes,
                            recipe_details:e.target.value
                        }))}></textarea>
                    </div>
                    <div className="input-group input-lg" style={{color:"white"}}>
                        <label>Recipe image</label>
                        <input type="file" onChange={handleFileChange} id="image"/>
                    </div>
                    <div className="input-group input-lg">
                        <label>Recipe url</label> 
                        <input type="url" className="form-control" id="recipe_url" placeholder="Enter Recipe link" onKeyUp={(e)=>dispatch(setAddRecipes({
                            ...adminFeaturesSliceData.addRecipes,
                            recipe_url:e.target.value
                        }))}/>
                    </div>
                    <div className="input-group input-lg">
                        <label>Recipe Iframe</label> 
                        <input type="url" className="form-control" id="iframe" placeholder="Enter Recipe link" onKeyUp={(e)=>dispatch(setAddRecipes({
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
         <Footer/>       
    </>
    
    )
}

export default AddRecipes