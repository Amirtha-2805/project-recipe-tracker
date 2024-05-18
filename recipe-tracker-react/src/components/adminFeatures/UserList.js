import { useState,useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import "../../styles/userlist.css";
import { db } from "../../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";


export default function UserList(){
    const[getUser,setGetUser]=useState([])
    const userList=()=>{
        getDocs(collection(db,"user_signup_details")).then((docSnap)=>{
            let user_list=[]
            docSnap.forEach((doc)=>{
                user_list.push({...doc.data(),id:doc.id})
            })
        setGetUser(user_list)
        })

    }
    useEffect(()=>{
        userList()
    },[])
    // console.log("user",getUser)
    // useEffect(()=>{      
    //     getUserList()       
    // },[])
    // const getUserList=()=>{
    //     axios({
    //         method:"GET",
    //                     url:"https://jsonplaceholder.typicode.com/posts"
    //                 }).then((response)=>{
    //                     setGetUser(response.data)
    //                     console.log(response)                                        
    //         })        
    // }
    // const deleteUser=async(id)=>{
    //     const deleteData=await axios.delete(`https:jsonplaceholder.typicode.com/posts/${id}`)       
    //     setGetUser(getUser.filter((post)=>{if(post.id!=id){
    //         return true
    //     }}))
                
    //         }
    const deleteUser=(userId)=>{
        deleteDoc(doc(db,"user_signup_details",userId))
        alert("deleted")
    }       
    return(
        <>
        <div className="user-body">
            <h2 className="user-list-head">User List</h2>
            <div className="user-list-table">
                <table border="1" className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getUser.map((users, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{users.name}</td>
                                        <td>{users.email}</td> 
                                        <td>{users.age}</td> 
                                        <td>{users.gender}</td>
                                        <td>{users.address}</td> 
                                        <td>{users.phone}</td> 
                                        <td><Link onClick={()=>deleteUser(users.id)}>Delete</Link></td> 
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>            
            </div>
        </div>
    </>
               
    )
    

          
   
}