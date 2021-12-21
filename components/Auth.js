import Link from "next/link";

export default function Auth({ onclick, isRegister, error }) {
    let email = "";
    let pass = "";
    let username = "";
    let phone = "";

    return (
        <form
            action="#"
            className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            onSubmit={(event) => {
                event.preventDefault();
                onclick({ email, pass, phone, username });
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
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email Adresse"
                            onChange={(e) => {
                                email = e.target.value;
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
                                    id="username"
                                    name="username"
                                    required
                                    autoComplete="name"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="username"
                                    onChange={(e) => {
                                        username = e.target.value;
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="sr-only">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="phone"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="phone"
                                    onChange={(e) => {
                                        phone = e.target.value;
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
                                pass = e.target.value;
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
            </div>
        </form>
    );
}
