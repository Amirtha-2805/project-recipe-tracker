import "../../styles/ingredientlist.css"
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Ingredients from "./Ingredients";
import { useSelector,useDispatch } from 'react-redux';
import { adminFeatures } from "../../redux/slices/adminSlice";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'



const IngredientList=()=>{
    const[ingredientList,setIngredientList]=useState([])
    const dispatch=useDispatch()
    
    const document=new jsPDF()

    const admin=useSelector((state)=>state.adminDetails)

    const getIngredients=()=>{       
        getDocs(collection(db,"ingredients")).then((docSnap)=>{
            let list=[]
            docSnap.forEach((doc)=>{
                list.push({...doc.data(),id:doc.id})
            })
            setIngredientList(list)

        })
        // console.log(ingredientList)

    }
    useEffect(()=>{
        getIngredients()
    },[])
   
    const deleteIngredient=(ingId)=>{
        deleteDoc(doc(db,"ingredients",ingId))
        alert("ingredient deleted")
        getIngredients()

    }
    const generateIngPdf=()=>{
        document.autoTable({html:'#ing-table'})
        document.save("ingredients-list.pdf")
    }  
    
       return(
        <>
        <center>
            <div className="ing-heading">
                <h1 className="ing-list">Ingredient List</h1>
            </div>
            <div className="add-ing-btn">
                <button type="button" className="btn btn-warning" id="addbtn" onClick={() => dispatch(adminFeatures("addIngredients"))}>Add Ingredients</button>
            </div>
            <div className="inglist-body">
                <table border="1" className="table table-striped" id="ing-table">
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
                                        <td>{list.ingredients}</td>
                                        <td><Link to={`/ingredientedit/${list.id}`}>Edit</Link></td>
                                        <td><Link onClick={() => deleteIngredient(list.id)}>Delete</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        </center>
        <br/>
        <center>
        <button className="btn btn-warning" id="dnbtn" onClick={generateIngPdf}>DownLoad PDF</button>
        </center>
    </>
    
       ) 

}





export default IngredientList