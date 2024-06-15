import { useState,useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../../styles/userlist.css";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default function UserList(){
    const[getUser,setGetUser]=useState([])
    const userList=async()=>{
        let admin_token=localStorage.getItem("admin_token")
        let parsed_admin_token=JSON.parse(admin_token) 
        const headers={"Authorization":`Bearer ${parsed_admin_token}`}    
        let getUserData=await axios.get("https://amirtha14.pythonanywhere.com/getalluser",{headers})
        setGetUser(getUserData.data)
    }
    const deleteUser=async (id)=>{
        await axios.delete(`https://amirtha14.pythonanywhere.com/deleteuser/${id}`)
        alert("deleted")
        userList()
    } 
    useEffect(()=>{
        userList()
    },[])   
    const generateUserPdf=()=>{
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
                                        <td><Link onClick={()=>deleteUser(users.user_id)}>Delete</Link></td> 
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