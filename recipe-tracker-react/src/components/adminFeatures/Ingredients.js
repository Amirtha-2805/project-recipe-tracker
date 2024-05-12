import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import "../../styles/ingredients.css"

const Ingredients=()=>{

    const[inputIngredients,setInputIngredients]=useState({ingredients:""})
    const[fireBaseIngredients,setFireBaseIngredients]=useState("")
    const dbref=collection(db,"ingredients")
           
    const submitIngredients=async ()=>{
        addDoc(dbref,inputIngredients)
        alert("ingredient added")       
    }
    return(
        <>
            
            <div className="ingredient-container">
                <h2 className="ing-head">Ingredients</h2>
                <div className="input-btn">
                    <div className="ing-input">
                     <div class="input-group input-lg">
                                    <input type="text" class="form-control" placeholder="Enter ingredients" className="form-control" onKeyUp={(e)=>setInputIngredients({
                            ingredients:e.target.value
                        })}/>
                    </div>
                    </div>
                    <div className="submitbtn">
                        <button type="button" className="btn btn-primary" onClick={submitIngredients}>Submit</button>
                    </div>
                </div>                
            </div>
                           
        </>
    )
}
export default Ingredients;