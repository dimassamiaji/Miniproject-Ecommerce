/** @format */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";

import { functionLogout } from "../redux/slices/userSlice";
import UserIcon from "../assets/user.svg";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/Logo-gotix.png";
function NavbarComponent() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(functionLogout());
  };

  return (
    <div
      className={`flex justify-between py-5 px-5 border-gray-400 items-center m-auto  max-w-screen-xl w-full  sticky top-0 bg-white`}
    >
      {/* logo */}
      <Link className="font-bold text-xl" href={"/"}>
        <Image
          src={Logo}
          alt="Logo Perusahaan"
          width={150} // Sesuaikan lebar sesuai kebutuhan
          height={40} // Sesuaikan tinggi sesuai kebutuhan
        />
      </Link>

      {/* menus */}
      <div className="flex gap-4 text-sm font-semibold text-[#737373] items-center">
        <Link href={"/"}>Find Events</Link>
        <Link href={"/admin/dashboard"}>Create Events</Link>
        <Link href={"/"}>Help Center</Link>
      </div>

      {/* login and register */}
      {userSelector?.id ? (
        <div className="flex gap-3">
          <div className="flex items-center cursor-pointer">
            <FiShoppingCart />
          </div>
          <div>
            Welcome, {userSelector?.firstName + " " + userSelector?.lastName}
          </div>
          <button
            className="rounded-md border-gray-500 border  px-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-1 text-sm text-[#23A6F0] font-semibold items-center">
          <Image src={UserIcon} alt="user icon"></Image>
          <Link className="" href={"/auth/login"}>
            Login
          </Link>
          /
          <Link className=" " href={"/auth/register"}>
            Register
          </Link>
        </div>
      )}
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
      <div className="flex justify-around  py-5  border-gray-400 items-center m-auto  max-w-screen-2xl w-full   bg-white">
        {/* logo */}
        <Link className="font-bold text-xl" href={"/admin"}>
          Organizer Dashboard
        </Link>

        {/* login and register */}
        {userSelector?.id ? (
          <div className="flex gap-3">
            <div>
              Welcome,
              {userSelector?.firstName + " " + userSelector?.lastName}
            </div>
            <button
              className="rounded-md border-gray-500 border  px-2"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-1 text-sm text-[#23A6F0] font-semibold items-center">
            <Image src={UserIcon}></Image>
            <Link className="" href={"/auth/login"}>
              Login
            </Link>
            /
            <Link className=" " href={"/auth/register"}>
              Register
            </Link>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}
