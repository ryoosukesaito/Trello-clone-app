"use client";

import { ID, account } from "@/appwrite";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userNameValue = userName;
    const emailValue = email;
    const passwordValue = password;

    const res = account.create<User>(
      ID.unique(),
      emailValue,
      passwordValue,
      userNameValue
    );

    res.then(
      function (response) {
        console.log(response); // Success
        if (!response) return;
        router.push("/");
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="justify-center items-center m-auto p-10 w-1/3 min-w-fit">
        <form onSubmit={handleRegister} id="signup" className="">
          <div className="text-4xl flex justify-center items-center mb-24">
            <h1 className="">Trello Sign Up</h1>
          </div>

          <label htmlFor="username">
            User Name
            <input
              className="border w-full py-3 px-3 mb-3"
              type="username"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
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

          <div className="text-center">
            <button
              className="rounded px-8 py-2 mb-12 cursor-pointer bg-[#0055D1] hover:bg-gray-scale-3 text-white hover:text-main-color-1"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="text-center underline underline-offset-auto hover:opacity-50">
            <a href="/">Back to Login Page</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
