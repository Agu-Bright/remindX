"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggelDropdown] = useState(false);
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    (async function () {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);
  return (
    <>
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
          <p className="logo_text">RemindX</p>
        </Link>

        {/* Desktop Navigation */}

        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-event" className="black_btn">
                Create Event
              </Link>
              <button className="outline_btn" type="button" onClick={signOut}>
                signOut
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  alt="Profile"
                  height={37}
                  width={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Image
                src={session?.user.image}
                height={37}
                width={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggelDropdown((prev) => !prev)}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/create-event"
                    className="dropdown_link"
                    onClick={() => setToggelDropdown(false)}
                  >
                    Create Event
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggelDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
