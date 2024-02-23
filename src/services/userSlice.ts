import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setCookie } from "../utils/cookie";
import { getActionName, isActionPending, isActionRejected } from "../utils/redux";

type State = {
  [key: string]: boolean | null;
};

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

export const checkUserAuth = createAsyncThunk("user/checkUserAuth", async (_, { rejectWithValue, dispatch }) => {
  try {
    const data = await api.getUser();
    if (!data.success) {
      return rejectWithValue(data);
    }
    return data.user;
  } catch (error) {
    return rejectWithValue(error);
  } finally {
    dispatch(authCheck());
  }
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (dataUser: { email: string; password: string; name: string }, { rejectWithValue }) => {
    const data = await api.registerUser(dataUser);
    console.log("response", data);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (dataUser: { email: string; password: string }, { rejectWithValue }) => {
    const data = await api.loginUser(dataUser);
    if (!data?.success) {
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
  reducers: {
    authCheck: state => {
      state.isAuthChecked = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.getUserRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.registerUserRequest = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
      })
      .addMatcher(isActionPending, (state: State, action: PayloadAction<any>) => {
        state[`${getActionName(action.type)}Request`] = true;
        state[`${getActionName(action.type)}Error`] = null;
      })
      .addMatcher(isActionRejected, (state: State, action: PayloadAction<any>) => {
        state[`${getActionName(action.type)}Request`] = false;
        state[`${getActionName(action.type)}Error`] = action.payload;
      });
  },
});

export const { authCheck } = userSlice.actions;

export default userSlice.reducer;
