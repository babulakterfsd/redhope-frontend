'use client';

import NotFound from '@/app/not-found';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FcHome } from 'react-icons/fc';
import { IoIosLogOut } from 'react-icons/io';
import { IoFitnessOutline, IoHeartOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';
import demoUserImage from '../../../public/demodonor.png';
import logo from '../../../public/logo.png';
import MyRequests from './MyRequests';
import Profile from './Profile';
import RequestsToMe from './RequestsToMe';

const DonorDashboard = ({ loggedInUser }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePath, setActivePath] = useState('dashboard');

  const handleActivePath = (path: string) => {
    setActivePath(path);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout Successful', {
      position: 'top-right',
      icon: '👏',
      duration: 1500,
    });
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loggedInUser?.role !== 'donor') {
    return <NotFound />;
  }

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 "
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open</span>
        <svg
          className="w-6 h-6 text-xl text-red-300 hover:text-red-700 hover:transition-all duration-300 ease-in-out"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? '' : '-translate-x-full sm:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-screen px-3 py-4 overflow-y-auto bg-gray-200">
          <Link
            href={`/dashboard`}
            onClick={() => handleActivePath('dashboard')}
          >
            <div
              className="flex justify-start items-center space-x-1 hover:cursor-pointer"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Image
                src={logo}
                alt="logo"
                height={30}
                width={30}
                className="h-6 lg:h-7 w-6 lg:w-7 lg:ml-2 lg:mt-6 object-contain"
              />

              <h3
                className={`text-md lg:text-xl font-bold text-center lg:text-left lg:mt-6 text-red-400`}
              >
                Redhope
              </h3>
            </div>
          </Link>
          <div className="flex justify-end items-center mb-5 sm:hidden">
            <button
              className="text-2xl text-orange hover:text-red-400 hover:transition-all duration-300 ease-in-out"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <RxCross2 />
            </button>
          </div>
          <ul className="font-medium lg:mt-12">
            <Link
              href={`/dashboard`}
              onClick={() => handleActivePath('dashboard')}
              className={` lg:hidden flex items-center space-x-2 mb-4 hover:text-orange-400 md:hover:text-white transition-all duration-300 ease-in-out rounded-md py-2.5 px-3 md:mt-6 `}
            >
              {loggedInUser?.profileImage ? (
                <Image
                  src={loggedInUser?.profileImage}
                  alt="profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <Image
                  src={demoUserImage}
                  alt="profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <li className="">{` ${loggedInUser?.name}`}</li>
            </Link>
            <hr className="mt-2 lg:hidden" />
            <li className="my-2">
              <button
                onClick={() => handleActivePath('myrequests')}
                className={`flex items-center p-2 rounded-lg  hover:bg-red-400 hover:text-white group w-full`}
              >
                <div
                  className="flex items-center space-x-2"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <IoFitnessOutline className="text-xl font-bold text-amber-600" />
                  <span>My Requests</span>
                </div>
              </button>
            </li>
            <li className="my-2">
              <button
                onClick={() => handleActivePath('requeststome')}
                className={`flex items-center p-2 rounded-lg  hover:bg-red-400 hover:text-white group w-full`}
              >
                <div
                  className="flex items-center space-x-2"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <IoHeartOutline className="text-lg text-blue-600 font-bold" />
                  <span>Requests to Me</span>
                </div>
              </button>
            </li>

            <div className="absolute bottom-20 sm:bottom-10">
              <li>
                <Link
                  href="/"
                  className="cursor-pointer ms-5 text-gray-700 hover:text-red-400"
                >
                  <div
                    className="flex items-center space-x-2"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <FcHome className="text-green-400 font-bold text-xl" />
                    <span>Back To Home</span>
                  </div>
                </Link>
              </li>
              <li>
                <button
                  className="text-white bg-red-400 px-6 py-2 hover:text-red-300 rounded mt-5"
                  onClick={handleLogout}
                >
                  <div
                    className="flex justify-start -ml-5 items-center space-x-2"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <IoIosLogOut className="text-white text-xl font-bold" />
                    <span>Logout</span>
                  </div>
                </button>
              </li>
            </div>
          </ul>
        </div>
      </aside>

      <div className={`p-4 lg:p-0 ${isSidebarOpen ? 'sm:ml-64' : ''} sm:ml-64`}>
        {/* dashboard haeader */}
        <div className="py-10 hidden lg:flex justify-end items-center bg-gray-200">
          <button
            onClick={() => handleActivePath('dashboard')}
            className={`flex justify-center items-center space-x-2 hover:text-red-400 mr-10 `}
          >
            {loggedInUser?.profileImage ? (
              <Image
                src={loggedInUser?.profileImage}
                alt="profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <Image
                src={demoUserImage}
                alt="profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
            )}
            <li className="list-none text-md font-[500]">{` ${loggedInUser?.name}`}</li>
          </button>
        </div>
        {/* dashboard content */}
        {activePath === 'dashboard' ? (
          <Profile loggedInUser={loggedInUser} />
        ) : activePath === 'myrequests' ? (
          <MyRequests loggedInUser={loggedInUser} />
        ) : activePath === 'requeststome' ? (
          <RequestsToMe loggedInUser={loggedInUser} />
        ) : (
          <Profile loggedInUser={loggedInUser} />
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
