import { useState,useEffect,useRef } from "react";
import axios from 'axios';
import { addDoc,collection,updateDoc,deleteDoc,doc,getDocs} from "firebase/firestore";
import { Link } from "react-router-dom";
import "../../styles/userlist.css";
import { db } from "../../firebase";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';



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
    const deleteUser=(userId)=>{
        deleteDoc(doc(db,"user_signup_details",userId))
        alert("deleted")
        userList()
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
   
    const generateUserPdf=()=>{
    //     document.autoTable({html:"#userlist-table"})
    //     document.save("list-of-users.pdf")

        const title="User List";
        const unit="pt";
        const size="A4";
        const orientation="potrait";
        const marginLeft=40
        const document=new jsPDF(orientation,unit,size)

        const headers=[["Name","Email","Age","Gender","Address","Phone"]]
        const data=getUser.map((users)=> [users.name,users.email,users.age,users.gender,users.address,users.phone])
        let content={
            startY:50,
            head:headers,
            body:data
        }
            document.text(title,marginLeft,40)
            document.autoTable(content)
            document.save("users_list.pdf")
        } 

    return(
        <>
        <div className="user-body">
            <h2 className="user-list-head">User List</h2>
            <div className="user-list-table">
                <table border="1" className="table table-striped" id="userlist-table">
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
            <br/>
            <center>
        <button className="btn btn-warning" onClick={generateUserPdf}>DownLoad PDF</button>
        </center>    
           

        </div>
    </>
               
    )
    

          
   
}