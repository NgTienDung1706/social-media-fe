// src/redux/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// Async thunk: lấy thông tin user theo ID
export const fetchUserByUsername = createAsyncThunk(
  "users/fetchUserByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/profile/${username}`);
      return res.user; // { id, name, bio, avatar, postsCount, ... }
    } catch (err) {
      return rejectWithValue(err.message || "Fetch user failed");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: {}, // { userId: userData }
    status: {}, // { userId: "idle" | "loading" | "succeeded" | "failed" }
    error: {}, // { userId: errorMessage }
  },
  reducers: {
    setUserFollowStatus: (state, action) => {
      const { userId, isFollowing } = action.payload;
      if (state.entities[userId]) {
        state.entities[userId].relationship_status = {
          ...state.entities[userId].relationship_status,
          following: isFollowing,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByUsername.pending, (state, action) => {
        const username = action.meta.arg;
        // Tạm set theo username để tránh lỗi khi chưa biết userId
        state.status[username] = "loading";
      })
      .addCase(fetchUserByUsername.fulfilled, (state, action) => {
        const user = action.payload;
        state.entities[user._id] = user;
        state.status[user._id] = "succeeded";
        delete state.status[user.username]; // xóa status tạm theo username
      })
      .addCase(fetchUserByUsername.rejected, (state, action) => {
        const username = action.meta.arg;
        state.status[username] = "failed";
        state.error[username] = action.payload;
      });
  },
});

export const { setUserFollowStatus } = usersSlice.actions;
export default usersSlice.reducer;
