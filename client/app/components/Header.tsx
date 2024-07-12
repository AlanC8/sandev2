"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { Dropdown } from "./Dropdown";
import { UserService } from "../services/UserServices";
const Header = () => {
  const [logged, setLogged] = useState(false);
  const checkUserData = async () => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      const response = await UserService.getUser();
      setLogged(true);
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      checkUserData();
    }
  }, []);

  console.log(logged);

  return (
    <header className="bg-background rounded py-4 m-5 shadow">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <span className="text-2xl font-semibold">Sände</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/clothes-picker"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Подобрать одежду
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        {logged ? (
          <Dropdown logged={logged} />
        ) : (
          <Link href={"/login"}>
            <Button className="bg-[#254D32] font-bold">Get Started</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
