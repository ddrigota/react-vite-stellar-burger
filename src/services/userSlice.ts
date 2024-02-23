import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setCookie } from "../utils/cookie";

const initialState = {
  isAuthChecked: false,
  data: null,

  regiserUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  getUserError: null,
  getUserRequest: false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (dataUser: { email: string; password: string; name: string }, { rejectWithValue }) => {
    const data = await api.registerUser(dataUser);
    console.log("response", data);
    if (!data.success) {
      return rejectWithValue(data);
    }
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    return data.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
