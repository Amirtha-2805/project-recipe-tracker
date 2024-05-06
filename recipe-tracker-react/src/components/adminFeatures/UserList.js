import { useState,useEffect } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import "../../styles/userlist.css"


export default function UserList(){
    const[getUser,setGetUser]=useState([])
    useEffect(()=>{      
        getUserList()       
    },[])
    const getUserList=()=>{
        axios({
            method:"GET",
                        url:"https://jsonplaceholder.typicode.com/posts"
                    }).then((response)=>{
                        setGetUser(response.data)
                        console.log(response)                                        
            })        
    }
    const deleteUser=async(id)=>{
        const deleteData=await axios.delete(`https:jsonplaceholder.typicode.com/posts/${id}`)       
        setGetUser(getUser.filter((post)=>{if(post.id!=id){
            return true
        }}))
                
            }       
    return(
        <>
            <h2 className="user-list-head">User List</h2>
            <div className="user-list-table">
            <table border="1" className="table table-bordered" >            
            <thead>
                <tr>
                    <th>UserId</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Body</th>                   
                    <th>Delete</th>             
                </tr>
            </thead>
        <tbody>       
            {getUser.map((users,i)=>{                                                   
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
                                <Link onClick={()=>deleteUser(users.id)}>Delete</Link>                                
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