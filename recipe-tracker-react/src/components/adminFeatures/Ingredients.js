import { useState } from "react";
import "../../styles/ingredients.css";
import axios from "axios";

const Ingredients=()=>{

    const[inputIngredients,setInputIngredients]=useState({ingredients:""})
    let ingformData=new FormData();
    ingformData.append("ingredients",inputIngredients.ingredients)
           
    const submitIngredients=()=>{
        axios.post("https://amirtha14.pythonanywhere.com/setingList",ingformData)           
        alert("ingredient added")
        document.getElementById("ingInputBox").value=""         
    }
    return(
        <>
            
            <div className="ingredient-container">
                <h2 className="ing-head">Ingredients</h2>
                <div className="input-btn">
                    <div className="ing-input">
                     <div class="input-group input-lg">
                        <form className="input-form">
                            <input type="text" class="form-control" id="ingInputBox" placeholder="Enter ingredients" className="form-control" onKeyUp={(e)=>setInputIngredients({
                            ingredients:e.target.value
                        })}/>
                        </form>
                    </div>
                    </div>
                  
                    <button type="button" className="btn btn-primary" onClick={()=>submitIngredients()} style={{width:"10%",marginTop:"20px",marginLeft:"-70px"}}>Submit</button>
                 
                </div>                
            </div>
                           
        </>
    )
}
export default Ingredients;