/** @format */
"use client";
import { userLogin } from "@/redux/middleware/user";
import Link from "next/link";
import { useDispatch } from "react-redux";
import BackgroundImage from "../../../assets/imaginedragons.jpg";
import Image from "next/image";
function Page() {
  const dispatch = useDispatch();

  const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    dispatch(userLogin({ email, password }));
  };

  return (
    <>
      <div className="relative">
        <Image
          src={BackgroundImage}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
          <div className="flex flex-col max-w-[440px] p-3">
            <h1 className="text-3xl font-semibold text-white text-center">
              Log In
            </h1>
            <p className="text-[15px] font-semibold text-white text-center">
              Tidak lagi ketinggalan event dan konser musik favoritmu
            </p>
            <p className=" text-[13px] text-white text-center">
              Gabung dan rasakan kemudahan bertransaksi dan mengolah event di
              Gotix.
            </p>

            <div className="font-bold mt-5 text-white">Email</div>
            <input
              className="p-2 bg-[#F3F4F6] rounded-lg"
              placeholder="user@mail.com"
              id="email"
              type="email"
            ></input>

            <div className="font-bold mt-5 text-white">Password</div>
            <input
              className="p-2 bg-[#F3F4F6] rounded-lg"
              placeholder="******"
              id="password"
              type="password"
            ></input>

            <div className="mt-4 text-xs text-white">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-[#4F46E5] font-bold">
                Register
              </Link>
            </div>
            <button
              className="rounded-lg mt-2 text-white bg-[#4F46E5] h-16"
              onClick={login}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
