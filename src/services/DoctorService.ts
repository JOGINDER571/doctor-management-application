import Axios from "../api/axios";
const baseURL = "/doctor";

export class DoctorService {
  public static async getDoctors() {
    try {
      const response = await Axios.get(baseURL + "/list");
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}
