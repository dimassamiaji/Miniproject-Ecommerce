/** @format */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { functionLogout } from "../redux/slices/userSlice";
import UserIcon from "../assets/user.svg";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/Logo-gotix.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function NavbarComponent() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(functionLogout());
  };
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY > 90) {
        setColor("#ffffff");
        setTextColor("#000000");
      } else {
        setColor("transparent");
        setTextColor("#ffffff");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4">
        {/* logo */}
        <Link className="" href={"/"}>
          <Image
            src={Logo}
            alt="Logo Perusahaan"
            width={150} // Sesuaikan lebar sesuai kebutuhan
            height={40} // Sesuaikan tinggi sesuai kebutuhan
          />
        </Link>

        {/* menus */}
        <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
          {/* <li className="hover:underline hover:text-[#23A6F0] p-4 text-gray-400 font-semibold text-sm">
            <Link href="/">Find Events</Link>
          </li> */}
          <li className="hover:underline hover:text-[#23A6F0] p-4 text-gray-400 font-semibold text-sm">
            <Link href="/admin/dashboard">Create Events</Link>
          </li>
          {/* <li className="hover:underline hover:text-[#23A6F0] p-4 text-gray-400 font-semibold text-sm">
            <Link href="/">Transaction</Link>
          </li> */}
        </ul>

        {/* login and register */}
        {userSelector?.id ? (
          <div className="flex gap-3 items-center">
            <div className="flex items-center cursor-pointer">
              {/* <FiShoppingCart /> */}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#23A6F0] font-semibold cursor-pointer">
              {/* <Image
                src={userSelector?.avatarUrl || UserIcon}
                alt="User Avatar"
                width={30}
                height={30}
                className="rounded-full"
              /> */}
              Welcome, {userSelector?.firstName + " " + userSelector?.lastName}
            </div>
            <button
              // style={{ color: `${textColor}` }}
              className="hover:text-[#23A6F0] rounded-md border-gray-500 text-gray-400 border px-2 font-semibold text-sm"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div
            style={{ color: `${textColor}` }}
            className="flex gap-2 font-semibold items-center"
          >
            <Link
              href={"/auth/login"}
              className="flex items-center gap-1 font-semibold border-2 border-[#23A6F0] bg-[#FFDE57] p-1 rounded-md text-sm"
            >
              <div className="border-1 border-[#23A6F0] p-1 rounded-md">
                <Image src={UserIcon} alt="user icon" />
              </div>
              Login
            </Link>

            <Link
              className="border-2 text-sm p-1 rounded-md bg-[#3792FF]"
              href={"/auth/register"}
            >
              Register
            </Link>
          </div>
        )}
        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-white text-center ease-in duration-300"
          }
        >
          <ul>
            {/* <li className="hover:underline p-4 text-4xl hover:text-gray-500">
              <Link href="/">Find Events</Link>
            </li> */}
            <li className="hover:underline p-4 text-4xl hover:text-gray-500">
              <Link href="/admin/dashboard">Create Events</Link>
            </li>
            {/* <li className="hover:underline p-4 text-4xl hover:text-gray-500">
              <Link href="/">Transaction</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default NavbarComponent;

export function NavbarAdminComponent() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    console.log("test");
    dispatch(functionLogout());
  };

  return (
    <div className="sticky top-0">
      <div className="flex justify-between py-5 p-6 border-gray-400 items-center m-auto ax-w-[1240px] bg-white">
        {/* logo */}
        <Link className="font-bold text-xl" href={"/"}>
          <Image
            src={Logo}
            alt="Logo Perusahaan"
            width={150} // Sesuaikan lebar sesuai kebutuhan
            height={40} // Sesuaikan tinggi sesuai kebutuhan
          />
        </Link>
        {/* <div className="font-bold text-xl">Organizer Dashboard</div> */}

        {/* login and register */}
        {userSelector?.id ? (
          <div className="flex gap-3 items-center">
            <div className="flex items-center cursor-pointer">
              {/* <FiShoppingCart /> */}
            </div>
            <div className="flex items-center gap-2 text-sm text-[#23A6F0] font-semibold cursor-pointer">
              {/* <Image
                src={userSelector?.avatarUrl || UserIcon}
                alt="User Avatar"
                width={30}
                height={30}
                className="rounded-full"
              /> */}
              Welcome, {userSelector?.firstName + " " + userSelector?.lastName}
            </div>
            <button
              className="rounded-md border-gray-500 border px-2 text-sm font-semibold text-gray-400 hover:text-[#23A6F0]"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2 font-semibold items-center">
            <Link
              href={"/auth/login"}
              className="flex items-center gap-1 font-semibold border-2 border-[#23A6F0] bg-[#FFDE57] p-1 rounded-md text-sm"
            >
              <div className="border-1 border-[#23A6F0] p-1 rounded-md">
                <Image src={UserIcon} alt="user icon" />
              </div>
              Login
            </Link>

            <Link
              className="border-2 text-sm p-1 rounded-md bg-[#3792FF]"
              href={"/auth/register"}
            >
              Register
            </Link>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
