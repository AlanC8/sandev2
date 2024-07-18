"use client";
import React, { useState } from "react";
import { UserService } from "../services/UserServices";
import { useRouter } from "next/navigation";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    photo: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const registerUserHandler = async () => {
    const { username, password, email, photo } = user;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (photo) {
        formData.append("userImage", photo);
      }

      const response = await UserService.register(formData);
      if (response && response.status === 201) {
        console.log("User registered successfully");
        const loginResponse = await UserService.loginUser(username, email, password);
        if (loginResponse && loginResponse.status === 200) {
          console.log("User logged in successfully");
          localStorage.setItem("access", loginResponse.data.accessToken);
          console.log("Response data:", loginResponse.data);
        }
        router.push("/");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setUser({ ...user, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative flex min-h-full flex-1 flex-col justify-center px-6 py-32 lg:px-8">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 border-t-[#254D32]"></div>
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mb-6 text-center text-8xl font-bold leading-9 tracking-tight text-[#254D32]">
          Sände
        </h2>
        <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-[#254D32] underline">
          Create your account
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
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-[#254D32]"
            >
              Password
            </label>
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
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-[#254D32]"
            >
              Upload your photo
            </label>
            <div className="mt-2 mb-8 flex items-center">
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#254D32] file:text-white hover:file:bg-green-600"
              />
              {preview && (
                <div className="ml-4">
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="">
            <button
              onClick={registerUserHandler}
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#254D32] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Уже зарегистрированы?
          <a href="/login" className="font-semibold leading-6 text-[#254D32]">
            Войти в аккаунт
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;