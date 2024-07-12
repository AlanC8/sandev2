"use client";
import React, { useState } from "react";
import { UserService } from "../services/UserServices";
import { useRouter } from "next/navigation";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const router = useRouter();

  const loginUserHandler = async () => {
    const { username, password, email } = user;
    try {
      const response = await UserService.loginUser(username, email, password);
      if (response && response.status === 200) {
        console.log("User logged in successfully");
        localStorage.setItem("access", response.data.accessToken);
        console.log("Response data:", response.data);
        router.push('/');
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mb-6 text-center text-8xl font-bold leading-9 tracking-tight text-[#254D32]">
          Sände
        </h2>
        <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-[#254D32] underline">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-[#254D32]"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-[#254D32]"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="User email"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-[#254D32]"
              >
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-[#254D32]">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2 mb-8">
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                autoComplete="current-password"
                placeholder="User password"
                required
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="">
            <button
              onClick={loginUserHandler}
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#254D32] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="#" className="font-semibold leading-6 text-[#254D32]">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
