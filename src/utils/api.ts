import { getCookie, setCookie } from "./cookie";

class Api {
  private readonly BASE_URL = "https://norma.nomoreparties.space/api/";

  private checkResponse(res: Response): Promise<any> {
    if (!res.ok) {
      throw new Error("Ошибка сервера");
    }
    return res.json();
  }

  public async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    try {
      const res = await fetch(this.BASE_URL + endpoint, options);
      return this.checkResponse(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async refreshToken(): Promise<any> {
    return this.request("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
  }

  public async requestWithRefresh(endpoint: string, options: RequestInit = {}): Promise<any> {
    try {
      const res = await this.request(endpoint, options);
      return res;
    } catch (error) {
      console.log("requestWithRefresh");
      if ((error as any).statusCode === 401 || (error as any).statusCode === 403) {
        const refreshData = await this.refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }

        setCookie("accessToken", refreshData.accessToken);
        setCookie("refreshToken", refreshData.refreshToken);

        return await this.request(endpoint, {
          ...options,
          headers: {
            ...options.headers,
            authorization: refreshData.accessToken,
          },
        });
      }
      throw error;
    }
  }

  public async getIngredients(): Promise<any> {
    return this.request("ingredients");
  }

  public async postOrder(order: string): Promise<any> {
    return this.requestWithRefresh("orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: order,
    });
  }

  public async loginUser(data: { email: string; password: string }): Promise<any> {
    return this.requestWithRefresh("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public async getUser(): Promise<any> {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      throw new Error("Токен не найден");
    }

    return this.requestWithRefresh("auth/user", {
      method: "GET",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });
  }

  public async registerUser(data: { email: string; password: string; name: string }): Promise<any> {
    return this.request("auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public async forgotPassword(email: string): Promise<any> {
    return this.request("password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  }

  public async resetPassword(data: { password: string; token: string }): Promise<any> {
    return this.request("password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public async updateUserInfo(data: { email: string; name: string; password: string }): Promise<any> {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      throw new Error("Токен не найден");
    }
    return this.requestWithRefresh("auth/user", {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify(data),
    });
  }

  public async logoutUser(): Promise<any> {
    return this.request("auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
  }
}

const api = new Api();
export default api;
