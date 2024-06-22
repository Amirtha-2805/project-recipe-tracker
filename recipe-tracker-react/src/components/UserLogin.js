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
        if(userLoginData.userlogin.email=="" || userLoginData.userlogin.password==""){
            alert("Please Enter Requirred Details")
        }  
        else{
            let loginForm=new FormData()
            loginForm.append("email",userLoginData.userlogin.email)
            loginForm.append("password",userLoginData.userlogin.password)
            let getUser= await axios.post("https://amirtha14.pythonanywhere.com/getuser",loginForm)
            console.log("user",getUser)
            localStorage.setItem("user_token",JSON.stringify(getUser.data[0].user_token))
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
          
    }        
    return(
        <>
            <NavBar/> 
            <div class="wrapper wrapper-full-page ">
<div className="full-page section-image" id="user-bg" filter-color="black" data-image="">
<div className="content">


    <div className="container">
        <div className="col-lg-4 col-md-6 ml-auto mr-auto">
            <form className="form" method="" action="">
                <div className="card card-login">
                    <div className="card-header ">
                        <div className="card-header ">
                            <h3 className="header text-center">Login</h3>
                        </div>
                    </div>
                    <div className="card-body ">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="nc-icon nc-single-02"></i>
                                </span>
                            </div>
                            <input type="email" className="form-control" placeholder="Enter Email..." onKeyUp={(e)=>dispatch(uLogin({
                                        ...userLoginData.userlogin,
                                        email:e.target.value
                                    }))}/>
                        </div>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="nc-icon nc-key-25"></i>
                                </span>
                            </div>
                            <input type="password" placeholder="Enter Password" className="form-control" onKeyUp={(e)=>dispatch(uLogin({
                                        ...userLoginData.userlogin,
                                        password:e.target.value
                                    }))}/>
                        </div>
                    </div>
                    <div className="card-footer ">
                        <button type='button' href="javascript:;" className="btn btn-warning btn-round btn-block mb-3" onClick={()=>userLogin()}>Login</button>
                        <br/>
                        <p className="user-para"> Not Registered yet? <Link to={"/signup"}>Register</Link></p>            
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