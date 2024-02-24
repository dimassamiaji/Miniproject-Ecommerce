import Logo from "../assets/Logo-gotix.png";
import Image from "next/image";

function LoadingPage() {
  return (
    <>
      <style>
        {`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }

          .loadingText {
            animation: fadeInOut 6s linear infinite;
          }
        `}
      </style>
      <div className="flex w-screen h-screen justify-center items-center">
        <Image src={Logo} />
      </div>
    </>
  );
}

export default LoadingPage;
