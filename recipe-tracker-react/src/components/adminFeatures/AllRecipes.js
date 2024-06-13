import { setAddRecipes } from "../../redux/slices/adminSlice"
import { useSelector,useDispatch } from 'react-redux';
import { useState,useEffect } from "react";
import axios from 'axios'
import "../../styles/allrecipes.css"
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { jsPDF } from "jspdf";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import autoTable from 'jspdf-autotable'


export default function AllRecipes(){
    const[getRecipe,setGetRecipe]=useState([])
    const document=new jsPDF({orientation:"landscape"})

    const deleteRecipe=(recipeid)=>{
        axios.delete(`https://amirtha14.pythonanywhere.com/deletedefault/${recipeid}`)
        alert("Recipe deleted")
        defaultRecipes()
    }


    const defaultRecipes=()=>{
            axios.get("https://amirtha14.pythonanywhere.com/getdefault").then((res)=>{
                setGetRecipe(res.data)
            })
    }
    const generateRecipePdf=()=>{
        // document.autoTable({html:'#recipe-list-table'})
        // document.save("recipe-list.pdf")

        const title="Recipe List";
        const unit="pt";
        const size="A4";
        const orientation="potrait";
        const marginLeft=40
        const document=new jsPDF(orientation,unit,size)

        const headers=[["Recipe Name","Category","Ingredients","Instructions"]]
        const data=getRecipe.map((recipe)=> [recipe.recipe_name,recipe.recipe_category,recipe.recipe_ingredients,recipe.recipe_instructions])
        let content={
            startY:50,
            head:headers,
            body:data
        }
            document.text(title,marginLeft,40)
            document.autoTable(content)
            document.save("recipe_list.pdf")

    }      
    useEffect(()=>{
        defaultRecipes()
    },[])

   
    return(
        <>
        <div className="allrecipe-body">
        <div className="allrecipe-head">
           <h1 >All Recipes</h1>  
           </div >
           

        <div className="all-recipe-table">
        <table border="1" className="table table-bordered" id="recipe-list-table" >
            
            <thead>
                <tr>
                    <th>Recipe Name</th>
                    <th>Category</th>
                    <th>Ingredients</th>
                    <th>Instructions</th> 
                    <th>Image</th>
                    <th>Recipe url</th> 
                    <th>Recipe iframe</th>  
                    <th>Edit</th>
                    <th>Delete</th>             
                </tr>
            </thead>
            <tbody>       
                {getRecipe.map((recipes,i)=>{                                                   
                    return(           
                        <>                                             
                            <tr  key={i}  >                        
                                <td >
                                    {recipes.recipe_name}
                                </td>
                                <td>
                                    {recipes.recipe_category}
                                </td>
                                <td>
                                    {recipes.recipe_ingredients}
                                    
                                </td>
                                <td>
                                    {recipes.recipe_instructions}                                
                                </td>
                                <td>
                                    {recipes.recipe_image}                                
                                </td>
                                <td>
                                    {recipes.recipe_url}                                
                                </td>
                                <td>
                                    {recipes.recipe_iframe}                                
                                </td>
                                <td>
                                    <Link to={`/recipeedit/${recipes.recipeId}`}>Edit</Link>                                
                                </td>
                                <td>
                                    <Link onClick={()=>deleteRecipe(recipes.recipeId)}>Delete</Link>                                
                                </td>                            
                            </tr>
                        </>
                    )            
    })}
            </tbody>
        </table> 
        </div> 
        <br/>
        <center>
        <button className="btn btn-warning" onClick={generateRecipePdf}>DownLoad PDF</button>
        </center>
        </div>
        
        </>

    )
}