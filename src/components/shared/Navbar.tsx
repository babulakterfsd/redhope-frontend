'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import logo from '/public/logo.png';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const session = useSession();
  const loggedInUser = session?.data?.user;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setMenuOpen(!isMenuOpen);
    toast.success('Logout Successful', {
      position: 'top-right',
      duration: 1000,
    });
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="border-gray-200 bg-gray-100">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className={`flex items-center space-x-1 rtl:space-x-reverse font-bold text-2xl `}
          >
            <Image
              src={logo}
              alt="Redhope Logo"
              width={50}
              height={50}
              className="rounded-full w-12 h-12"
            />

            <span>Redhope</span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col mt-4 space-y-4 md:space-y-0 md:flex-row md:space-x-8">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:p-0 hover:text-red-300 hover:transition-all duration-300 ease-in-out"
                  onClick={toggleMenu}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:p-0 hover:text-red-300 hover:transition-all duration-300 ease-in-out"
                  onClick={toggleMenu}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/donors"
                  className="block py-2 px-3 text-black rounded md:bg-transparent md:p-0 hover:text-red-300 hover:transition-all duration-300 ease-in-out"
                  onClick={toggleMenu}
                >
                  Our Donors
                </Link>
              </li>
              <li className="mt-12 md:mt-0">
                {loggedInUser?.email ? (
                  <Link
                    href="/dashboard"
                    className="mt-8 md:mt-0 md:ml-24 bg-red-300 rounded-md px-8 py-2 text-white hover:bg-red-400 transition-colors duration-300 ease-in-out"
                  >
                    My Profile
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="mt-8 md:mt-0 md:ml-24 bg-red-300 rounded-md px-8 py-2 text-white hover:bg-red-400 transition-colors duration-300 ease-in-out"
                    onClick={toggleMenu}
                  >
                    Log In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
