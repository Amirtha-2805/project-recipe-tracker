import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from './components/Home';
import SignUp from './components/SignUp';
import LoginAdmin from './components/LoginAdmin';
import Userlogin from './components/UserLogin';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import Auth from './components/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ingredients from './components/adminFeatures/Ingredients';
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {  setToken, signup } from './redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
    const user_token=useSelector((state)=>state.userDetails.token)

    let dispatch=useDispatch()
  // const navigate=useNavigate()
      
  // const checkAuth=async ()=>{
  //   await onAuthStateChanged(auth,(currentuser)=>{
  //     dispatch(setToken(currentuser.accessToken))
  //     dispatch(signup(currentuser))
     
  //     dispatch(setIsLogged(true))
  //   })
  // }
  return (
    <div className="App">
      <Router>
        <Routes>         
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/loginadmin' element={<LoginAdmin/>}/>
            <Route path='/userlogin' element={<Userlogin/>}/>
            <Route path='/adminhome' element={<AdminHome/>}/>
            <Route path='/userhome' element={<UserHome/>}/>
            <Route path='/auth' element={<Auth/>}/>  
            <Route path='/ingredients' element={<Ingredients/>}></Route>
            {/* {
               isLogged==false? <Route path='/' element={<Home />}/>:null
               
          
            } */}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
