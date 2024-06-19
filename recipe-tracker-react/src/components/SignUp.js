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
                       <div class="wrapper wrapper-full-page ">


<div className="full-page section-image" id="reg-bg" filter-color="black" data-image="">

<div className="content">
    <div className="container">
        <div className="col-lg-4 col-md-6 ml-auto mr-auto">
            <form className="form" method="" action="">
                <div className="card card-login">
                    <div className="card-header ">
                        <div className="card-header ">
                            <h3 className="header text-center">Register</h3>
                        </div>
                    </div>
                    <div className="card-body ">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="nc-icon nc-single-02"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="Enter Name..." onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        name:e.target.value
                                    }))}/>
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                <i class="fa-regular fa-envelope"></i>
                                </span>
                            </div>
                            <input type="email" placeholder="Enter Email..." className="form-control" onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        email:e.target.value
                                    }))}/>
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="nc-icon nc-key-25"></i>
                                </span>
                            </div>
                            <input type="password" placeholder="Enter password..." className="form-control" onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        password:e.target.value
                            }))}/>
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="nc-icon nc-key-25"></i>
                                </span>
                            </div>
                            <input type="password" placeholder="Confirm password..." className="form-control" onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        confirm_password:e.target.value
                                    }))}/>
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                <i class="fa-regular fa-user"></i>
                                </span>
                            </div>
                            <input type="number" placeholder="Enter age..." className="form-control" onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        age:e.target.value
                                    }))}/>
                        </div>
                        <div className="input-group" id="gender">
                            <div className="input-group-prepend">
                                {/* <span className="input-group-text">
                                <i className="nc-icon nc-single-02"></i>

                                </span> */}
                            </div>
                            <input type="radio" name="gender" value="male" id="inputData" onChange={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        gender:e.target.value
                                    }))}/><h6  id="gender-text">Male</h6>
                                     <input type="radio" name="gender" value="female" id="inputData" onChange={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        gender:e.target.value
                                    }))}/><h6  id="gender-text">Female</h6>                            
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                <i class="fa-regular fa-address-book"></i>
                                </span>
                            </div>
                            <input type="text" placeholder="Enter address..." className="form-control" onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        address:e.target.value
                                    }))}/>
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                <i class="fa-solid fa-phone"></i>
                                </span>
                            </div>
                            <input type="text" placeholder="Enter phone..." className="form-control" onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        phone:e.target.value
                                    }))}/>
                        </div>


                    </div>
                    <div className="card-footer ">
                        <button type='button' href="javascript:;" className="btn btn-warning btn-round btn-block mb-3" onClick={()=>register()}>Register</button>
                        <p>Already have an account?  <Link to={"/userlogin"} >Login</Link></p>                                     
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</div>

</div>
             <Footer/>                       
        </>

    )
}