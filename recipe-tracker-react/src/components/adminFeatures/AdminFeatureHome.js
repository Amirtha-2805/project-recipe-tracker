import "../../styles/admin_feature_home.css";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import { useState } from "react";

const AdminFeatureHome=()=>{
const[noOfUsers,setNoOfUsers]=useState("") 
const[noOfIngredients,setNoOfIngredients]=useState("")
const[noOfMales,setNoOfMales]=useState("")  
const[noOfFemales,setNoOfFemales]=useState("") 
getDocs(collection(db,"user_signup_details")).then((docSnap)=>{
   let total_users=[]
   let no_of_males=[]
   let no_of_females=[]
    docSnap.forEach((doc)=>{
        // console.log("data",doc.data())
        total_users.push(doc.data())
        if(doc.data().gender=="male" || doc.data().gender=="Male"){
            no_of_males.push(doc.data())
        }
        if(doc.data().gender=="female" || doc.data().gender=="Female"){
            no_of_females.push(doc.data())
        }
        
    })
    setNoOfUsers(total_users.length)
    setNoOfMales(no_of_males.length)
    setNoOfFemales(no_of_females.length)
    


})
getDocs(collection(db,"ingredients")).then((docSnap)=>{
    let total_ingredients=[]
    docSnap.forEach((doc)=>{
        // console.log(doc.data())
        total_ingredients.push(doc.data())
    })
    setNoOfIngredients(total_ingredients.length)
})
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

        </div>
    </>


)

}
export default AdminFeatureHome