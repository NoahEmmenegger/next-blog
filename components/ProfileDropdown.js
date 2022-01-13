import { useState } from "react";
import { useAuth } from "../utils/auth";
import Link from "next/link";

export default function ProfileDropdown() {
    const auth = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative text-white font-bold" id="profileDropdown">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`btn font-bold uppercase ${isOpen ? "rounded-b-none rounded-t-lg" : ""
                    }`}
            >
                {auth.user.email}
            </button>
            {isOpen ? (
                <div className="absolute btn w-full p-10 z-20 rounded-b-lg">
                    <ul>
                        <li className="m-auto py-3 text-center">
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                        <li className="m-auto py-3 text-center">
                            <Link href="/profile">Your Profile</Link>
                        </li>
                        <li className="m-auto py-3 text-center">
                            <button
                                onClick={auth.signout}
                                className="font-bold"
                            >
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
}