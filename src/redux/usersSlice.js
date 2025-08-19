// src/redux/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    const res = await axiosInstance.get(`/userinfo/${userId}`);
    return res; // {id, name, bio, avatar, postsCount}
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    listUser: {}, // { userId: {...} }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      const user = action.payload;
      state.entities[user.id] = user;
    });
  },
});

export default usersSlice.reducer;



// src/redux/usersSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "@/utils/axiosInstance";

// export const fetchUserById = createAsyncThunk(
//   "users/fetchUserById",
//   async (userId) => {
//     const res = await axiosInstance.get(`/users/${userId}`);
//     return res; // {id, name, bio, avatar, postsCount}
//   }
// );

// const usersSlice = createSlice({
//   name: "users",
//   initialState: {
//     entities: {}, // { userId: {...} }
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchUserById.fulfilled, (state, action) => {
//       const user = action.payload;
//       state.entities[user.id] = user;
//     });
//   },
// });

// export default usersSlice.reducer;
