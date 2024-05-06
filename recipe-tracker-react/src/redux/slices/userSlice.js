import { createSlice } from '@reduxjs/toolkit';
export const userSlice=createSlice({
    name:"userDetails",    
    initialState:{
       usersignup:{
            name:"",
            email:"",
            password:"",
            age:"",
            gender:"",
            phone:"",
            address:""
        },
        userlogin:{
            email:"",
            password:""
        },
        userFeatureStatus:"",
        token:"",
        isLogged:false
    },
        reducers:{
        signup:(state,action)=>{
            state.usersignup=action.payload
        },
        uLogin:(state,action)=>{
            state.userlogin=action.payload
        },  
        userFeature:(state,action)=>{
            state.userFeatureStatus=action.payload
        } ,
        setToken:(state,action)=>{
            state.token=action.payload
        }, 
        setIsLogged:(state,action)=>{
            state.isLogged=action.payload
        }  
    }
})
export const { signup,uLogin,userFeature,setToken ,setIsLogged} = userSlice.actions

export default userSlice.reducer