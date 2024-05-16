import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc,getDoc } from "firebase/firestore";


const IngredientEdit=()=>{
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
    }
    return(
        <>
            <h1>Edit Ingredient</h1>
            <input type="text" defaultValue={editedIngredient.edited_ingredient} onKeyUp={(e)=>setEditedIngredient({
                ...editedIngredient,
                edited_ingredient:e.target.value
            })}/>
            <button type="button" onClick={updateIngredient}>Update</button>
        </>
    )
}
export default IngredientEdit