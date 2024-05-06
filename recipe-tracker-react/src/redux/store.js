import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import adminReducer from './slices/adminSlice';


export default configureStore(
    {
        reducer:{
            userDetails:userReducer,
            adminDetails:adminReducer,
        }
    }
)