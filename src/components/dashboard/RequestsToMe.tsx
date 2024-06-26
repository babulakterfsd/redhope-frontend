'use client';

import { TBloodRequest } from '@/types/common.types';
import { useEffect, useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import { IoCheckmark } from 'react-icons/io5';
import { toast } from 'sonner';

const RequestsToMe = ({ loggedInUser }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestsToMe, setRequestsToMe] = useState({} as any);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [page, setPage] = useState<string>('1');
  const limit = '10';

  const handlePageChange = (page: number) => {
    setPage(page.toString());
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://redhope-backend.vercel.app/api/bloodrequests/requests-made-to-me?page=${page}&limit=${limit}&donorEmail=${loggedInUser?.email}`
        );
        const data = await response.json();
        const requestsToMe = data?.data;
        setRequestsToMe(requestsToMe);
        setTotalItems(requestsToMe?.meta?.total);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [loggedInUser?.email]);

  const totalPages = Math.ceil(Number(totalItems) / Number(limit));

  const updateRequestStatus = async (
    bloodRequestId: string,
    status: string
  ) => {
    const response = await fetch(
      'https://redhope-backend.vercel.app/api/bloodrequests/update-blood-request-status',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bloodRequestId,
          status,
        }),
      }
    );
    const data = await response.json();
    if (data?.statusCode === 200) {
      toast.success(data?.message, {
        position: 'top-right',
        duration: 2000,
        icon: '👏',
      });
      const againResponse = await fetch(
        `https://redhope-backend.vercel.app/api/bloodrequests/requests-made-to-me?page=${page}&limit=${limit}&donorEmail=${loggedInUser?.email}`
      );
      const againData = await againResponse.json();
      const againRequestsToMe = againData?.data;
      setRequestsToMe(againRequestsToMe);
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
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">
        Blood Requests To Me
      </h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        In this section, you can view all the blood requests made to you. You
        can view the status of the request and also can accept or reject the
        request. Once you accept the request, the requesters contact info will
        be shared with you.
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
                      Requester Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Requester Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Requester Mobile
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Blood Group Needed
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Request Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading && requestsToMe?.bloodRequests?.length === 0 ? (
                    <tr>
                      <td className="text-red-400 font-semibold whitespace-nowrap py-8 pl-12">
                        No Requests Found
                      </td>
                    </tr>
                  ) : null}
                  {!isLoading && requestsToMe?.bloodRequests?.length > 0
                    ? requestsToMe?.bloodRequests?.map(
                        (request: TBloodRequest) => (
                          <tr
                            className="bg-white border-b  hover:bg-red-50"
                            key={request._id}
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap"
                            >
                              {request?.requester?.name}
                            </th>
                            <td
                              className={`px-6 py-4 ${
                                request?.requestStatus === 'pending' ||
                                request?.requestStatus === 'rejected'
                                  ? 'text-red-400'
                                  : ''
                              }`}
                            >
                              {request?.requestStatus === 'accepted' &&
                                request?.requester?.email}
                              {(request?.requestStatus === 'pending' ||
                                request?.requestStatus === 'rejected') &&
                                'Hidden'}
                            </td>
                            <td
                              className={`px-6 py-4 ${
                                request?.requestStatus === 'pending' ||
                                request?.requestStatus === 'rejected'
                                  ? 'text-red-400'
                                  : ''
                              }`}
                            >
                              {request?.requestStatus === 'accepted' &&
                                request?.requester?.location?.mobile}
                              {(request?.requestStatus === 'pending' ||
                                request?.requestStatus === 'rejected') &&
                                'Hidden'}
                            </td>
                            <td className="px-6 py-4">
                              {request?.donor?.bloodGroup}
                            </td>
                            <td
                              className={`px-6 py-4 ${
                                request?.requestStatus === 'pending'
                                  ? 'text-red-400 font-bold'
                                  : request?.requestStatus === 'rejected'
                                  ? 'text-red-400 font-bold'
                                  : 'text-green-400 font-bold'
                              }`}
                            >
                              {request?.requestStatus}
                            </td>
                            <td className="px-6 py-4 flex space-x-2 justify-center items-center mt-3 lg:mt-1">
                              <button
                                className="bg-green-400 py-0.5 px-3 text-center font-semibold rounded-full text-white flex justify-center items-center"
                                onClick={() =>
                                  updateRequestStatus(request?._id, 'accepted')
                                }
                              >
                                <IoCheckmark className="font-bold mt-1" />
                                <span>Accept</span>
                              </button>
                              <button
                                className="bg-red-400 py-0.5 px-3 text-center font-semibold rounded-full text-white flex justify-center items-center"
                                onClick={() =>
                                  updateRequestStatus(request?._id, 'rejected')
                                }
                              >
                                <HiOutlineXMark className="font-bold mt-1" />{' '}
                                <span>Reject</span>
                              </button>
                            </td>
                          </tr>
                        )
                      )
                    : null}
                </tbody>
              </table>

              {/* pagination */}
              {isLoading || requestsToMe?.bloodRequests?.length === 0 ? (
                <div></div>
              ) : (
                <div
                  className={`flex mr-2 lg:mr-28 justify-end items-center my-5 ${
                    requestsToMe?.bloodRequests?.length < 5
                      ? 'mt-[200px]'
                      : 'mt-4'
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

export default RequestsToMe;
