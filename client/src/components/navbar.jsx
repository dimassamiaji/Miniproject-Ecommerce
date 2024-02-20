import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
function FunctionComponent() {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(functionLogout());
  };
  return (
    <div
      className={`flex justify-around  py-5  border-gray-400 items-center m-auto  max-w-screen-2xl w-full  sticky top-0 bg-white`}
    >
      {/* logo */}
      <Link className="font-bold text-xl" href={"/"}>
        BrandName
      </Link>

      {/* menus */}
      <div className="flex gap-4 text-sm font-semibold text-[#737373] items-center">
        <Link href="/">Home</Link>
        <Link href={"/"}>Shop</Link>
        <Link href={"/"}>About</Link>
        <Link href={"/"}>Blog</Link>
        <Link href={"/"}>Contact</Link>
      </div>

      {/* login and register */}
      {userSelector?.id ? (
        <div className="flex gap-3">
          <div className="flex items-center cursor-pointer">
            <FiShoppingCart />
          </div>
          <div>
            Welcome, {userSelector?.first_name + " " + userSelector?.last_name}
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
export default FunctionComponent;
