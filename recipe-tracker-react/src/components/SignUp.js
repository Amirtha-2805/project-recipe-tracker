import NavBar from "./Menu"
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { signup } from "../redux/slices/userSlice";
import { useEffect, useState } from 'react';
import Footer from "./Footer";
import axios from "axios";
import emailjs from 'emailjs-com';

export default function SignUp(){
    const signupdata=useSelector((state)=>state.userDetails)    
    const navigate = useNavigate();
    const dispatch=useDispatch();
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
        if (
        signupdata.usersignup.email == "" ||
        signupdata.usersignup.password == "" ||
        signupdata.usersignup.confirm_password == "" ||
        signupdata.usersignup.phone == "" ||
        signupdata.usersignup.age == "" ||
        signupdata.usersignup.name == "" ||
        signupdata.usersignup.gender == ""
    ) {
        alert("Please fill required details");
        return;
    }

    if (signupdata.usersignup.password != signupdata.usersignup.confirm_password) {
        alert("Password and confirm password do not match");
        return;
    }

    axios.post("https://amirtha14.pythonanywhere.com/usersignup", signupForm)
        .then(() => {
            const emailParams = {
                to_name: signupdata.usersignup.name,
                from_name: "Recipe_tracker",
                message: `Dear ${signupdata.usersignup.name} 
                I hope this message finds you well. My name is Amirtha, and I recently completed my MSc in Mathematics. I am excited to share with you a project that I have been working on, which combines my passion for mathematics with my newfound interest in IT.
                "Recipe Tracker" allows you to create personalized recipes based on the ingredients you have on hand. Whether you're looking to explore new culinary ideas or simply make the most of what's in your pantry, "Recipe Tracker" simplifies the process.
                Key features of "Recipe Tracker" include:
                1.Personalized recipe generation based on your available ingredients
                2.Ability to save both custom and admin-generated recipes
                3.User-friendly interface for managing recipes and scheduling cooking sessions
                I invite you to explore "Recipe Tracker" and experience firsthand how it can streamline your recipe management and enhance your cooking experience.
                Thank you for taking the time to learn about "Recipe Tracker." I look forward to your feedback and suggestions as we continue to improve and expand its capabilities.
                `, 
                to_email: signupdata.usersignup.email,
            };

            emailjs.send('service_o69448o', 'template_2vuhhov', emailParams, 'lJD7UWIBI2q1ZIA3_')
                .then((response) => {
                    console.log('Email sent successfully:', response);
                    alert("Registered successfully");
                    navigate(`/userlogin`);
                })
                // .catch((error) => {
                //     console.error('Error sending email:', error);
                //     alert("Error sending email");
                // });
        })
        .catch((error) => {
            console.error('Error registering user:', error);
            alert("Error registering user");
        });

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