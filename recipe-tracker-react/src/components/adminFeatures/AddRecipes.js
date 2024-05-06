import { setAddRecipes } from "../../redux/slices/adminSlice"
import { useSelector,useDispatch } from 'react-redux';
import "../../styles/addrecipes.css";
import Select from 'react-select'



const AddRecipes=()=>{
    const dispatch=useDispatch()
    const adminFeaturesSliceData=useSelector((state)=>state.adminDetails)
    let categories=[{value:"Vegeterian",
                     label:"Vegeterian"
                    },
                    {value:"Non-vegeterian",
                     label:"Non-vegeterian"   
                    }]
    return(
        <>
        <div className="add">
            <h1 className="add-recipe-heading">Add Recipes</h1> 
            <div className="input-container">           

            <div>
                <label>Select Category</label>
                 <div>
                    <Select options={categories} className="select-box" placeholder="Select category"/>                
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

                <input type="text" className="form-control" placeholder="Enter Recipe details" onKeyUp={(e)=>dispatch(setAddRecipes({
                    ...adminFeaturesSliceData.addRecipes,
                    recipe_details:e.target.value
                }))}></input>
            </div>
            
            </div>
            <div className="recipe-submit-button">
                <button type="button" className="btn btn-warning">Submit</button>
            </div>
           
            </div>

        </>
    )
}
export default AddRecipes