import { createSlice } from '@reduxjs/toolkit';

export const adminSlice=createSlice({
    name:"adminDetails",    
    initialState:{
        adminFeatureStatus:"adminHome",
        adminLogin:{
            adminId:"", 
            admin_name:"",
            admin_email:"",
            admin_pwd:""
        },
        admin_details:{
            admin_id:"",
            admin_name:"",
            admin_email:""
        },
        addRecipes:{
            recipe_title:"",
            ingredients:"",
            recipe_details:"",
            recipe_image:"",
            recipe_url:"",
            recipe_iframe:""
        },
        defaultRecipes:[],
        ingredientList:[],
        isadminLogged:false,
        cloud_image:""
              
    },
        reducers:{
            adminFeatures:(state,action)=>{
                state.adminFeatureStatus=action.payload
            },
            setAdmin:(state,action)=>{
                state.adminLogin=action.payload
            },
            setAdminDetails:(state,action)=>{
                state.admin_details=action.payload
            },
            setAddRecipes:(state,action)=>{
                state.addRecipes=action.payload
            },
            setAdminId:(state,action)=>{
                state.adminId=action.payload
            },
            setDefaultRecipes:(state,action)=>{
                state.defaultRecipes=action.payload
            },
            setIngredientList:(state,action)=>{
                state.ingredientList=action.payload
            },
            setAdminIsLogged:(state,action)=>{
                state.isadminLogged=action.payload
            },
            setCloudImage:(state,action)=>{
                state.cloud_image=action.payload
            }
           
    }
})
export const { adminFeatures,setAdmin,setAddRecipes,setAdminId,setAdminDetails,setDefaultRecipes,setAdminIsLogged,setIngredientList,setCloudImage } = adminSlice.actions

export default adminSlice.reducer