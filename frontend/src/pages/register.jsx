import { useState } from "react";
import { Link } from "react-router-dom";

import register from "../assets/register.png";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccessMessage("");

        if (!email.trim() || !password || !confirmPassword) {
            setError("Please fill in all fields")
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.")
            return;
        }

        if (password !== confirmPassword) {
            setError("Password do not match.")
            return;
        }

        try {
            const response = await fetch("https://private-notes-app-8ytj.onrender.com/api/auth/signup", {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Something went wrong.");
                return;
            }

            setSuccessMessage("Account created! Please check your email to confirm your account.");
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
                        src={register}
                        alt="A cosy writing space with notebooks and flowers"
                        className="mt-8 w-full max-w-md object-contain"
                    />
 
                </section>

                {/* Right Section */}
                <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

                    <div className="w-full max-w-md">

                        <h2 className="text-3xl font-semibold text-[#5f5651]">
                            Create Account
                        </h2>

                        <p className="mt-2 text-sm text-[#8a625a]">
                            Join Private Notes and start capturing your thoughts.
                        </p>

                        <form 
                            onSubmit={handleSubmit}
                            className="mt-8 flex flex-col gap-5">

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

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-medium text-[#5f5651]"
                            >
                                Confirm Password
                            </label>

                           <div className="flex items-center rounded-xl border border-[#e9e1d8] bg-white pr-4 focus-within:border-[#b58c83]">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                   value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    placeholder="Confirm your password"
                                    className="w-full bg-transparent px-4 py-3 text-sm text-[#5f5651] outline-none"
                                   required
                               />

                                <button
                                   type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-sm text-[#8a625a]"
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

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

                            <button
                                type="submit"
                                className="mt-2 rounded-xl bg-[#b58c83] px-4 py-3 font-medium text-white transition-colors hover:bg-[#a77c73]"
                            >
                                Create Account
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-[#6d6660]">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-[#b58c83] hover:text-[#8a625a] transition-colors"
                                >
                                    Log In
                                </Link>
                            </p>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
}

export default Register;