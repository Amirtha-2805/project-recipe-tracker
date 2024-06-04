import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ingredient_edit.css"
import { useDispatch } from "react-redux";
import { adminFeatures } from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


const IngredientEdit=()=>{
    const dispatch=useDispatch();
    let navigate=useNavigate();    
    let {id} = useParams();
    const adminData=useSelector((state)=>state.adminDetails)
   


    const[editedIngredient,setEditedIngredient]=useState({
        edited_ingredient:""
    })

    const editIngredient=async(paramId)=>{
        let getExisting=await axios.get(`https://amirtha14.pythonanywhere.com/geting/${paramId}`)
        getExisting.data.forEach((data)=>{
           setEditedIngredient({
            edited_ingredient:data.ingName
           })
        })
    }
    useEffect(()=>{
        editIngredient(id)
    },[id])

    let formData=new FormData()
    formData.append("ingName",editedIngredient.edited_ingredient)

    const updateIng=()=>{
        axios.put(`https://amirtha14.pythonanywhere.com/editing/${id}`,formData) 
        alert("Updated")  
        // dispatch(adminFeatures("ingredientList"))
        navigate("/adminhome")   
    }
   
    return(
        <>
        <center>
            <div className="ing-edit-body">
                <div className="ingredient-container-body">
                <h2 className="edit-ing-head">Edit Ingredient</h2>
                <div className="edit-ing">                              

                <div class="input-group input-lg">
                    <input type="text" className="form-control" defaultValue={editedIngredient.edited_ingredient} onKeyUp={(e)=>setEditedIngredient({
                        ...editedIngredient,
                        edited_ingredient:e.target.value
                    })}/>
                    </div>
                </div>
                <br/>
                <button type="button" className="btn btn-danger" onClick={()=>updateIng()}>Update</button>
                </div>

            </div>
            </center>
        </>
    )
}
export default IngredientEdit