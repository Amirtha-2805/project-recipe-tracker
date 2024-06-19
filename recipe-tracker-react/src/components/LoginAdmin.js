import '../styles/adminlogin.css'
import { useNavigate } from "react-router-dom";
import NavBar from './Menu';
import { useEffect, useState } from 'react';
import { setAdmin, setAdminDetails, setAdminId, setName } from '../redux/slices/adminSlice';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './Footer';
import axios from 'axios';
import { setAdminIsLogged } from '../redux/slices/adminSlice';



export default function LoginAdmin() {
    const navigate = useNavigate();
    const adminGlobal = useSelector((state) => state.adminDetails)
    let dispatch = useDispatch()

    const adminLogin = async () => {
        let adminForm = new FormData()
        adminForm.append("admin_email", adminGlobal.adminLogin.admin_email)
        adminForm.append("admin_pwd", adminGlobal.adminLogin.admin_pwd)
        let getAdmin = await axios.post("https://amirtha14.pythonanywhere.com/adminlogin", adminForm)
        console.log("responseadmin", getAdmin)
        localStorage.setItem("admin_token", JSON.stringify(getAdmin.data[0].admin_token))
        dispatch(setAdminDetails({
            admin_id: getAdmin.data[0].admin_id,
            admin_name: getAdmin.data[0].admin_name,
            admin_email: getAdmin.data[0].admin_email
        }))
        alert("Logged in succesfully")
        dispatch(setAdminIsLogged(true))
        navigate("/adminhome")
    }


    return (

        <>
            <NavBar />

            <div class="wrapper wrapper-full-page ">                
                <div className="full-page section-image" id='admin-bg' filter-color="black" data-image="">

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
                                                <input type="email" className="form-control" placeholder="Enter Email..." onKeyUp={(e)=>dispatch(setAdmin({
                                                ...adminGlobal.adminLogin,
                                                admin_email:e.target.value}))} />
                                            </div>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="nc-icon nc-key-25"></i>
                                                    </span>
                                                </div>
                                                <input type="password" placeholder="Enter Password" className="form-control" onKeyUp={(e)=>dispatch(setAdmin({
                                                ...adminGlobal.adminLogin,
                                                admin_pwd:e.target.value}))}/>
                                            </div>
                                        </div>
                                        <div className="card-footer ">
                                            <button type='button' href="javascript:;" className="btn btn-warning btn-round btn-block mb-3" onClick={()=>adminLogin()}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />

        </>

    )
}