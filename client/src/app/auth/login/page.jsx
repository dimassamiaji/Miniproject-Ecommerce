// File: pages/login.js
"use client";
import { useDispatch } from "react-redux";
import { userLogin } from "@/redux/middleware/user";
import Image from "next/image";
import BackgroundImage from "../../../assets/imaginedragons.jpg"; // Pastikan path ini benar
import Link from "next/link";

function LoginPage() {
  const dispatch = useDispatch();

  const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    dispatch(userLogin({ email, password }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src={BackgroundImage}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="absolute"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="z-10 p-8 bg-white bg-opacity-90 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Log in</h1>
        <input
          id="email"
          type="email"
          className="w-full p-3 rounded-lg border border-gray-300 mb-4"
          placeholder="Email"
        />
        <input
          id="password"
          type="password"
          className="w-full p-3 rounded-lg border border-gray-300 mb-4"
          placeholder="Password"
        />
        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mb-2"
        >
          Log In
        </button>
        <div className="flex justify-center items-center my-4">
          <hr className="border-gray-300 w-full" />
          {/* <span className="px-2 text-gray-500">Atau log in dengan</span>
          <hr className="border-gray-300 w-full" /> */}
        </div>

        {/* Sisipkan ikon media sosial di sini
        <div className="flex justify-center items-center space-x-4">
          Sosial Media Buttons
        </div> */}
        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth/register">
            <span className="text-blue-600 cursor-pointer">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
