import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data; // e.g., { token: '...', user: {...} }
      login(token, user);
      console.log("apna wala console log :", { token, user });

      console.log("Login Successful:", res);
      setMessage("Login successful!");
      toast.success('Login Successful!');

      // Optional: Redirect user after login
      navigate("/");
    } catch (error) {
      setMessage("Login failed");
      toast.error('Login Failed');

      console.error(
        "Login Failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <section className="container mx-auto justify-center items-center flex h-screen">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="font-roboto text-4xl font-bold text-center text-gray-800 mb-12">
          Login
        </h1>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Enter email"
              className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
            />
          </div>

          <div className="flex flex-col mb-6 w-full relative">
            <label
              htmlFor="password"
              className="text-[#5a7184] font-semibold block"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              id="password"
              placeholder="Enter password"
              className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-[52px] text-xl font-medium text-indigo-600 cursor-pointer"
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </span>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6"
          >
            Login
          </button>

          <p className="text-sm font-semibold text-[#5a7184] text-left">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 text-base cursor-pointer"
            >
              Register now
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
