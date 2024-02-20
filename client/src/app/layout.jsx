/** @format */

import { Provider } from "react-redux";
import "./globals.css";
import { Inter } from "next/font/google";
import { StoreProvider } from "@/redux/store";
import ProtectedPage from "@/routes/protected-routes";
import AuthProvider from "@/routes/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KickAvenue",
  description: "Kickavenue",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          {/* <link rel="shortcut icon" href="fav.png" type="image/x-icon" /> */}
        </head>
        <body className={inter.className}>
          <AuthProvider>
            <ProtectedPage>{children}</ProtectedPage>
          </AuthProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
