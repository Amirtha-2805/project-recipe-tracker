import { createSlice } from '@reduxjs/toolkit';
export const userSlice=createSlice({
    name:"userDetails",    
    initialState:{
       usersignup:{
            name:"",
            email:"",
            password:"",
            confirm_password:"",
            age:"",
            gender:"",
            phone:"",
            address:""
        },
        final_password:"",
        userlogin:{
            email:"",
            password:""
        },
        userAllDetails:{
            user_name:"",
            user_email:"",
            user_password:"",
            user_age:"",
            user_gender:"",
            user_phone:"",
            user_address:""
        },
        userFeatureStatus:"",
        token:"",
        id:"",
        isLogged:false,
        savedRecipes:[],
        recipe_name:"",
        aiLog:false,
        totalNo:[],
        totalVeg:[],
        totalNonVeg:[],
        totalAiRecipes:[]
       
       
       
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
        },
        setId:(state,action)=>{
            state.id=action.payload
        },
        setUserAllDetails:(state,action)=>{
            state.userAllDetails=action.payload
        },
        setsavedRecipes:(state,action)=>{
            state.savedRecipes=action.payload
        },
        setRecipeName:(state,action)=>{
            state.recipe_name=action.payload
        },
        setAiLog:(state,action)=>{
            state.aiLog=action.payload
        },
        setTotalNo:(state,action)=>{
            state.totalNo=action.payload
        },
        setTotalVeg:(state,action)=>{
            state.totalVeg=action.payload
        },
        setTotalNonVeg:(state,action)=>{
            state.totalNonVeg=action.payload
        },
        setTotalAiRecipes:(state,action)=>{
            state.totalAiRecipes=action.payload
        },
        setFinalPwd:(state,action)=>{
            state.final_password=action.payload
        }       
    }
})
export const { signup,uLogin,userFeature,setToken ,setIsLogged,setId,setUserAllDetails,setsavedRecipes,setRecipeName,setAiLog,setTotalNo,setTotalVeg,setTotalNonVeg,setTotalAiRecipes,setFinalPwd} = userSlice.actions

export default userSlice.reducer