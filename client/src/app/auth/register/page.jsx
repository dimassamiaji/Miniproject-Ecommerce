/** @format */
"use client";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useEffect } from "react";
import { axiosInstance } from "@/axios/axios";
import { redirect } from "next/dist/server/api-utils";
import { useFormik } from "formik";
import Link from "next/link";

function Page() {
  YupPassword(Yup);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      gender: "male",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required(),
      email: Yup.string().required().email("bukan email"),
      password: Yup.string().required().min(5),
    }),
    onSubmit: () => {
      mendaftar();
    },
  });
  const mendaftar = () => {
    const user = formik.values;
    console.log(user);
    if (user.email && user.first_name && user.last_name && user.password) {
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
      <div
        className="flex justify-center items-center min-h-screen 
       text-sm p-3"
      >
        <div className="flex flex-col max-w-[440px] ">
          <h1 className=" text-3xl font-semibold">Bikin akun baru</h1>
          <p className="  text-[#989898] text-[13px]">
            Nggak susah kok, kamu cuma tinggal masukin beberapa data aja terus
            langsung jadi deh!
          </p>

          <div className=" font-bold mt-5">First Name</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="First name"
            onChange={(e) => formik.setFieldValue("first_name", e.target.value)} //panggil function inputHandler otomatis kirim event
            id="first_name"
            value={formik.values.first_name}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.first_name}</div>

          <div className=" font-bold mt-5">Last Name</div>
          <input
            className=" p-3 bg-[#F3F4F6] rounded-lg "
            placeholder="Last name"
            onChange={(e) => formik.setFieldValue("last_name", e.target.value)} //panggil function inputHandler otomatis kirim event
            id="last_name"
            value={formik.values.last_name}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.last_name}</div>

          <div className=" font-bold mt-5">Email</div>
          <input
            type="email"
            className="p-3  bg-[#F3F4F6] rounded-lg "
            placeholder="chairin@mail.com"
            onChange={formik.handleChange}
            id="email"
            value={formik.values.email}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.email}</div>

          <div className=" font-bold mt-5">Kata Sandi</div>
          <input
            type="password"
            placeholder="***********"
            className="p-3 bg-[#F3F4F6] rounded-lg"
            onChange={formik.handleChange}
            id="password"
            value={formik.values.password}
          ></input>
          <div className=" my-1 text-red-500">{formik.errors.password}</div>

          <div className=" font-bold mt-5">Gender</div>
          <select
            className=" p-3 bg-[#F3F4F6] rounded-lg  "
            onChange={(e) => formik.setFieldValue("gender", e.target.value)} //panggil function inputHandler otomatis kirim event
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>

          <div className=" my-1 text-red-500">{formik.errors.gender}</div>

          <p className=" mt-5 text-[#989898] text-[13px]">
            Dengan mendaftar berarti kamu setuju dengan Terms of Service dan
            Privacy Policy dari Namanyajugabelajar.io
          </p>
          <div className=" mt-4 text-xs ">
            sudah punya account?{" "}
            <Link href="/auth/login" className="text-[#4F46E5] font-bold">
              Login
            </Link>
          </div>
          <button
            className={` rounded-lg mt-3 text-white bg-[#4F46E5] h-16`}
            onClick={formik.handleSubmit}
          >
            Mendaftar
          </button>
        </div>
      </div>
    </>
  );
}
export default Page;
