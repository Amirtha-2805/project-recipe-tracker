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
import AdminFeatureHome from './components/adminFeatures/AdminFeatureHome';
import RecipeEdit from './components/adminFeatures/RecipeEdit';
import IngredientEdit from './components/adminFeatures/IngredientEdit';
import DefaultRecipeView from './components/adminFeatures/DefaultRecipeView';
import SavedRecipeView from './components/userFeatures/SavedRecipeView';
import EditTodo from './components/userFeatures/EditTodo';

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
            <Route path='/recipeedit/:id' element={<RecipeEdit/>}></Route>
            <Route path='/ingredientedit/:id' element={<IngredientEdit/>}></Route>
            <Route path='/defaultrecipeview/:id' element={<DefaultRecipeView/>}></Route>
            <Route path='/savedrecipeview/:id' element={<SavedRecipeView/>}></Route>
            <Route path='/todoedit/:id' element={<EditTodo/>}></Route>

            




            {/* <Route path='/ingredients' element={<Ingredients/>}></Route> */}

            


            {/* {
               isLogged==false? <Route path='/' element={<Home />}/>:null
               
          
            } */}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
