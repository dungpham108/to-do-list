import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const nav = useNavigate();

  const validate = () => {
    let valid = true;
    setErrName("");
    setErrEmail("");
    setErrPassword("");
    setErrConfirmPassword("");

    if (!name) {
      setErrName("Name cannot be empty");
      valid = false;
    }

    if (!email) {
      setErrEmail("Email cannot be empty");
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrEmail("Invalid email format");
        valid = false;
      }
    }

    if (!password) {
      setErrPassword("Password cannot be empty");
      valid = false;
    }

    if (!confirmPassword) {
      setErrConfirmPassword("Confirm password cannot be empty");
      valid = false;
    } else if (password !== confirmPassword) {
      setErrConfirmPassword("Passwords do not match!");
      valid = false;
    }

    return valid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Registration successful!");
      setTimeout(() => {
        nav("/todos");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-blue-700 font-poppins">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <div className="flex flex-col gap-2">
          <input
            className={`w-full p-2 border rounded mb-1 ${
              errName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errName) setErrName("");
            }}
          />
          {errName && <p className="text-red-600 text-sm">{errName}</p>}

          <input
            className={`w-full p-2 border rounded mb-1 ${
              errEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errEmail) setErrEmail("");
            }}
          />
          {errEmail && <p className="text-red-600 text-sm">{errEmail}</p>}

          <input
            className={`w-full p-2 border rounded mb-1 ${
              errPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errPassword) setErrPassword("");
            }}
          />
          {errPassword && <p className="text-red-600 text-sm">{errPassword}</p>}

          <input
            className={`w-full p-2 border rounded mb-1 ${
              errConfirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errConfirmPassword) setErrConfirmPassword("");
            }}
          />
          {errConfirmPassword && (
            <p className="text-red-600 text-sm">{errConfirmPassword}</p>
          )}
        </div>

        <button className="w-full mt-2 bg-blue-600 text-white p-2 rounded">
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link className="text-blue-600" to="/login">
            Login
          </Link>
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
