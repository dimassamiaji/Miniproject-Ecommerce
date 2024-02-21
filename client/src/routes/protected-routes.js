/** @format */
"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import LoadingPage from "@/components/loading";

const customerOnly = "customerOnly";
const needLogin = "needLogin";
const organizerOnly = "organizerOnly";

class Route {
  constructor(path, type) {
    this.path = path;
    this.type = type;
  }
}

const routes = [];
routes.push(new Route("/"));
routes.push(new Route("/auth/login", customerOnly));
routes.push(new Route("/auth/register", customerOnly));
routes.push(new Route("/organizer/dashboard", organizerOnly));

export default function ProtectedPage({ children }) {
  const userSelector = useSelector((state) => state.auth);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRoute = routes.find((route) => route.path == pathname);
    if (checkRoute?.type == organizerOnly && userSelector.role != "organizer")
      return redirect("/auth/login");
    else if (checkRoute?.type == needLogin && !userSelector.email)
      return redirect("/auth/login");
    else if (checkRoute?.type == customerOnly && userSelector.email)
      return redirect("/");
    else
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  }, [children, userSelector.id]);

  return <div>{isLoading ? <LoadingPage /> : children}</div>;
}
