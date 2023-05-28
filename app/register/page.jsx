"use client";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Register = () => {
  const route = useRouter();
  const [number, setNumber] = useState();
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();
  console.log(providers);
  useEffect(() => {
    (async function () {
      const response = await getProviders();
      console.log(response);
      setProviders(response);
    })();
    if (session?.user) {
      route.push("/");
    }
  }, [session]);
  return (
    <div
      className="mt-10 mb-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      style={{ boxShadow: "1px 2px 1px 5" }}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          placeholder="Enter Your phone Number"
          required
        />
      </div>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            className="black_btn"
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
          >
            {provider.name} Sign In
          </button>
        ))}
    </div>
  );
};

export default Register;
