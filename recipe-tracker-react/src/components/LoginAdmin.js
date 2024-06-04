import '../styles/adminlogin.css'
import { useNavigate } from "react-router-dom";
import NavBar from './Menu';
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import Select from 'react-select'
import { useEffect, useState } from 'react';
import { setAdminId } from '../redux/slices/adminSlice';
import { useSelector,useDispatch } from 'react-redux';
import Footer from './Footer';


export default function LoginAdmin(){
    const navigate = useNavigate();
    const[adminEmailPwd,setAdminEmailPwd]=useState({
        email:"",
        password:""
    })
    const adminFirerbaseId=useSelector((state)=>state.adminDetails)
    const[adminFirebaseData,setAdminFirebaseData]=useState({email:"",
    password:""})
    let dispatch=useDispatch()
    
    // getDocs(collection(db,"admin_login_details")).then(docSnap=>{
    //     docSnap.forEach((doc)=>{
    //         dispatch(setAdminId(doc.id))                
    //     })
    // })
    // console.log("idd",adminFirerbaseId.adminId)
    // console.log("admin",adminEmailPwd)
    const getAdminData=()=>{
               getDocs(collection(db,"admin_login_details")).then((docSnap)=>{
                       docSnap.forEach((doc)=>{
                         setAdminFirebaseData({...doc.data(),email:doc.data().email,password:doc.data().password})
                         dispatch(setAdminId(doc.id))                               
                 })
        })
    }
    // console.log("adminnnnn",adminFirebaseData)  

        useEffect(()=>{
            getAdminData()
        },[])

    const adminLogin=()=>{
            
            if(adminEmailPwd.email==adminFirebaseData.email && adminEmailPwd.password==adminFirebaseData.password){
                  alert("Logged in succesfully")
                  navigate("/adminhome")   
            }
            else{
                alert("Please Enter  correct email and passowrd")
            }
            
     }
    return(

        <>
            <NavBar/>    
            <center>
            <div className="card-body">
                <div className="admin-input">  
                    <h3 className="admin-title" style={{color:"white",marginTop:"-10px"}}>Admin Login</h3>
                    <br/>
                    <div className='admin-box'>
                        <br/>
                        <div className='admin-body'>
                            <div className="input-group input-lg">                             
                                <label>Email</label><input type="email" className="form-control" placeholder="Enter email..." onKeyUp={(e)=>setAdminEmailPwd({
                                    ...adminEmailPwd,
                                    email: e.target.value})} />      
                            </div>
                            <div className="input-group input-lg">             
                                <label>Password</label><input type="password" className="form-control" placeholder="Enter Password..." onKeyUp={(e)=>setAdminEmailPwd({
                                    ...adminEmailPwd,
                                    password:e.target.value})}/>
                            </div> 
                        </div>
                        <br/>
                        <div className='adminloginbtn'>
                            <button className='btn btn-primary' style={{marginLeft:"-90px"}} onClick={adminLogin}>Login</button>
                        </div>   
                        <br/>             
                    </div>
                </div>
            </div>
        </center>
        <Footer/>
    </>
    
    )
}