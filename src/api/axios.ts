import axios, { AxiosError } from "axios";
interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

export type ErrorResponse = AxiosError<ApiError>;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     window.location.href = "/login";
//     return Promise.reject("No token. Redirecting to login.");
//   }

//   config.headers.token = token;
//   return config;
// });

api.interceptors.response.use(
  (res) => res,
  (err: ErrorResponse) => {
    if (
      err?.response?.data?.message === "Unauthorized access." ||
      err?.response?.data?.message === `Unauthorized`
    ) {
      localStorage.removeItem("token");
      window.location.href = `/login`;
    }

    console.error(err, err?.response);
    return Promise.reject(err);
  }
);

export default api;
