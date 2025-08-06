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
  public static async bookAppointment(token: string, payload: any) {
    try {
      const response = await Axios.post(
        baseURL + "/book-appointment",
        payload,
        {
          headers: { token },
        }
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }
  public static async getAppointments(token: string) {
    try {
      const response = await Axios.get(baseURL + "/appointments", {
        headers: { token },
      });
      return response;
    } catch (error: any) {
      throw error;
    }
  }
  public static async cancelAppointment(token: string, appointmentId: number) {
    try {
      const response = await Axios.put(
        baseURL + "/appointment-cancel",
        { appointmentId },
        {
          headers: { token },
        }
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async paymentRazorpay(token: string, appointmentId: number) {
    try {
      const response = await Axios.post(
        baseURL + "/payment-razorpay",
        { appointmentId },
        {
          headers: { token },
        }
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async verifyPayment(token: string, orderId: string) {
    try {
      const response = await Axios.post(
        baseURL + "/verify-payment",
        { razorpay_order_id: orderId },
        {
          headers: { token },
        }
      );
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}
