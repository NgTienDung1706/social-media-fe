// src/redux/followersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const fetchFollowers = createAsyncThunk(
  "followers/fetchFollowers",
  async (userId) => {
    const res = await axiosInstance.get(`/users/${userId}/followers`);
    return res; // API trả về mảng [{id, name, avatar}, ...]
  }
);

export const removeFollower = createAsyncThunk(
  "followers/removeFollower",
  async (followerId) => {
    await axiosInstance.delete(`/followers/${followerId}`);
    return followerId;
  }
);

const followersSlice = createSlice({
  name: "followers",
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export default followersSlice.reducer;
