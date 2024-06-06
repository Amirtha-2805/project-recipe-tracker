import '../styles/adminlogin.css'
import { useNavigate } from "react-router-dom";
import NavBar from './Menu';
import { useEffect, useState } from 'react';
import { setAdmin, setAdminDetails, setAdminId, setName } from '../redux/slices/adminSlice';
import { useSelector,useDispatch } from 'react-redux';
import Footer from './Footer';
import axios from 'axios';


export default function LoginAdmin(){
    const navigate = useNavigate();
    const[adminEmailPwd,setAdminEmailPwd]=useState({
        email:"",
        name:""
    })
    const adminGlobal=useSelector((state)=>state.adminDetails)
    let dispatch=useDispatch()

    const adminLogin=async()=>{
        let adminForm=new FormData()
        adminForm.append("admin_email",adminGlobal.adminLogin.admin_email)
        adminForm.append("admin_pwd",adminGlobal.adminLogin.admin_pwd)
        let getAdmin= await axios.post("https://amirtha14.pythonanywhere.com/adminlogin",adminForm)
        dispatch(setAdminDetails({
            admin_id:getAdmin.data[0].admin_id,
            admin_name:getAdmin.data[0].admin_name,
            admin_email:getAdmin.data[0].admin_email
        }))        
            alert("Logged in succesfully")
                navigate("/adminhome")        
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
                            <form>
                            <div className="input-group input-lg">                             
                                <label>Email</label><input type="email" className="form-control" placeholder="Enter email..." onKeyUp={(e)=>dispatch(setAdmin({
                                    ...adminGlobal.adminLogin,
                                    admin_email:e.target.value}))} />      
                            </div>
                            <div className="input-group input-lg">             
                                <label>Password</label><input type="password" className="form-control" placeholder="Enter Password..." onKeyUp={(e)=>dispatch(setAdmin({
                                    ...adminGlobal.adminLogin,
                                    admin_pwd:e.target.value}))}/>
                            </div>
                            </form> 
                        </div>
                        <br/>
                        <div className='adminloginbtn'>
                            <button className='btn btn-primary' style={{marginLeft:"-90px"}}type='button' onClick={()=>adminLogin()}>Login</button>
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