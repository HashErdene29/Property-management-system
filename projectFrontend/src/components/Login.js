import React, { useRef } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert'

const Login = () => {
  const alert = useAlert()
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/v1/authenticate", loginData);
      if (response.status === 200) {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("role_id", response.data.role_id);

        alert.success("Logged in")
        navigate("/home");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
