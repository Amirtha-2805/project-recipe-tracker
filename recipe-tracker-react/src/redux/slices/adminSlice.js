import { createSlice } from '@reduxjs/toolkit';

export const adminSlice=createSlice({
    name:"adminDetails",    
    initialState:{
        adminFeatureStatus:"",
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
        defaultRecipes:[]
              
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
            }
           
    }
})
export const { adminFeatures,setAdmin,setAddRecipes,setAdminId,setAdminDetails,setDefaultRecipes } = adminSlice.actions

export default adminSlice.reducer