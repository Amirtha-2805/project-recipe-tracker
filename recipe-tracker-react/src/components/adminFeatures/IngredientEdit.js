import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc,getDoc } from "firebase/firestore";
import "../../styles/ingredient_edit.css"
import { useDispatch } from "react-redux";
import { adminFeatures } from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";


const IngredientEdit=()=>{
    const dispatch=useDispatch();
    let navigate=useNavigate();    
    let {id} = useParams();

    const[editedIngredient,setEditedIngredient]=useState({
        edited_ingredient:""
    })

    const editIngredient=()=>{
        getDoc(doc(db,"ingredients",id)).then((docSnap)=>{
            if(docSnap.exists()){
                setEditedIngredient({
                    edited_ingredient:docSnap.data()['ingredients']
                }
                )
            }
        })
    }
    useEffect(()=>{
        editIngredient()
    },[])

    const updateIngredient=()=>{
       updateDoc(doc(db,"ingredients",id),{
         ingredients:editedIngredient.edited_ingredient
       })
       alert("Ingredient updated")
       dispatch(adminFeatures("ingredientList"))
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
                <button type="button" className="btn btn-danger" onClick={updateIngredient}>Update</button>
                </div>

            </div>
            </center>
        </>
    )
}
export default IngredientEdit