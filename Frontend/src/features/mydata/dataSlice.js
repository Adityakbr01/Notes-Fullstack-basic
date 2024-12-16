import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {ebookURl} from "../../API/endPoints"

// Thunk to fetch data
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(`${ebookURl}`,{
    withCredentials: true,
  });
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dataSlice.reducer;
