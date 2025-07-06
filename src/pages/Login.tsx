import React, { useState } from "react";
import { UserService } from "../services/UserService";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import useLoading from "../hooks/useLoading";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { loading, showLoader, hideLoader } = useLoading();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [state, setState] = useState<string>("Sign Up");

  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    if (state === "Sign Up" && !formValues.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email is invalid";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    try {
      if (Object.keys(errors).length === 0) {
        showLoader();
        if (state === "Sign Up") {
          const response = await UserService.createUser(formValues);
          toast.success(response.data.message);
          setState("Login");
        } else {
          const response = await UserService.loginUser(formValues);
          setToken(response.data.data[0]);
          localStorage.setItem("token", response.data.data[0]);
          toast.success(response.data.message);
          navigate("/");
        }
      }

    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md w-full max-w-sm p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
        </p>

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formErrors.name && (
              <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {formErrors.email && (
            <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              formErrors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {formErrors.password && (
            <p className="text-sm text-red-600 mt-1">{formErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition cursor-pointer"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-center">
            Create an new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
