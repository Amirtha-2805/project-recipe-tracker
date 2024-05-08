import '../styles/adminlogin.css'
import { useNavigate } from "react-router-dom";
import NavBar from './Menu';
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import Select from 'react-select'
import { useEffect, useState } from 'react';
import { setAdminId } from '../redux/slices/adminSlice';
import { useSelector,useDispatch } from 'react-redux';



export default function LoginAdmin(){
    const navigate = useNavigate();
    const[adminEmail,setAdminEmail]=useState("")
    const[adminPassword,setAdminPassword]=useState("")
    const adminFirerbaseId=useSelector((state)=>state.adminDetails)
    const[adminFirebaseData,setAdminFirebaseData]=useState({email:"",
    password:""})
    let dispatch=useDispatch()
    
    getDocs(collection(db,"admin_login_details")).then(docSnap=>{
        docSnap.forEach((doc)=>{
            dispatch(setAdminId(doc.id))                
        })
    })
    console.log("idd",adminFirerbaseId.adminId)
    
    const getAdminData=()=>{
        let getFireBaseData=getDocs(collection(db,"admin_login_details")).then((docSnap)=>{
                       docSnap.forEach((doc)=>{
               setAdminFirebaseData({...doc.data(),email:doc.data().email,password:doc.data().password})
               
                 })
        })
    }
    console.log("adminnnnn",adminFirebaseData)  

        useEffect(()=>{
            getAdminData()
        },[])

    const adminLogin=()=>{
            
            if(adminEmail==adminFirebaseData.email && adminPassword==adminFirebaseData.password){
                  alert("Logged in succesfully")
                  navigate("/adminhome")   
            }
            else{
                alert("Please Enter  correct email and passowrd")
            }
            
     }
    return(

        <>
            <div className='admin-login-body'>
                <NavBar/>
                <div className='admin'>
                <center><h3 className='admintitle'>Admin Login</h3></center>
                <div className="adminlogin">
                    <div>
                        <label className='admin-login-label'>Email</label><input type="email" className="form-control" onKeyUp={(e)=>setAdminEmail(e.target.value)} placeholder="Enter your email"/>
                    </div>
                    <div>
                        <label className='admin-login-label'>Password</label><input type="password" className="form-control" onKeyUp={(e)=>setAdminPassword(e.target.value)} placeholder="Enter your password"/>
                    </div>
                    <br/>
                    <div className='adminloginbtn'>
                        <button className='btn btn-primary' onClick={adminLogin}>Login</button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}