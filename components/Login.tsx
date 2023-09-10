"use client";

import { account } from "@/appwrite";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValue = email;
    const passwordValue = password;

    try {
      const res = await account.createEmailSession(emailValue, passwordValue);
      if (!res) return;

      router.push(`/dashboard`);
    } catch (error) {
      console.error(error); // Failure
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="justify-center items-center m-auto p-10 w-1/3 min-w-fit">
        <form onSubmit={handleLogin} id="login" className="">
          <div className="text-4xl flex justify-center items-center mb-24">
            <h1 className="">Trello Login Page</h1>
          </div>

          <label htmlFor="email">
            Email
            <input
              className="border w-full py-3 px-3 mb-3"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className="border w-full py-3 px-3 mb-5"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="mb-8 text-right underline underline-offset-auto">
            <button className="underline hover:opacity-50">
              Forgot password?
            </button>
          </div>
          <div className="text-center">
            <button
              className="rounded px-8 py-2 mb-12 cursor-pointer bg-[#0055D1] hover:bg-gray-scale-3 text-white hover:text-main-color-1"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="text-center underline underline-offset-auto hover:opacity-50">
            <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
