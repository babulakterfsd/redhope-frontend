import Image from 'next/image';
import Link from 'next/link';
import androidapp from '/public/download-android.png';
import appleapp from '/public/download-apple.png';
import logo from '/public/logo.png';

const Footer = () => {
  return (
    <div className="bg-black pt-10 lg:pt-16 pb-4">
      <div className="main-container text-white grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 lg:gap-x-28 lg:gap-y-0 justify-items-center">
        {/* logo */}
        <div className="col-sapn-12 lg:col-span-3 ml-10 lg:ml-0">
          <Link
            className="flex gap-x-1 lg:gap-x-2 items-center lg:w-24"
            href="/"
          >
            <Image
              src={logo}
              alt="GizmoBuy"
              className="w-6 lg:w-8 h-6 lg:h-8 object-cover"
            />
            <span className="font-bold text-base lg:text-xl">Redhope</span>
          </Link>
          <div>
            <p className="text-offgray text-sm mt-4 lg:mt-6">
              Customer Support:
            </p>
            <p className="text-sm lg:text-base">+880-1740-020464</p>
          </div>
          <div className="my-4 lg:my-5 text-sm text-offgray">
            Jinjirtala, Dhunat Pouroshava <br />
            Dhunat 5850, Bogura, Bangladesh
          </div>
          <div className="text-sm lg:text-base">babulakterfsd@gmail.com</div>
        </div>
        {/* top categories */}
        <div className="col-sapn-12 lg:col-span-3 ">
          <p className="uppercase font-semibold mb-4 text-sm lg:text-base">
            Important Links
          </p>
          <div className="links flex flex-col gap-y-3">
            <span className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300 cursor-pointer">
              Redhope Society
            </span>
            <span className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300 cursor-pointer">
              Redhope School
            </span>
            <span className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300 cursor-pointer">
              Redhope Hospital
            </span>
            <span className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300 cursor-pointer">
              Redhope Foundation
            </span>
            <span className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300 cursor-pointer">
              Redhope IT
            </span>
            <Link
              href="/"
              className="text-yellow-300 font-semibold text-sm hover:text-[#77878F] hover:pl-1 hover:transition-all duration-300 cursor-pointer"
            >
              Redhope Web <span>&rarr;</span>
            </Link>
          </div>
        </div>
        {/* quick links */}
        <div className="col-sapn-12 lg:col-span-3 -ml-5 md:-ml-20 lg:ml-0">
          <p className="uppercase font-semibold mb-4 text-sm lg:text-base">
            quick links
          </p>
          <div className="links flex flex-col gap-y-3">
            <Link
              href="/"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Register Now
            </Link>
            <Link
              href="/about"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              About Us
            </Link>
            <Link
              href="/donors"
              className="text-offgray font-semibold text-sm hover:text-yellow-200 hover:pl-1 hover:transition-all duration-300"
            >
              Our Donors
            </Link>
          </div>
        </div>
        {/* downlaod */}
        <div className="col-sapn-12 lg:col-span-3">
          <p className="uppercase font-semibold mb-4 text-sm lg:text-base">
            download app
          </p>
          <div className="links flex flex-col gap-y-3">
            <a href="https://babulakter.com" target="_blank">
              <Image
                src={appleapp}
                alt="Download Apple App"
                className="w-[90px] h-auto object-cover"
              />
            </a>
            <a href="https://babulakter.com" target="_blank">
              <Image
                src={androidapp}
                alt="Download Android App"
                className="w-[90px] h-auto object-cover"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-gray mt-16"></div>
      <div className="flex gap-x-8 justify-center items-center mt-2 lg:mt-6 flex-col lg:flex-row gap-y-2">
        <p className="text-white text-sm font-semibold mt-2 lg:mt-0">
          All rights reserved by Redhope &copy;2024
        </p>
        <p className="text-white text-[13px] lg:text-sm font-semibold hidden lg:inline-block">
          |
        </p>
        <p className="text-white text-[13px] lg:text-sm font-semibold">
          Developed with love by{' '}
          <a
            href="https://babulakter.com"
            target="_blank"
            className="hover:text-orange-400"
          >
            Babul Akter
          </a>
          &trade;
        </p>
      </div>
    </div>
  );
};

export default Footer;
