import "../../styles/admin_feature_home.css";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import { useEffect, useState } from "react";

const AdminFeatureHome=()=>{
const[noOfUsers,setNoOfUsers]=useState("") 
const[noOfIngredients,setNoOfIngredients]=useState("")
const[noOfMales,setNoOfMales]=useState("")  
const[noOfFemales,setNoOfFemales]=useState("")
const[totalRecipes,setTotalRecipes]=useState("")
const[veg,setVeg]=useState("")
const[nonVeg,setNonVeg]=useState("")

const numberOfUsers=()=>{
    getDocs(collection(db,"user_signup_details")).then((docSnap)=>{
        let total_users=[]
        let no_of_males=[]
        let no_of_females=[]
         docSnap.forEach((doc)=>{
             // console.log("data",doc.data())
             total_users.push(doc.data())
             if(doc.data().gender=="male"){
                 no_of_males.push(doc.data())
             }
             if(doc.data().gender=="female"){
                 no_of_females.push(doc.data())
             }
             
         })
         setNoOfUsers(total_users.length)
         setNoOfMales(no_of_males.length)
         setNoOfFemales(no_of_females.length)     
     })
     
} 
const totalIngredients=()=>{
    getDocs(collection(db,"ingredients")).then((docSnap)=>{
        let total_ingredients=[]
        docSnap.forEach((doc)=>{
            // console.log(doc.data())
            total_ingredients.push(doc.data())
        })
        setNoOfIngredients(total_ingredients.length)
    })
}

const totalDefaultRecipes=()=>{
    getDocs(collection(db,"default_recipes")).then((docSnap)=>{
        let total_recipes=[]
        let no_of_veg=[]
        let no_of_nonveg=[]
         docSnap.forEach((doc)=>{
             // console.log("data",doc.data())
             total_recipes.push(doc.data())
             if(doc.data().category=="Vegeterian"){
                 no_of_veg.push(doc.data())
             }
             if(doc.data().category=="Non-vegeterian"){
                 no_of_nonveg.push(doc.data())
             }
             
         })
         setTotalRecipes(total_recipes.length)
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
                    <h2 className="number"><b>{noOfUsers}</b></h2>
                    <p className="male-para">Males {noOfMales}</p>                   
                    <p className="female-para" >Females {noOfFemales}</p>
            </div>
            <div className="total-ingredients">
                    <p className="total-head"><b>Total ingredients</b></p>
                    <h2 className="number-of-ing"><b>{noOfIngredients}</b></h2>
            </div>
            <div className="total-recipe">
                    <p className="total-head"><b>Total Recipes</b></p>
                    <h2 className="number"><b>{totalRecipes}</b></h2>
                    <p className="veg-para">Veg {veg}</p>                   
                    <p className="nonveg-para">Non-veg {nonVeg}</p>
            </div>

        </div>
    </>


)

}
export default AdminFeatureHome