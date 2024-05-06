import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import {uLogin} from "../redux/slices/userSlice";
import "../styles/userlogin.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NavBar from "./Menu";
import { setToken,setIsLogged } from "../redux/slices/userSlice";
import { useEffect } from "react";


export default function Userlogin(){
    
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const userLoginData=useSelector((state)=>state.userDetails)
    const userLogin=()=>{       
        signInWithEmailAndPassword(auth,userLoginData.userlogin.email,userLoginData.userlogin.password) 
        .then((useCredential)=>{
            const user=useCredential.user
            console.log(useCredential) 
            if(user.email==userLoginData.userlogin.email){
                 navigate("/userhome")
            } 
            dispatch(setToken(user.accessToken))  
            console.log("success",user.email)
         }) 
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
            console.log("Error",errorCode.errorMessage)
            alert("Invalid email or password")
        })     
        
    }
   
    return(
        <>
            <div className="userlogin-body">
                <NavBar/>
                <div className="userlogin">
                    <center><h3 className="ulogin">User Login</h3></center>
                    <div className="adminlogin">
                        <div>
                            <label className="user-login-label">Email</label><input type="email" className="form-control" placeholder="Enter your email" onKeyUp={(e)=>dispatch(uLogin({
                                ...userLoginData.userlogin,
                                email:e.target.value
                            }))}/>
                        </div>
                        <div>
                            <label className="user-login-label">Password</label><input type="password" className="form-control" placeholder="Enter your password" onKeyUp={(e)=>dispatch(uLogin({
                                ...userLoginData.userlogin,
                                password:e.target.value
                            }))}/>
                        </div>
                        <br/>
                        <center>
                            <div className="loginbtn">
                                <button className='btn btn-primary' onClick={userLogin}>Login</button>
                                <br/>
                                <p className="user-para"> Not Registered yet? <Link to={"/signup"}>Register</Link></p>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        </>
    )
}