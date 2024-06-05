'use client';

import { TBloodRequest } from '@/types/common.types';
import { useEffect, useState } from 'react';

const MyRequests = ({ loggedInUser }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [myRequests, setMyRequests] = useState({} as any);
  const [page, setPage] = useState<string>('1');
  const limit = '10';
  const totalPages = Math.ceil(Number(myRequests) / Number(limit));

  const handlePageChange = (page: number) => {
    setPage(page.toString());
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bloodrequests/requests-made-by-me?page=${page}&limit=${limit}&requesterEmail=${loggedInUser?.email}`
        );
        const data = await response.json();
        const myrequests = data?.data;
        setMyRequests(myrequests);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [loggedInUser?.email]);

  console.log(myRequests);

  return (
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">My Blood Requests</h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        In this section, you can view all the blood requests you have made. You
        can view the status of the request and also can see the donor contact
        info if the request is accepted.
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
                      Donor Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Donor Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Donor Mobile
                    </th>
                    <th scope="col" className="px-6 py-3 hidden ">
                      Donor Blood Group
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Request Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading && myRequests?.bloodRequests?.length === 0 ? (
                    <tr>
                      <td className="text-red-400 font-semibold whitespace-nowrap py-8 pl-12">
                        No Requests Found
                      </td>
                    </tr>
                  ) : null}
                  {!isLoading && myRequests?.bloodRequests?.length > 0
                    ? myRequests?.bloodRequests?.map(
                        (request: TBloodRequest) => (
                          <tr
                            className="bg-white border-b  hover:bg-red-50"
                            key={request._id}
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap"
                            >
                              {request?.donor?.name}
                            </th>
                            <td
                              className={`px-6 py-4 ${
                                request?.requestStatus === 'pending'
                                  ? 'text-red-400'
                                  : ''
                              }`}
                            >
                              {request?.requestStatus === 'accepted' &&
                                request?.donor?.email}
                              {(request?.requestStatus === 'pending' ||
                                request?.requestStatus === 'rejected') &&
                                'Hidden'}
                            </td>
                            <td
                              className={`px-6 py-4 ${
                                request?.requestStatus === 'pending'
                                  ? 'text-red-400'
                                  : ''
                              }`}
                            >
                              {request?.requestStatus === 'accepted' &&
                                request?.donor?.location?.mobile}
                              {(request?.requestStatus === 'pending' ||
                                request?.requestStatus === 'rejected') &&
                                'Hidden'}
                            </td>
                            <td className="px-6 py-4 hidden">
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
                          </tr>
                        )
                      )
                    : null}
                </tbody>
              </table>

              {/* pagination */}
              {/* {isLoading || myRequests?.bloodRequests?.length === 0 ? (
                <div></div>
              ) : (
                <div
                  className={`flex justify-end items-center my-5 ${
                    myRequests?.bloodRequests?.length < 5
                      ? 'mt-[323px]'
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
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                    onClick={() => handlePageChange(Number(page) + 1)}
                    disabled={Number(page) === totalPages}
                  >
                    Next
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRequests;
