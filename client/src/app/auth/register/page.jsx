/** @format */
"use client";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useEffect } from "react";
import { axiosInstance } from "@/axios/axios";
import { redirect } from "next/dist/server/api-utils";
import { useFormik } from "formik";
import Link from "next/link";
import Image from "next/image";
import BackgroundImage from "../../../assets/imaginedragons.jpg";

function Page() {
  YupPassword(Yup);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "male",
      email: "",
      password: "",
      phoneNumber: "",
      referralCode: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(),
      email: Yup.string().required().email("bukan email"),
      password: Yup.string().required().min(5),
      phoneNumber: Yup.string()
        .required()
        .min(10)
        .matches(/^\d+$/, "Invalid phone number"),
      referralCode: Yup.string(),
    }),
    onSubmit: () => {
      signup();
    },
  });
  const signup = () => {
    const user = formik.values;
    console.log(user);
    if (user.email && user.firstName && user.lastName && user.password) {
      axiosInstance()
        .post("/users", user)
        .then((res) => {
          formik.resetForm();
          alert("register berhasil");
          redirect("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <>
      <div className="relative">
        <Image
          src={BackgroundImage}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-auto flex justify-center items-center z-10">
          <div className="flex flex-col  max-w-[440px] p-3">
            <h1 className="text-3xl font-semibold text-white">
              Create New Account
            </h1>

            <div className="font-bold mt-5 text-white">First Name</div>
            <input
              className="p-2 bg-[#F3F4F6] rounded-lg"
              placeholder="First name"
              onChange={(e) =>
                formik.setFieldValue("firstName", e.target.value)
              }
              id="firstName"
              value={formik.values.firstName}
            />
            <div className="my-1 text-red-500">{formik.errors.firstName}</div>

            <div className="font-bold mt-5 text-white">Last Name</div>
            <input
              className="p-2 bg-[#F3F4F6] rounded-lg"
              placeholder="Last name"
              onChange={(e) => formik.setFieldValue("lastName", e.target.value)}
              id="last_name"
              value={formik.values.lastName}
            />
            <div className="my-1 text-red-500">{formik.errors.lastName}</div>

            <div className="font-bold mt-5 text-white">Email</div>
            <input
              type="email"
              className="p-2 bg-[#F3F4F6] rounded-lg"
              placeholder="user@mail.com"
              onChange={formik.handleChange}
              id="email"
              value={formik.values.email}
            />
            <div className="my-1 text-red-500">{formik.errors.email}</div>

            <div className="font-bold mt-5 text-white">Password</div>
            <input
              type="password"
              placeholder="***********"
              className="p-2 bg-[#F3F4F6] rounded-lg"
              onChange={formik.handleChange}
              id="password"
              value={formik.values.password}
            />
            <div className="my-1 text-red-500">{formik.errors.password}</div>

            <div className="font-bold mt-5 text-white">Gender</div>
            <select
              className="p-2 bg-[#F3F4F6] rounded-lg"
              onChange={(e) => formik.setFieldValue("gender", e.target.value)}
            >
              <option value="male" className=" text-black">
                Male
              </option>
              <option value="female" className=" text-black">
                Female
              </option>
            </select>
            <div className="my-1 text-red-500">{formik.errors.gender}</div>

            <div className="font-bold mt-5 text-white">Phone Number</div>
            <input
              className="p-2 bg-[#F3F4F6] rounded-lg"
              placeholder="Phone number"
              onChange={formik.handleChange}
              id="phoneNumber"
              value={formik.values.phoneNumber}
            />
            <div className="my-1 text-red-500">{formik.errors.phoneNumber}</div>

            <div className="font-bold mt-5 text-white">Referral Code</div>
            <input
              className="p-2 bg-[#F3F4F6] rounded-lg"
              placeholder="Referral code"
              onChange={formik.handleChange}
              id="referralCode"
              value={formik.values.referralCode}
            />
            <div className="my-1 text-red-500">
              {formik.errors.referralCode}
            </div>

            <p className="mt-5 text-white text-[13px]">
              Dengan mendaftar, saya menyetujui Syarat dan Ketentuan serta
              Kebijakan Privasi
            </p>
            <div className="mt-4 text-xs text-white">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#4F46E5] font-bold">
                Login
              </Link>
            </div>
            <button
              className="rounded-lg mt-3 text-white bg-[#4F46E5] h-10"
              onClick={formik.handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
