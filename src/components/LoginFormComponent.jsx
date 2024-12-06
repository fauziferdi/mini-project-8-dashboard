import React from "react";
import { authLogin } from "../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

import useForm from "../hooks/useForms";
import { Navigate, useNavigate } from "react-router-dom";

const LoginFormComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(authLogin(form));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login gagal:", err);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">LOGIN</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-8 mb-0 space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                placeholder="Enter email"
              />

              <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400 size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-400 size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <button
              type="submit"
              className="inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginFormComponent;
