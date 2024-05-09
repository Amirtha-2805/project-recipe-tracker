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
   
    const register= async()=>{
        await createUserWithEmailAndPassword(auth,signupdata.usersignup.email,signupdata.usersignup.password)
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
            <div className="singupbody">

                <NavBar/>
                <center><h3 className="signuphead">Register</h3></center>
                <div className="input">
                    <div>
                        <label className="signuplabel">Name</label><input type="text" className="form-control" placeholder="Enter your name" onKeyUp={(e)=>dispatch(signup({
                            ...signupdata.usersignup,
                            name:e.target.value
                        }))}/>
                    </div>
                    <div>
                        <label className="signuplabel">Email</label><input type="email" className="form-control" placeholder="Enter your email"  onKeyUp={(e)=>dispatch(signup({
                            ...signupdata.usersignup,
                            email:e.target.value
                        }))}/>
                    </div>
                    <div>
                        <label className="signuplabel">Password</label><input type="password" className="form-control" placeholder="Enter your password"  onKeyUp={(e)=>dispatch(signup({
                            ...signupdata.usersignup,
                            password:e.target.value
                        }))}/>
                    </div>

                    <div>
                        <label className="signuplabel">Age</label><input type="number" className="form-control" placeholder="Enter your age"  onKeyUp={(e)=>dispatch(signup({
                            ...signupdata.usersignup,
                            age:e.target.value
                        }))}/>
                    </div>
                                <div>
                        <label className="signuplabel">Gender</label><input type="text" className="form-control" placeholder="Enter your gender"  onKeyUp={(e)=>dispatch(signup({
                            ...signupdata.usersignup,
                            gender:e.target.value
                        }))}/>
                    </div>
                    <div>
                    <div>
                        <label className="signuplabel">Address</label><input type="text" className="form-control" placeholder="Enter your address"  onKeyUp={(e)=>dispatch(signup({
                            ...signupdata.usersignup,
                            address:e.target.value
                        }))}/>
                    </div>

                        <label className="signuplabel">Phone</label><input type="text" className="form-control" placeholder="Enter your contact number"  onKeyUp={(e)=>dispatch(signup({
                            ...signupdata.usersignup,
                            phone:e.target.value
                        }))}/>
                    </div>
                    <br/>
                    <div className="signupbtn">
                        <button className="btn btn-success" onClick={()=>register()}>Register</button>
                        <br/>                
                    </div>
                    <p className="para">Already have an account? <Link to={"/userlogin"}>Login</Link></p>                     

                </div>
            </div>
        </>

    )
}