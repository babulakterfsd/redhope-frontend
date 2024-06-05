'use client';

import NotFound from '@/app/not-found';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { toast } from 'sonner';

const DonorDashboard = ({ loggedInUser }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loggedInUser?.role !== 'donor') {
    return <NotFound />;
  }

  const handleLogout = async () => {
    await signOut();
    toast.success('Logout Successful', {
      position: 'top-right',
      icon: '👏',
      duration: 1500,
    });
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <h3>This is donor dashboard</h3>
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
    </div>
  );
};

export default DonorDashboard;
