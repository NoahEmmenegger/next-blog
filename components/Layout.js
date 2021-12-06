import { useAuth } from '../utils/auth';
import Footer from './Footer';
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const auth = useAuth();
  const router = useRouter()

  let [isHamburgerShow, setIsHamburgerShow] = useState(false)

  useEffect(() => {
    setIsHamburgerShow(false)
  }, [router.route])

  return (
    <>
      <header>
        <nav className="flex justify-between mx-auto p-5">
          <h>Command-list.com</h>
          <div className="relative h-10 w-10 cursor-pointer lg:hidden" onClick={() => setIsHamburgerShow(true)}>
            <Image src="/icons/menu_hamburger.svg" alt="" layout="fill" objectFit="contain" />
          </div>
          <ul className="float-right align-middle hidden lg:flex">
            <li className="px-10 m-auto"><Link href="/register">Register</Link></li>
            <li className="px-10 m-auto"><Link href="/dashboard">Dashboard</Link></li>
            <li className="px-10 m-auto"><Link href="/create">Create Page</Link></li>
            {auth.user ?
              (
                <button onClick={auth.signout} className="px-10 btn">Sign Out</button>
              ) : <Link href="/login"><a className="px-10 btn">Login</a></Link>
            }
          </ul>
        </nav>
        <div className="bg-white h-full w-screen fixed z-50 top-0 p-5 text-5xl flex flex-col" style={{display: isHamburgerShow?'':'none'}}>
          <div className="relative h-10 w-10 m-auto my-0 cursor-pointer mr-5" onClick={() => setIsHamburgerShow(false)}>
            <Image src="/icons/close.svg" alt="" layout="fill" objectFit="contain" />
          </div>
          <ul className="flex flex-col m-auto">
            <li className="m-auto py-3"><Link href="/register">Register</Link></li>
            <li className="m-auto py-3"><Link href="/dashboard">Dashboard</Link></li>
            <li className="m-auto py-3"><Link href="/create">Create Page</Link></li>
          </ul>
          {auth.user ?
            (
              <button onClick={auth.signout} className="px-10 btn flex-grow-0 m-auto">Sign Out</button>
            ) : <Link href="/login"><a className="px-10 btn">Login</a></Link>
          }
        </div>

      </header>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}