import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Register from "../assets/register.png";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccessMessage("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Unable to log in.");
                return;
            }

            const sessionResponse = await fetch("http://localhost:3000/api/auth/me", {
                credentials: "include",
            });

            const sessionData = await sessionResponse.json();

            if (!sessionResponse.ok) {
                setError("Login succeeded, but we couldn't verify your session.");
                return;
            }

            onLogin(sessionData)
            navigate("/");

        } catch (error) {
            setError("Unable to connect to the server.", error);
        }
    }

    return (
        <div className="min-h-screen bg-[#fbf8f4] flex items-center justify-center p-4 sm:p-8">

            <div className="grid w-full max-w-6xl min-h-175 overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

                {/* Left Section */}
                <section className="relative hidden flex-col items-center justify-center bg-[#f3e0de] p-10 text-center lg:flex">

                    <img
                        src={Register}
                        alt="A cosy writing space with notebooks and flowers"
                        className="mt-8 w-full max-w-md object-contain"
                    />

                </section>

                {/* Right Section */}
                <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

                    <div className="w-full max-w-md">

                        <h2 className="text-3xl font-semibold text-[#5f5651]">
                            Welcome Back
                        </h2>

                        <p className="mt-2 text-sm text-[#8a625a]">
                            Log in to your account and continue where you left off.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 flex flex-col gap-5"
                        >

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-[#5f5651]"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border border-[#e9e1d8] bg-white px-4 py-3 text-sm text-[#5f5651] outline-none transition-colors focus:border-[#b58c83]"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-[#5f5651]"
                                >
                                    Password
                                </label>

                                <div className="flex items-center rounded-xl border border-[#e9e1d8] bg-white pr-4 focus-within:border-[#b58c83]">

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full bg-transparent px-4 py-3 text-sm text-[#5f5651] outline-none"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-sm text-[#8a625a]"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>

                                </div>
                            </div>

                            {/* Validation Messages */}
                            {error && (
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>
                            )}

                            {successMessage && (
                                <p className="text-sm text-green-700">
                                    {successMessage}
                                </p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="mt-2 rounded-xl bg-[#b58c83] px-4 py-3 font-medium text-white transition-colors hover:bg-[#a77c73]"
                            >
                                Log In
                            </button>

                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-[#6d6660]">
                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="font-semibold text-[#b58c83] transition-colors hover:text-[#8a625a]"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>

                    </div>

                </section>

            </div>
        </div>
    )
}

export default Login;