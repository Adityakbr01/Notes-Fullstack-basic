// src/features/myProfile/myProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { rootURl } from '../../API/endPoints';  // Ensure rootURl is correct

// Initial state for the profile
const initialState = {
  profile: null,
  loading: false,
  error: null,
  isLogined: false,
};

// Async thunk for fetching user profile data
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootURl}profile`, {
        withCredentials:true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Make sure this matches the structure expected in the store
    } catch (error) {
      console.error("Error fetching profile:", error); // Log for debugging
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice to manage profile state
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload; // Directly set the profile
    },
    clearProfile: (state) => {
      state.profile = null; // Clear profile state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // Store the fetched profile
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle the error
      });
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
