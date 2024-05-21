import NavBar from "./Menu"
import "../styles/signup.css"
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { signup } from "../redux/slices/userSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc } from "firebase/firestore";
import { useEffect } from 'react';
import { setToken,setIsLogged } from "../redux/slices/userSlice";

export default function SignUp(){
    const signupdata=useSelector((state)=>state.userDetails)    
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const dbref=collection(db,"user_signup_details")
   
    const register=()=>{
         createUserWithEmailAndPassword(auth,signupdata.usersignup.email,signupdata.usersignup.password)
        .then((useCredential)=>{
            const user =useCredential.user;
            console.log("useCredential",useCredential)
            const addToFirebase= addDoc(dbref,{name:signupdata.usersignup.name,
                                              email:signupdata.usersignup.email,          
                                              password:signupdata.usersignup.password,
                                              age:signupdata.usersignup.age,
                                              gender:signupdata.usersignup.gender,
                                              address:signupdata.usersignup.address,
                                              phone:signupdata.usersignup.phone,
                                              uid:user.uid})
              
            dispatch(setToken(user.accessToken)) 
            
            // console.log("token",user.accessToken)       
            alert("Successfully Registered")
            navigate(`/userlogin`)
        })
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
            console.log(errorCode,errorMessage)
            if((signupdata.usersignup.email=="" || signupdata.usersignup.password==""||signupdata.usersignup.phone==""||signupdata.usersignup.age==""||signupdata.usersignup.name==""||signupdata.usersignup.gender=="")||(signupdata.usersignup.email=="" && signupdata.usersignup.password=="" && signupdata.usersignup.phone==""&&signupdata.usersignup.age=="" && signupdata.usersignup.name==""&& signupdata.usersignup.gender=="")){
                alert("Please fill requirred details")
            }
        })
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
                                <div class="input-group input-lg">              
                                    <label>Name</label> 
                                    <input type="text" class="form-control" placeholder="Enter Name..." onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        name:e.target.value
                                    }))}/>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Email</label>  
                                    <input type="email" class="form-control" placeholder="Enter email..."  onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        email:e.target.value
                                    }))}/>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Password</label> 
                                    <input type="password" class="form-control" placeholder="Enter password..." onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        password:e.target.value
                                    }))}/>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Age</label> 
                                    <input type="text" class="form-control" placeholder="Enter age..." onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        age:e.target.value
                                    }))}/>
                                </div>
                                {/* <div class="input-group input-lg">
                                    <label>Gender</label>
                                    <input type="text" class="form-control" placeholder="Enter gender..." onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        gender:e.target.value
                                    }))}/>
                                </div> */}
                                 <div class="input-group input-lg" id="gender">
                                    <label>Gender</label>
                                    <input type="radio" name="gender" value="male" onChange={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        gender:e.target.value
                                    }))}/><h6  id="gender-text">Male</h6>
                                     <input type="radio" name="gender" value="female" onChange={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        gender:e.target.value
                                    }))}/><h6  id="gender-text">Female</h6>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Address</label> 
                                    <input type="text" class="form-control" placeholder="Enter address..."  onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        address:e.target.value
                                    }))}/>
                                </div>
                                <div class="input-group input-lg">
                                    <label>Phone</label>
                                    <input type="text" class="form-control" placeholder="Enter phone..." onKeyUp={(e)=>dispatch(signup({
                                        ...signupdata.usersignup,
                                        phone:e.target.value
                                    }))}/>
                                </div>
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

        </>

    )
}