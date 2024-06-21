import "../../styles/ingredientlist.css"
import { useEffect, useState } from "react";
import Ingredients from "./Ingredients";
import { useSelector,useDispatch } from 'react-redux';
import { adminFeatures } from "../../redux/slices/adminSlice";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import axios from "axios";



const IngredientList=()=>{
    const[ingredientList,setIngredientList]=useState([])
    const dispatch=useDispatch()
    
    const document=new jsPDF()

    const admin=useSelector((state)=>state.adminDetails)

    const getIngredients=async()=>{ 
        let admin_token=localStorage.getItem("admin_token")
        let parsed_admin_token=JSON.parse(admin_token) 
        const headers={"Authorization":`Bearer ${parsed_admin_token}`}           
        let getIngData=await axios.get("https://amirtha14.pythonanywhere.com/getingredients",{headers})
        setIngredientList(getIngData.data)
    }
    useEffect(()=>{
        getIngredients()
    },[])
   
    const deleteIngredient=(id)=>{
        axios.delete(`https://amirtha14.pythonanywhere.com/deleteingredient/${id}`)
        alert("ingredient deleted")
        getIngredients()

    }
    const generateIngPdf=()=>{
        const title="Ingredient List";
        const unit="pt";
        const size="A4";
        const orientation="potrait";
        const marginLeft=40
        const document=new jsPDF(orientation,unit,size)

        const headers=[["Ingredients"]]
        const data=ingredientList.map((ing)=> [ing.ingName])
        let content={
            startY:50,
            head:headers,
            body:data
        }
            document.text(title,marginLeft,40)
            document.autoTable(content)
            document.save("ingredient_list.pdf")
    }  
    
       return(
        <>
       
            <div className="ing-heading">
                <h1 className="ing-list">Ingredient List</h1>
            </div>
            <div className="add-ing-btn">
                <button type="button" className="btn btn-warning" id="addbtn" onClick={() => dispatch(adminFeatures("addIngredients"))}>Add Ingredients</button>
            </div>
            <div className="inglist-body">
                <table border="1" className="table table-dark table-striped-columns" id="ing-table">
                    <thead>
                        <tr>
                            <th>Ingredients</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ingredientList.map((list) => {
                                return (
                                    <tr>
                                        <td>{list.ingName}</td>
                                        <td><Link to={`/ingredientedit/${list.ingId}`}>Edit</Link></td>
                                        <td><Link onClick={()=>deleteIngredient(list.ingId)}>Delete</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        
        <br/>
        <center>
        <button className="btn btn-warning" id="dnbtn" onClick={generateIngPdf}>DownLoad PDF</button>
        </center>
    </>
    
       ) 

}





export default IngredientList