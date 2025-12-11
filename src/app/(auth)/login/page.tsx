/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Logo */}
      <header className="text-center py-8">
<Link href="/">

        <Image 
          src={logo} 
          alt="Ops.wine Logo" 
          width={150} 
          height={60}
          className="mx-auto"
        />
</Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8">
          <div className="max-w-md w-full">
            <h2 className="text-3xl md:text-4xl font-abhaya font-extrabold text-gray-800 mb-1">
              Welcome back
            </h2>
            <p className="text-[#968F8F] text-sm md:text-lg mb-6">
              Welcome back! Please enter your details.
            </p>

            <form className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2.5 text-sm text-[#636364] placeholder:text-sm placeholder:text-[#636364] 
                      rounded-[6px] border border-black/25 bg-[rgba(196,196,196,0)] 
                      shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] focus:outline-none focus:ring-1 focus:ring-[#A7997D]"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    className="w-full pl-10 pr-10 py-2.5 text-sm text-[#636364] placeholder:text-sm font-normal placeholder:text-[#636364]  
                      rounded-[6px] border border-black/25 bg-[rgba(196,196,196,0)] 
                      shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] focus:outline-none focus:ring-1 focus:ring-[#A7997D]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3 h-3 border border-gray-300 rounded accent-[#A7997D] cursor-pointer mr-1"
                  />
                  <span className="text-[#482817] text-xs">Remember me</span>
                </label>
                <Link
                  href="/forget-password"
                  className="text-[#9E845C] hover:text-[#A7997D] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full py-2.5  text-white md:text-[20px] text-lg  hover:bg-[#8d6a3f] transition-colors duration-200 font-medium rounded-[6px] bg-[#AF6900] shadow-[0_4px_10px_0_rgba(233,68,75,0.25)]"
              >
                Log in
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-4 text-xs text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#AF6900] hover:text-[#8d7c68] font-medium"
              >
                Sign up for free!
              </Link>
            </div>
          </div>


                        {/* Social Login Icons */}
              <div className="flex justify-center space-x-6">
                <Link href="#" className="text-xl">
                  <FcGoogle />
                </Link>
                <Link href="#" className="text-xl">
                  <FaFacebook />
                </Link>
                <Link href="#" className="text-xl">
                  <BsInstagram />
                </Link>
              </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-1/2 p-14">
          <div
            className="h-full w-full bg-cover bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage: "url('/login1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default LoginForm;