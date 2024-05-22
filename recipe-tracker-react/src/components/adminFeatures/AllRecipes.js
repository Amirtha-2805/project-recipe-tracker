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

    const deleteRecipe=(recipeId)=>{
        deleteDoc(doc(db,"default_recipes",recipeId))
        alert("recipe deleted")
        defaultRecipes()

    }



    // useEffect(()=>{      
    //     getRecipeList()       
    // },[])
    // const dispatch=useDispatch()
    // const getRecipeList=()=>{
    //     axios({
    //         method:"GET",
    //                     url:"https://jsonplaceholder.typicode.com/posts"
    //                 }).then((response)=>{
    //                     setGetRecipe(response.data)
    //                     console.log(response)                                        
    //         })        
    // }
    // const deleteRecipe=async(id)=>{
    //     const deleteData=await axios.delete(`https:jsonplaceholder.typicode.com/posts/${id}`)       
    //     setGetRecipe(getRecipe.filter((post)=>{if(post.id!=id){
    //         return true
    //     }}))
                
    //         }       
    const defaultRecipes=()=>{
            getDocs(collection(db,"default_recipes")).then((docSnap)=>{
                let recipes=[]
                docSnap.forEach((doc)=>{
                    recipes.push({...doc.data(),id:doc.id})
                })
                setGetRecipe(recipes)
            })
    }
    const generateRecipePdf=()=>{
        document.autoTable({html:'#recipe-list-table'})
        document.save("recipe-list.pdf")
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
                                    {recipes.category}
                                </td>
                                <td>
                                    {recipes.ingredients}
                                    
                                </td>
                                <td>
                                    {recipes.instructions}                                
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
                                    <Link to={`/recipeedit/${recipes.id}`}>Edit</Link>                                
                                </td>
                                <td>
                                    <Link onClick={()=>deleteRecipe(recipes.id)}>Delete</Link>                                
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