'use client';

import { TDonor } from '@/types/common.types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ManageUsers = ({ loggedInUser }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState({} as any);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [page, setPage] = useState<string>('1');
  const limit = '5';

  const handlePageChange = (page: number) => {
    setPage(page.toString());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://redhope-backend.vercel.app/api/auth/getallusers?page=${page}&limit=${limit}`
        );
        const data = await response.json();
        const myrequests = data?.data;
        setAllUsers(myrequests?.data);
        setTotalItems(myrequests?.meta?.total);
      } catch (error) {}
    };

    fetchData();
  }, [loggedInUser?.email, page, limit]);

  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  // update user role
  const updateUserRole = async (userEmail: string, userRole: string) => {
    const response = await fetch(
      'https://redhope-backend.vercel.app/api/auth/change-user-status-or-role',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminEmail: loggedInUser?.email,
          userEmail: userEmail,
          userRole: userRole === 'admin' ? 'donor' : 'admin',
        }),
      }
    );

    const data = await response.json();

    if (data?.statusCode === 200) {
      toast.success(data?.message, {
        position: 'top-right',
        duration: 1500,
        icon: ' ✔️',
      });
      const againResponse = await fetch(
        `https://redhope-backend.vercel.app/api/auth/getallusers?page=${page}&limit=${limit}`
      );
      const againData = await againResponse.json();
      const againMyrequests = againData?.data;
      setAllUsers(againMyrequests?.data);
    } else {
      toast.error(data?.message, {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
    }
  };

  // update user status
  const updateUserStatus = async (userEmail: string, activeStatus: string) => {
    const response = await fetch(
      'https://redhope-backend.vercel.app/api/auth/change-user-status-or-role',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminEmail: loggedInUser?.email,
          userEmail: userEmail,
          activeStatus: activeStatus === 'true' ? false : true,
        }),
      }
    );

    const data = await response.json();

    if (data?.statusCode === 200) {
      toast.success(data?.message, {
        position: 'top-right',
        duration: 1500,
        icon: ' ✔️',
      });
      const againResponse = await fetch(
        `https://redhope-backend.vercel.app/api/auth/getallusers?page=${page}&limit=${limit}`
      );
      const againData = await againResponse.json();
      const againMyrequests = againData?.data;
      setAllUsers(againMyrequests?.data);
    } else {
      toast.error(data?.message, {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
    }
  };

  return (
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">Manager Users</h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        Hello {loggedInUser?.name}, here you can view all the users in the
        system. You can manage all the users of redhope from this section.
      </p>
      {isLoading ? (
        <div className="mt-10 flex justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
          </div>
        </div>
      ) : (
        <div className="py-4 px-2">
          {/* product list table */}
          <div className="mt-8 min-h-screen rounded-xl lg:py-6 lg:px-4">
            <div className="relative overflow-x-auto">
              <table className="w-full lg:w-10/12 lg:mx-auto rounded py-16 px-10 text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Active Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Blood Group
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading && allUsers?.length === 0 ? (
                    <tr>
                      <td className="text-red-400 font-semibold whitespace-nowrap py-8 pl-12">
                        No User Found
                      </td>
                    </tr>
                  ) : null}
                  {!isLoading && allUsers?.length > 0
                    ? allUsers?.map((user: TDonor) => (
                        <tr
                          className="bg-white border-b  hover:bg-red-50"
                          key={user._id}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap"
                          >
                            {user?.name}
                          </th>
                          <td className={`px-6 py-4`}>{user?.email}</td>
                          <td className={`px-6 py-4`}>{user?.role}</td>
                          <td className="px-6 py-4">
                            {user?.isAccountActive === true
                              ? 'Active'
                              : 'Deactive'}
                          </td>
                          <td className="px-6 py-4">{user?.bloodGroup}</td>
                          <td className="px-6 py-4 flex space-x-6 justify-center items-center mt-3 lg:mt-1">
                            <button
                              className="text-green-400 font-semibold"
                              onClick={() =>
                                updateUserRole(
                                  user?.email,

                                  user?.role
                                )
                              }
                            >
                              <span>
                                {user?.role === 'admin'
                                  ? 'make donor'
                                  : 'Make admin'}
                              </span>
                            </button>
                            <button
                              className="text-red-400 font-semibold"
                              onClick={() =>
                                updateUserStatus(
                                  user?.email,
                                  user?.isAccountActive.toString()
                                )
                              }
                            >
                              <span>
                                {user?.isAccountActive === true
                                  ? 'Deactive'
                                  : 'Active'}
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>

              {/* pagination */}
              {isLoading || allUsers?.length === 0 ? (
                <div></div>
              ) : (
                <div
                  className={`flex mr-2 lg:mr-28 justify-end items-center my-5 ${
                    allUsers?.length < 5 ? 'mt-[200px]' : 'mt-6'
                  }`}
                >
                  <button
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                    onClick={() => handlePageChange(Number(page) - 1)}
                    disabled={Number(page) === 1}
                  >
                    Prev
                  </button>
                  {[...Array(Math.min(totalPages, 5)).keys()].map((index) => {
                    const pageNumber = Number(page) - 2 + index;
                    // Check if pageNumber is within valid range and greater than 0
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <button
                          key={pageNumber}
                          className={`mx-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 ${
                            Number(page) === pageNumber ? 'font-bold' : ''
                          }`}
                          onClick={() => handlePageChange(pageNumber)}
                          disabled={Number(page) === pageNumber}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null; // Render nothing for invalid pageNumber
                  })}
                  <button
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 ml-2"
                    onClick={() => handlePageChange(Number(page) + 1)}
                    disabled={Number(page) === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
