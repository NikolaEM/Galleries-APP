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
    registrationErrors: null,
    loginError: false,
  },
  reducers: {
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },

    setRegistrationErrors(state, action) {
      state.registrationErrors = action.payload;
    },
    setLoginError(state, action) {
      state.loginError = action.payload;
    },

    ...middlewareActions,
  },
});

export const {
  login,
  logout,
  register,
  getActiveUser,
  setActiveUser,
  setToken,
  setRegistrationErrors,
  setLoginError,
} = authSlice.actions;
export default authSlice.reducer;
