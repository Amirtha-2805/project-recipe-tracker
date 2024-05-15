import { createSlice } from '@reduxjs/toolkit';

export const adminSlice=createSlice({
    name:"adminDetails",    
    initialState:{
        adminFeatureStatus:"",
        addRecipes:{
            recipe_title:"",
            ingredients:"",
            recipe_details:"",
            recipe_url:""
        },
        adminId:"",       
    },
        reducers:{
            adminFeatures:(state,action)=>{
                state.adminFeatureStatus=action.payload
            },
            setAddRecipes:(state,action)=>{
                state.addRecipes=action.payload
            },
            setAdminId:(state,action)=>{
                state.adminId=action.payload
            },
       
    }
})
export const { adminFeatures,setAddRecipes,setAdminId } = adminSlice.actions

export default adminSlice.reducer