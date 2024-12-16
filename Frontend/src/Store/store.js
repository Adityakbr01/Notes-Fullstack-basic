import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../features/counter/counterSlice";
import dataSlice from "../features/mydata/dataSlice"
import profileSlice from "../features/mydata/myProfile"

export const store = configureStore({
  reducer: {
    counter : counterSlice.reducer,
    data : dataSlice,
    Profile : profileSlice
  },
});

