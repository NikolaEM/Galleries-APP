import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    login: () => {},
    logout: () => {},
    register: () => {},   
    getActiveUser: () => {},
    
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token"),
        activeUser: null,
    },
    reducers: {
        setActiveUser: (state, action) => {
            state.activeUser = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        
        ...middlewareActions
    }
});

export const { login, 
    logout, 
    register, 
    getActiveUser, 
    setActiveUser, 
    setToken,
} = authSlice.actions;

export default authSlice.reducer;