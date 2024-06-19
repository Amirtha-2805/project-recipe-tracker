import "../../styles/admin_feature_home.css";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminFeatureHome=()=>{
const[noOfUsers,setNoOfUsers]=useState([]) 
const[noOfIngredients,setNoOfIngredients]=useState([])
const[noOfMales,setNoOfMales]=useState("")  
const[noOfFemales,setNoOfFemales]=useState("")
const[totalRecipes,setTotalRecipes]=useState("")
const[veg,setVeg]=useState("")
const[nonVeg,setNonVeg]=useState("")

const numberOfUsers=async()=>{
    let admin_token=localStorage.getItem("admin_token")
    let parsed_admin_token=JSON.parse(admin_token) 
    const headers={"Authorization":`Bearer ${parsed_admin_token}`}
    let getUserData= await axios.get("https://amirtha14.pythonanywhere.com/getalluser",{headers})
    let no_of_males=[]
    let no_of_females=[]
    setNoOfUsers(getUserData.data)
    getUserData.data.forEach((each)=>{
       if(each.gender=="male"){
           no_of_males.push(each)
       }
       if(each.gender=="female"){
        no_of_females.push(each)
       }
    })
    setNoOfMales(no_of_males.length)
    setNoOfFemales(no_of_females.length)
     
} 
const totalIngredients=async()=>{
    let admin_token=localStorage.getItem("admin_token")
    let parsed_admin_token=JSON.parse(admin_token) 
    const headers={"Authorization":`Bearer ${parsed_admin_token}`}
    let getIngData=await axios.get("https://amirtha14.pythonanywhere.com/getingredients",{headers})
    // console.log("ing",getIngData)
    setNoOfIngredients(getIngData.data)
}

const totalDefaultRecipes=()=>{
    let admin_token=localStorage.getItem("admin_token")
    let parsed_admin_token=JSON.parse(admin_token) 
    const headers={"Authorization":`Bearer ${parsed_admin_token}`}

    axios.get("https://amirtha14.pythonanywhere.com/getdefault",{headers}).then((res)=>{
        let no_of_veg=[]
        let no_of_nonveg=[]
        setTotalRecipes(res.data)
        res.data.forEach((category)=>{
            if(category.recipe_category=="Vegeterian"){
                no_of_veg.push(category)
            }
           else if(category.recipe_category=="Non-vegeterian"){
                no_of_nonveg.push(category)
           }
        })
        setVeg(no_of_veg.length)
        setNonVeg(no_of_nonveg.length)
    })


}
useEffect(()=>{
    numberOfUsers()
    totalIngredients()
    totalDefaultRecipes()
},[])
// console.log("total",noOfIngredients)
return(
    <>
     <div className="dash-board-body">
            <div className="total">
                    <p className="total-head"><b>Total Users</b></p>
                    <h2 className="number"><b>{noOfUsers.length}</b></h2>
                    <p className="male-para">Males {noOfMales}</p>                   
                    <p className="female-para" >Females {noOfFemales}</p>
            </div>
            <div className="total-ingredients">
                    <p className="total-head"><b>Total ingredients</b></p>
                    <h2 className="number-of-ing"><b>{noOfIngredients.length}</b></h2>
            </div>
            <div className="total-recipe">
                    <p className="total-head"><b>Total Recipes</b></p>
                    <h2 className="number"><b>{totalRecipes.length}</b></h2>
                    <p className="veg-para">Veg {veg}</p>                   
                    <p className="nonveg-para">Non-veg {nonVeg}</p>
            </div>

        </div>       
    
        
    </>


)

}
export default AdminFeatureHome