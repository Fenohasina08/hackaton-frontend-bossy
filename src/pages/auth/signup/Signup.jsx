import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 relative overflow-hidden">

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/30 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-cyan-500/25 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-cyan-300/20 rounded-full"></div>
        <div className="absolute bottom-40 right-16 w-8 h-8 bg-cyan-400/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-300/20 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-cyan-500/15 rounded-full"></div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center gap-6 p-12">
        <h2 className="text-4xl font-bold text-cyan-300 mb-6">
          Track Your Expenses
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-indigo-700/40 p-6 rounded-2xl w-28 h-28"></div>
          <div className="bg-indigo-600/40 p-6 rounded-2xl w-28 h-28"></div>
          <div className="bg-indigo-500/40 p-6 rounded-2xl w-28 h-28"></div>
          <div className="bg-indigo-400/40 p-6 rounded-2xl w-28 h-28"></div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md bg-indigo-900/30 p-8 rounded-3xl backdrop-blur-sm">

          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-cyan-300 mb-2">
              PlanTracker
            </h1>
            <p className="text-white text-sm">
              Create your account
            </p>
          </div>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"
            />

            <button
              type="button"
              className="w-full py-3 bg-cyan-500 rounded-xl text-white font-bold"
            >
              Create Account
            </button>

            <p className="text-white text-center mt-3">
              Already have an account?{" "}
              
              <Link
                to="/Signin"
                className="text-cyan-300 cursor-pointer hover:underline"
                >
                Sign In
              </Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;