import React from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { useLocation } from "react-router-dom";
import bg from "../assets/bg.jpg";

export default function Main() {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  return (
    <section className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section (Gray with Welcome Text) */}
      <div className="hidden md:flex w-full bg-gray-800 text-white items-center justify-center p-8">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to EduShare</h1>
          <p className="text-lg text-white/90">
            Empowering students to share, learn, and grow together.
          </p>
        </div>
      </div>

      {/* Right Section (Image + Overlay + Auth Form) */}
      <div
        className="w-full md:w-1/2 flex justify-center items-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>

        {/* Form content on top */}
        <div className="relative z-10 w-full max-w-md p-8">
          {isRegister ? <Register /> : <Login />}
        </div>
      </div>
    </section>
  );
}
