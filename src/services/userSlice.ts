import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { deleteCookie, setCookie } from "../utils/cookie";
import { getActionName, isActionPending, isActionRejected } from "../utils/redux";
import {
  UserLoginType,
  UserRegisterType,
  UserResetPasswordType,
  UserResponseType,
  UserResponseWithTokenType,
  UserType,
} from "../utils/types";
import { createAsyncThunk } from "../utils/hooks";

type State = {
  isAuthChecked: boolean;
  data: UserType | null;

  regiserUserError: SerializedError | null;
  registerUserRequest: boolean;

  loginUserError: SerializedError | null;
  loginUserRequest: boolean;

  getUserError: SerializedError | null;
  getUserRequest: boolean;
};

const initialState: State = {
  isAuthChecked: false,
  data: null,

  regiserUserError: null,
  registerUserRequest: false,

  loginUserError: null,
  loginUserRequest: false,

  getUserError: null,
  getUserRequest: false,
};

export const checkUserAuth = createAsyncThunk<UserType>(
  "user/checkUserAuth",
  async (_, { extra: api, rejectWithValue, dispatch }) => {
    try {
      const data = await api.getUser();
      if (!data?.success) {
        return rejectWithValue(data);
      }
      return data.user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    } finally {
      dispatch(authCheck());
    }
  }
);

export const registerUser = createAsyncThunk<UserType, UserRegisterType>(
  "user/registerUser",
  async (dataUser, { extra: api, rejectWithValue }) => {
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

export const loginUser = createAsyncThunk<UserType, UserLoginType>(
  "user/loginUser",
  async (dataUser, { extra: api, rejectWithValue }) => {
    const data = await api.loginUser(dataUser);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk<void, void>("user/logoutUser", async () => {
  await api.logoutUser();
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
});

export const forgotPassword = createAsyncThunk<UserResponseWithTokenType, string>(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    const data = await api.forgotPassword(email);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    return data;
  }
);

export const resetPassword = createAsyncThunk<UserResponseType, UserResetPasswordType>(
  "user/resetPassword",
  async (data, { rejectWithValue }) => {
    const response = await api.resetPassword(data);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const updateUserInfo = createAsyncThunk<UserResponseType, UserRegisterType>(
  "user/updateUserInfo",
  async (data, { rejectWithValue }) => {
    const response = await api.updateUserInfo(data);
    if (!response?.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);

export const userSlice = createSlice({
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
      .addCase(logoutUser.fulfilled, state => {
        state.data = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })

      // тут я не нашел решения по тиаизации
      .addMatcher(isActionPending(userSlice.name), (state: any, action: PayloadAction<any>) => {
        state[`${getActionName(action)}Request`] = true;
        state[`${getActionName(action)}Error`] = null;
      })
      .addMatcher(isActionRejected(userSlice.name), (state: any, action: PayloadAction<any>) => {
        state[`${getActionName(action)}Error`] = action.payload;
        state[`${getActionName(action)}Request`] = false;
      });
  },
});

export const { authCheck } = userSlice.actions;

export default userSlice.reducer;
