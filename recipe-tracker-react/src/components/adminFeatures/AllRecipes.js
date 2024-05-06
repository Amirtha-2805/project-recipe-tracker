import { setAddRecipes } from "../../redux/slices/adminSlice"
import { useSelector,useDispatch } from 'react-redux';
import { useState,useEffect } from "react";
import axios from 'axios'
import "../../styles/allrecipes.css"
import { Link } from "react-router-dom";

export default function AllRecipes(){
    const[getRecipe,setGetRecipe]=useState([])

    useEffect(()=>{      
        getRecipeList()       
    },[])
    const dispatch=useDispatch()
    const getRecipeList=()=>{
        axios({
            method:"GET",
                        url:"https://jsonplaceholder.typicode.com/posts"
                    }).then((response)=>{
                        setGetRecipe(response.data)
                        console.log(response)                                        
            })        
    }
    const deleteRecipe=async(id)=>{
        const deleteData=await axios.delete(`https:jsonplaceholder.typicode.com/posts/${id}`)       
        setGetRecipe(getRecipe.filter((post)=>{if(post.id!=id){
            return true
        }}))
                
            }       
    
    return(
        <>
        <div className="allrecipe-head">
           <h1 >All Recipes</h1>  
           </div>
           
           <div className="all-recipe-table">
           <table border="1" className="table table-bordered" >
            
        <thead>
            <tr>
                <th>UserId</th>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>   
                <th>Edit</th>
                <th>Delete</th>             
            </tr>
        </thead>
        <tbody>       
            {getRecipe.map((users,i)=>{                                                   
                return(           
                     <>                                             
                        <tr  key={i}  >                        
                            <td >
                                {users.userId}
                            </td>
                            <td>
                                {users.id}
                            </td>
                            <td>
                                {users.title}
                                
                            </td>
                            <td>
                                {users.body}                                
                            </td>
                            <td>
                                <Link to={"/"}>Edit</Link>                                
                            </td>
                            <td>
                                <Link onClick={()=>deleteRecipe(users.id)}>Delete</Link>                                
                            </td>
                           
                        </tr>
                    </>
                )            
 })}
        </tbody>
        </table> 
        </div>
        
        </>

    )
}