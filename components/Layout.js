import { useAuth } from "../utils/auth";
import Footer from "./Footer";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const auth = useAuth();
  const router = useRouter();

  let [isHamburgerShow, setIsHamburgerShow] = useState(false);

  useEffect(() => {
    setIsHamburgerShow(false);
  }, [router.route]);

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        {auth.additionalInformations && auth.additionalInformations.isAdmin && <div className="bg-blue-300 text-white m-auto text-center">
          You are an Administrator. You can find the admin dashboard <Link href="/admin"><a className="underline">here</a></Link>!
        </div>}
        <nav className="flex justify-between mx-auto p-5">
          <Link href="/">
            <a>
              <h1>next-blog</h1>
            </a>
          </Link>
          <div
            className="relative h-10 w-10 cursor-pointer lg:hidden"
            onClick={() => setIsHamburgerShow(true)}
          >
            <Image
              src="/icons/menu_hamburger.svg"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
          <ul className="float-right align-middle hidden lg:flex">
         { !auth.user ? (
                <></>
          ) : (
            <li className="px-10 m-auto">
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}
            {
              auth.user ? (
                <></>
              ) : (
                <li className="px-10 m-auto">
                <Link href="/register">Register</Link>
              </li>
              )
            }
            {auth.user ? (
              <button onClick={auth.signout} className="btn">
                Logout
              </button>
            ) : (
              <Link href="/login">
                <a className="btn">Log-In</a>
              </Link>
            )}
          </ul>
        </nav>
        <div
          className="bg-white h-full w-screen fixed z-50 top-0 p-5 text-5xl flex flex-col"
          style={{ display: isHamburgerShow ? "" : "none" }}
        >
          <div
            className="relative h-10 w-10 m-auto my-0 cursor-pointer mr-5"
            onClick={() => setIsHamburgerShow(false)}
          >
            <Image
              src="/icons/close.svg"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
          <ul className="flex flex-col m-auto">
            <li className="m-auto py-3">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="m-auto py-3">
              <Link href="/register">Register</Link>
            </li>
          </ul>
          {auth.user ? (
            <div className="m-2 btn w-1/12">
              <button
                onClick={auth.signout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <a className="px-10 btn">Log-In</a>
            </Link>
          )}
        </div>
      </header>
      <main className="h-full my-auto">{children}</main>
      <Footer />
    </div>
  );
}
