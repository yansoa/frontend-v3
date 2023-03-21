import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from "./user/loginUserSlice";

const store = configureStore({
  reducer: {
    loginUser: loginUserReducer,
  },
});

export default store;
