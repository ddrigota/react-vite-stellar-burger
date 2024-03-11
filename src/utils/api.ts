import { getCookie, setCookie } from "./cookie";
import {
  IngredientType,
  OrderResponseType,
  RefreshResponseWithTokenType,
  UserLoginType,
  UserRegisterType,
  UserResetPasswordType,
  UserResponseType,
  UserResponseWithTokenType,
} from "./types";

interface ErrorApi extends Error {
  statusCode: number;
}
export class Api {
  private readonly BASE_URL = "https://norma.nomoreparties.space/api/";

  private checkResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      throw new Error("Ошибка сервера");
    }
    return res.json();
  }

  public async request<T>(endpoint: string, options: RequestInit = {}) {
    try {
      const res = await fetch(this.BASE_URL + endpoint, options);
      return this.checkResponse<T>(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async refreshToken() {
    return this.request<UserResponseWithTokenType>("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      } as HeadersInit,
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
  }

  public async requestWithRefresh<T>(endpoint: string, options: RequestInit = {}) {
    try {
      const res = await this.request<T>(endpoint, options);
      return res;
    } catch (error) {
      console.log("requestWithRefresh");
      if ((error as ErrorApi).statusCode === 401 || (error as ErrorApi).statusCode === 403) {
        const refreshData: RefreshResponseWithTokenType = await this.refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }

        setCookie("accessToken", refreshData.accessToken);
        setCookie("refreshToken", refreshData.refreshToken);

        return await this.request<T>(endpoint, {
          ...options,
          headers: {
            ...options.headers,
            authorization: getCookie("accessToken") as string,
          } as HeadersInit,
        });
      }
      throw error;
    }
  }

  public async getIngredients(): Promise<{ data: IngredientType[] }> {
    return this.request("ingredients");
  }

  public async postOrder(order: string) {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      throw new Error("Токен не найден");
    }
    return this.request<OrderResponseType>("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: accessToken,
      } as HeadersInit,
      body: order,
    });
  }

  public async loginUser(data: UserLoginType) {
    return this.request<UserResponseWithTokenType>("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      } as HeadersInit,
      body: JSON.stringify(data),
    });
  }

  public async getUser() {
    const dataUser = await this.requestWithRefresh<UserResponseType>("auth/user", {
      headers: {
        authorization: getCookie("accessToken") as string,
      } as HeadersInit,
    });
    if (dataUser?.success) return dataUser;
    return Promise.reject(dataUser);
  }

  public async registerUser(data: UserRegisterType) {
    return this.request<UserResponseWithTokenType>("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      } as HeadersInit,
      body: JSON.stringify(data),
    });
  }

  public async forgotPassword(email: string) {
    return this.request<UserResponseWithTokenType>("password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      } as HeadersInit,
      body: JSON.stringify({ email }),
    });
  }

  public async resetPassword(data: UserResetPasswordType) {
    return this.request<UserResponseType>("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      } as HeadersInit,
      body: JSON.stringify(data),
    });
  }

  // TODO: fix
  public async updateUserInfo(data: UserRegisterType) {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      throw new Error("Токен не найден");
    }
    return this.requestWithRefresh<UserResponseWithTokenType>("auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      } as HeadersInit,
      body: JSON.stringify(data),
    });
  }

  public async logoutUser(): Promise<void> {
    return this.request("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      } as HeadersInit,
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
  }

  public async getOrder(orderNumber: string): Promise<any> {
    return this.request(`orders/${orderNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      } as HeadersInit,
    });
  }
}

const api = new Api();
export default api;
