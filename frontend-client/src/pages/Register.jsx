import toast from "react-hot-toast";
import React, { useState } from "react";

import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setMessage] = useState("");

  

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("Registration Successful:", data);
         setMessage('Registered successfully!');
      // Optionally redirect or clear form
      toast.success('User registered Succesfully!');

      navigate("/login")


    } catch (error) {
      // setMessage('Registration failed');
      // toast.error('Registration Failed');

      console.error(
        "Registration Failed:",
        error.response?.data?.message || error.message
      );
      toast.error(`${error.response?.data?.message || error.message}`)
      // Optionally show error to user
    }
  };

  return (
    <section className="container mx-auto justify-center items-center flex h-screen ">
      <div className="w-full max-w-sm mx-auto">
        <h1 className="font-roboto text-4xl font-bold text-center text-gray-800 mb-12">
          Sign Up
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
              htmlFor="name"
              className="text-[#5a7184] font-semibold block"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="Enter name"
              className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9]"
            />
          </div>

          <div className="flex flex-col mb-4 w-full">
            <label
              htmlFor="email"
              className="text-[#5a7184] font-semibold block"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              id="email"
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
            Register
          </button>

          <p className="text-sm font-semibold text-[#5a7184] text-left">
            You have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 text-base cursor-pointer"
            >
              Login now
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
