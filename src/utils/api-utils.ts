import { BASE_URL } from "./constants";

const checkResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error("Ошибка сервера");
  }
};

export const request = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(BASE_URL + endpoint, options);
  checkResponse(res);
  return await res.json();
};
