// // import { useParams } from "react-router-dom";
// // import { db } from "../../firebase";
// // import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc,getDoc } from "firebase/firestore";
// // import { useState,useEffect } from "react";


// // const UserEdit=()=>{
// //     let {id} = useParams();
// //     const[userName,setUserName]=useState("")
// //     const[userEmail,setUserEmail]=useState("")
// //     const[userPassword,setUserPassword]=useState("")
// //     const[userAge,setUserAge]=useState("")
// //     const[userAddress,setUserAddress]=useState("")
// //     const[userGender,setUserGender]=useState("")
// //     const[userPhone,setUserPhone]=useState("")

// //     const editUser=()=>{
// //         getDoc(doc(db,"user_signup_details",id)).then((docSnap)=>{
// //             let u_name=""
// //             let u_email=""
// //             let u_pwd=""
// //             let u_address=""
// //             let u_gender=""
// //             let u_phone=""
// //             let u_age=""
// //             if(docSnap.exists()){
// //                 u_name=docSnap.data()['name']
// //                 u_email=docSnap.data()['email']
// //                 u_pwd=docSnap.data()['password']
// //                 u_address=docSnap.data()['address']
// //                 u_gender=docSnap.data()['gender']
// //                 u_phone=docSnap.data()['phone']
// //                 u_age=docSnap.data()['age']
// //             }
// //             setUserName(u_name)
// //             setUserEmail(u_email)
// //             setUserPassword(u_pwd)
// //             setUserGender(u_gender)
// //             setUserAddress(u_address)
// //             setUserPhone(u_phone)
// //             setUserAge(u_age)
// //         })
// //     }
// //     useEffect(()=>{
// //         editUser()
// //     },[])

// // return(
// //     <>
// //         <h2>Edit User</h2>
// //         <div>
// //             <label>Name</label>
// //             <input type="text" defaultValue={userName}/>
// //         </div>
// //         <div>
// //             <label>Email</label>
// //             <input type="email" defaultValue={userEmail}/>
// //         </div>
// //         <div>
// //             <label>Password</label>
// //             <input type="text" defaultValue={userPassword}/>
// //         </div>
// //         <div>
// //             <label>Address</label>
// //             <input type="text" defaultValue={userName}/>
// //         </div>
    
// //     </>

// // )



// }
// export default UserEdit