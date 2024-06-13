import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import "../styles/userlogin.css";
import NavBar from "./Menu";
import { setToken,setIsLogged, setUserAllDetails,uLogin } from "../redux/slices/userSlice";
import { useEffect, useReducer} from "react";
import Footer from "./Footer";
import axios from "axios";



export default function Userlogin(){
    
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const userLoginData=useSelector((state)=>state.userDetails);

    const userLogin=async()=>{          
            let loginForm=new FormData()
            loginForm.append("email",userLoginData.userlogin.email)
            loginForm.append("password",userLoginData.userlogin.password)
            let getUser= await axios.post("https://amirtha14.pythonanywhere.com/getuser",loginForm)
            console.log("user",getUser)
           dispatch(setUserAllDetails({
                                    id:getUser.data[0].user_id,
                                    user_name:getUser.data[0].name,
                                    user_email:getUser.data[0].email,
                                    user_pasword:getUser.data[0].password,
                                    user_age:getUser.data[0].age,
                                    user_gender:getUser.data[0].gender,
                                    user_address:getUser.data[0].address,
                                    user_phone:getUser.data[0].phone
                                  }))
            dispatch(setIsLogged(true))
            alert("Logged in successfully")
            if(userLoginData.aiLog==true){
                    navigate(`/`)                    
                }
            else{
                navigate("/userhome")
                }
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
                                <form>
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
                                </form>    
                            </div>   
                            <br/>          
                            <div className="loginbtn">
                                <button className='btn btn-primary' type="button" onClick={()=>userLogin()}>Login</button>
                                <br/>
                                <p className="user-para"> Not Registered yet? <Link to={"/signup"}>Register</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
            <Footer/>
        </>
    )
}