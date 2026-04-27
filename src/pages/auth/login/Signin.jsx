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
                  to="/Signup"
                  className="text-cyan-300 cursor-pointer hover:underline"
                >
                  Sign Up
                </Link>
              </p>

            </form>

          {/* google button */}
           <button className="w-full flex items-center justify-center gap-2 bg-white/10 border border-white/20 rounded-xl py-3 text-white">
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
    Google
  </button>

        </div>
      </div>
    </div>
  );
};

export default Signin;