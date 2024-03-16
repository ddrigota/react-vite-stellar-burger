import userSlice, { initialState } from "./userSlice";

const mockGetUserInfoResponse = {
  success: true,
  user: {
    email: "vasya@yandex.ru",
    name: "Vasya",
  },
  accessToken: "Bearer accessToken",
  refreshToken: "refreshToken",
};

const mockRegisterResponse = {
  success: true,
  user: {
    email: "vasya@yandex.ru",
    name: "Vasya",
  },
  accessToken: "Bearer accessToken",
  refreshToken: "refreshToken",
};

const mockLoginResponse = {
  success: true,
  user: {
    email: "vasya@yandex.ru",
    name: "Vasya",
  },
  accessToken: "Bearer accessToken",
  refreshToken: "refreshToken",
};

const mockUserInfoUpdateResponse = {
  success: true,
  user: {
    email: "vasya@yandex.ru",
    name: "Vasya",
  },
};

describe("userSlice", () => {
  test("check user auth", () => {
    expect(
      userSlice(initialState, {
        type: "user/checkUserAuth/fulfilled",
        payload: mockGetUserInfoResponse,
      })
    ).toEqual({
      ...initialState,
      data: mockGetUserInfoResponse,
      getUserRequest: false,
    });
  });
  test("register user", () => {
    expect(
      userSlice(initialState, {
        type: "user/registerUser/fulfilled",
        payload: mockRegisterResponse,
      })
    ).toEqual({
      ...initialState,
      data: mockRegisterResponse,
      registerUserRequest: false,
    });
  });
  test("login user", () => {
    expect(
      userSlice(initialState, {
        type: "user/loginUser/fulfilled",
        payload: mockLoginResponse,
      })
    ).toEqual({
      ...initialState,
      data: mockLoginResponse,
      loginUserRequest: false,
    });
  });

  test("update user info", () => {
    expect(
      userSlice(initialState, {
        type: "user/updateUserInfo/fulfilled",
        payload: mockUserInfoUpdateResponse,
      })
    ).toEqual({
      ...initialState,
      data: mockUserInfoUpdateResponse.user,
    });
  });
  test("logout user", () => {
    expect(
      userSlice(initialState, {
        type: "user/logoutUser/fulfilled",
      })
    ).toEqual({
      ...initialState,
      data: null,
    });
  });
});
