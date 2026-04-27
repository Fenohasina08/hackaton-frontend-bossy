import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="min-h-screen flex bg-black relative overflow-hidden">

       <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative gap-6">

         <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-500/30 rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-cyan-400/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-cyan-300/30 rounded-full animate-pulse"></div>
        </div>

        <h2 className="text-4xl font-bold text-cyan-300 mb-4 relative z-10">
          Welcome Back!
        </h2>

        <p className="text-white text-lg mb-6 text-center max-w-sm relative z-10">
          Sign in to continue your journey.
        </p>

         <div className="grid grid-cols-2 gap-6 relative z-10">
          <div className="w-24 h-24 bg-indigo-500/40 rounded-2xl"></div>
          <div className="w-24 h-24 bg-indigo-500/40 rounded-2xl"></div>
          <div className="w-24 h-24 bg-indigo-500/40 rounded-2xl"></div>
          <div className="w-24 h-24 bg-indigo-500/40 rounded-2xl"></div>
        </div>
      </div>

       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">

        <div className="w-full max-w-md bg-indigo-900/30 p-8 rounded-3xl backdrop-blur-sm">

           <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-cyan-300 mb-2">
              PlanTracker
            </h1>
            <p className="text-white text-sm">Sign in to continue</p>
          </div>

            <form className="space-y-4">

              <div className="relative">
                <input
                  type="text"
                  placeholder="Email or Username"
                  className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl bg-indigo-700/40 text-white outline-none"
                />
              </div>

              <button
                type="button"
                className="w-full py-3 bg-cyan-500 rounded-xl text-white font-bold"
              >
                Sign In
              </button>

              <p className="text-white text-center mt-3">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-cyan-300 cursor-pointer hover:underline"
                >
                  Sign Up
                </Link>
              </p>

            </form>

          {/* google button */}
          <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-2 bg-white/10 border border-white/20 rounded-xl py-3 text-white">
              Google
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signin;