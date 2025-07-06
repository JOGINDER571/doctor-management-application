import Axios from "../api/axios";
const baseURL = "/user";

export class UserService {
  public static async loginUser(payload: any) {
    try {
      const response = await Axios.post(baseURL + "/login", payload);
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async createUser(payload: any) {
    try {
      const response = await Axios.post(baseURL + "/create-user", payload);
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async getUser(token: string) {
    try {
      const response = await Axios.get(baseURL + "/profile", {
        headers: { token },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async updateUser(token: string, payload: any) {
    try {
      const response = await Axios.put(baseURL + "/update-profile", payload, {
        headers: { token },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}
