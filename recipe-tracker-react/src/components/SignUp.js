import NavBar from "./Menu"
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { signup } from "../redux/slices/userSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { setToken,setIsLogged,setFinalPwd } from "../redux/slices/userSlice";
import Footer from "./Footer";
import axios from "axios";

export default function SignUp(){
    const signupdata=useSelector((state)=>state.userDetails)    
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const dbref=collection(db,"user_signup_details");
    const[pwd,setPwd]=useState("")
    let signupForm=new FormData()
        signupForm.append("name",signupdata.usersignup.name)
        signupForm.append("email",signupdata.usersignup.email)
        signupForm.append("password",signupdata.usersignup.password)
        signupForm.append("age",signupdata.usersignup.age)
        signupForm.append("gender",signupdata.usersignup.gender)
        signupForm.append("address",signupdata.usersignup.address)
        signupForm.append("phone",signupdata.usersignup.phone)

        
    const register=async()=>{
        
        if((signupdata.usersignup.email=="" || signupdata.usersignup.password=="" || signupdata.usersignup.confirm_password=="" || signupdata.usersignup.phone=="" || signupdata.usersignup.age=="" || signupdata.usersignup.name=="" || signupdata.usersignup.gender=="")){
            alert("Please fill requirred details")
        }
       
       else if (signupdata.usersignup.password==signupdata.usersignup.confirm_password){
            await axios.post("https://amirtha14.pythonanywhere.com/usersignup",signupForm)
            alert("Registered succesfully")
            navigate(`/userlogin`)
        }
        
        else{
            alert("Error")
        }       
    }       
    return(
        <>           
            <NavBar/>
            <center>
                <div class="card-body">
               
                    <div className="signup-input">
                        <h3 class="card-title" style={{color:"white"}}>Register</h3>
                        <br/>
            

                        <div className="signup-box">
                            <br/>
                            <div className="signup-body">
                             <form id="signup-form">
                                <div class="input-group input-lg">              
                                    <label>Name</label> 
                                    
                                    <input type="text" class="form-control" placeholder="Enter Name..." id="inputData" onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        name:e.target.value
                                    }))}/>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Email</label>  
                                    <input type="email" class="form-control" placeholder="Enter email..."   onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        email:e.target.value
                                    }))}/>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Password</label> 
                                    <input type="password" class="form-control" placeholder="Enter password..."  onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        password:e.target.value
                                    }))}/>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Confirm Password</label> 
                                    <input type="password" class="form-control" placeholder="Confirm password..."  onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        confirm_password:e.target.value
                                    }))}/>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Age</label> 
                                    <input type="text" class="form-control" placeholder="Enter age..."   onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        age:e.target.value
                                    }))}/>
                                </div>
                                 <div class="input-group input-lg" id="gender">
                                    <label>Gender</label>
                                    <input type="radio" name="gender" value="male" id="inputData" onChange={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        gender:e.target.value
                                    }))}/><h6  id="gender-text">Male</h6>
                                     <input type="radio" name="gender" value="female" id="inputData" onChange={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        gender:e.target.value
                                    }))}/><h6  id="gender-text">Female</h6>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Address</label> 
                                    <input type="text" class="form-control" placeholder="Enter address..." id="inputData" onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        address:e.target.value
                                    }))}/>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Phone</label>
                                    <input type="text" class="form-control" placeholder="Enter phone..." id="inputData" onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        phone:e.target.value
                                    }))}/>
                                </div>
                                </form>
            

                            </div>
                            
                            
                            <br/>
                            <div className="signupbtn">
                                <button className="btn btn-success" type="button" onClick={()=>register()} style={{marginLeft:"-80px"}}>Register</button>
                                <br/>                
                            </div>
                            <p className="para" style={{marginLeft:"-20px"}}>Already have an account?  <Link to={"/userlogin"} >Login</Link></p> 
                           
                        </div>
                    </div>
                </div>
            </center>
             <Footer/>                       
        </>

    )
}