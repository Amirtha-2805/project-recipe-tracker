import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import "../styles/userlogin.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NavBar from "./Menu";
import { setToken,setIsLogged, setUserAllDetails,uLogin } from "../redux/slices/userSlice";
import { useEffect} from "react";
import { db } from "../firebase";
import { addDoc,collection,updateDoc,deleteDoc,getDocs,doc,getDoc } from "firebase/firestore";



export default function Userlogin(){
    
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const userLoginData=useSelector((state)=>state.userDetails);

    const userLogin=()=>{       
       signInWithEmailAndPassword(auth,userLoginData.userlogin.email,userLoginData.userlogin.password) 
        .then((useCredential)=>{
            const user=useCredential.user
            // console.log(useCredential) 
            if(user.email==userLoginData.userlogin.email){
                alert("Logged in successfully")
                dispatch(setToken(user.accessToken)) 
                getDocs(collection(db,"user_signup_details")).then((docSnap)=>{  
                    docSnap.forEach((doc)=>{
                        if(user.email==doc.data().email){
                        dispatch(setUserAllDetails({
                            user_name:doc.data().name,
                            user_email:doc.data().email,
                            user_pasword:doc.data().password,
                            user_age:doc.data().age,
                            user_gender:doc.data().gender,
                            user_address:doc.data().address,
                            user_phone:doc.data().phone
                          }))                            
                        }
                    })               
                }) 
                dispatch(setIsLogged(true))
                 if(userLoginData.aiLog==true){
                         navigate(`/`)                    
                 }
                 else{
                    navigate("/userhome")
                 }
            } 
            
           
         }) 
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.message;
            alert("Invalid email or password")
        })            
    }
        
    return(
        <>
            <NavBar/> 
            <center>
                <div className="card-body">
                    <div className="login-input">       
                        <h3 className="card-title" style={{color:"white"}}>Login</h3>
                        <br/>
                        <div className="login-box">
                            <br/>
                            <div className="login-body">
                                <div className="input-group input-lg">               
                                    <label>Email</label>    
                                    <input type="text" className="form-control" placeholder="Enter email..." onKeyUp={(e)=>dispatch(uLogin({
                                        ...userLoginData.userlogin,
                                        email:e.target.value
                                    }))}/>
                                </div>
                                <div className="input-group input-lg">             
                                    <label>Password</label> 
                                    <input type="password" className="form-control" placeholder="Enter Password..." onKeyUp={(e)=>dispatch(uLogin({
                                        ...userLoginData.userlogin,
                                        password:e.target.value
                                    }))}/>
                                </div>    
                            </div>   
                            <br/>          
                            <div className="loginbtn">
                                <button className='btn btn-primary' onClick={userLogin}>Login</button>
                                <br/>
                                <p className="user-para"> Not Registered yet? <Link to={"/signup"}>Register</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </>
    )
}