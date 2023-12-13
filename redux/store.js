import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import projectReducer from "./features/project/projectSlice";

const store = configureStore({ reducer: { userReducer, projectReducer } });

export default store;
