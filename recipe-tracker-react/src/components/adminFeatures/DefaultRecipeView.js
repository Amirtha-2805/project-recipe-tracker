import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc,getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import "../../styles/default-recipe-view.css";


const DefaultRecipeView=()=>{
    let {id} = useParams();
    const[viewRecipe,setViewRecipe]=useState({
         view_recipe_name:"",
         view_category:"",
         view_recipe_ingredients:"",
         view_recipe_instructions:"",
         view_url:"",
         view_recipe_image:""

    })
    const viewDetails=()=>{
        getDoc(doc(db,"default_recipes",id)).then((docSnap)=>{
            if(docSnap.exists()){
                setViewRecipe({
                    view_recipe_name:docSnap.data()['recipe_name'],
                    view_category:docSnap.data()['category'],
                    view_recipe_ingredients:docSnap.data()['ingredients'],
                    view_recipe_instructions:docSnap.data()['instructions'],
                    view_recipe_image:docSnap.data()['recipe_image'],
                    view_url:docSnap.data()['recipe_url']
                })
            }
            console.log("view",viewRecipe)
        })
    }
    useEffect(()=>{
        viewDetails()
    },[])

    return(
            
        <>
            <center>
                <div className="view-body">
                    <h2 className="view-head">Here is a detailed Recipe..!</h2>
                    <img src={viewRecipe.view_recipe_image} width={"30%"} className="recipe-image"/>
                    <h3>{viewRecipe.view_recipe_name}</h3>
                    <div>
                        <h4>Category: {viewRecipe.view_category}</h4>
                    </div>
                    <div className="ingredients-container">                    
                        <h4>Ingredients</h4>                     
                        <p className="ingredients-para">{viewRecipe.view_recipe_ingredients}</p>
                    </div>
                    <div className="instruction">
                        <h4>Instructions</h4>
                        <p className="instruction-para">{viewRecipe.view_recipe_instructions}</p>
                    </div>
                    <div>
                        <p><Link to={viewRecipe.view_url}>Watch Video</Link></p>
                    </div>
                    <br/>
                    <button type="button" className="btn btn-warning">Save</button>
                </div>
            </center>
        </>

    )
}
export default DefaultRecipeView