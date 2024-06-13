import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/default-recipe-view.css";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import axios from "axios";

const DefaultRecipeView=()=>{
    let navigate=useNavigate()
    let {id} = useParams();
    const[viewRecipe,setViewRecipe]=useState({
         view_recipe_name:"",
         view_category:"",
         view_recipe_ingredients:"",
         view_recipe_instructions:"",
         view_url:"",
         view_recipe_image:"",
         view_recipe_iframe:""

    })
    const viewDetails=async(paramId)=>{
       await axios.get(`https://amirtha14.pythonanywhere.com/viewrecipe/${paramId}`).then((res)=>{
        setViewRecipe({
            view_recipe_name:res.data[0].recipe_name,
            view_category:res.data[0].recipe_category,
            view_recipe_ingredients:res.data[0].recipe_ingredients,
            view_recipe_instructions:res.data[0].recipe_instructions,
            view_url:res.data[0].recipe_url,
            view_recipe_image:res.data[0].recipe_image,
            view_recipe_iframe:res.data[0].recipe_iframe
        })
       })            
    }
    useEffect(()=>{
        viewDetails(id)
    },[])

    return(
            
        <>
            <center>
            <button id="home-link-admin" type="button" onClick={()=>navigate("/")}><FaHome className="home-icon" /> Home</button>

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
                        <iframe width="560" height="315" src={viewRecipe.view_recipe_iframe}></iframe>
                        <p><Link to={viewRecipe.view_url}>YouTube</Link></p>
                    </div>
                    <br/>
                </div>
            </center>
            <Footer/>
        </>

    )
}
export default DefaultRecipeView