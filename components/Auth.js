import Link from "next/link";
import { useAuth } from "../utils/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Auth({ onclick, isRegister, error }) {
    const { signinWithProvider } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <form
            action="#"
            className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            onSubmit={(event) => {
                event.preventDefault();
                onclick({ email, password, phone, username });
                return false;
            }}
        >
            <div className="max-w-md w-full space-y-8">
                <div>
                    {isRegister ? (
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign-In to your account
                        </h2>
                    ) : (
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Log-In to your account
                        </h2>
                    )}
                </div>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email Adresse"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    {isRegister && (
                        <>
                            <div>
                                <label htmlFor="phone" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="displayname"
                                    name="displayname"
                                    required
                                    autoComplete="display-name"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="displayname"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="sr-only">
                                    Phone Number
                                </label>
                                Phone number must start with 41 and must have 11 numbers
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    pattern="^41.*"
                                    autoComplete="phone"
                                    minLength="11"
                                    maxLength="11"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="phone"
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Passwort"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot your Password?
                        </a>
                    </div>
                </div>

                <p className="text-red-600">{error}</p>

                <div>
                    <input
                        type="submit"
                        className="btn"
                        value={isRegister ? "Sign-In" : "Log-In"}
                    />
                </div>
                <input
                    type="button"
                    value="google"
                    onClick={() =>
                        signinWithProvider()
                            .then(() => {
                                router.push("/dashboard");
                            })
                            .catch((error) => {
                                console.log(error);
                                console.log("An error occurred.");
                            })
                    }
                />
            </div>
        </form>
    );
}
