'use client';

import { TDonor } from '@/types/common.types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import demodonor from '../../../public/demodonor.png';

const DonorListPage = ({ donors }: any) => {
  const [donorsList, setDonorsList] = useState(donors);
  const [filterBloodGroup, setFilterBloodGroup] = useState('all');
  const [filterisAvailableToDonate, setFilterisAvailableToDonate] =
    useState('all');
  const [searchByLocation, setSearchByLocation] = useState('');
  const [page, setPage] = useState<string>('1');
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/getalldonors?page=${page}&limit=${limit}&isAvailableToDonate=${filterisAvailableToDonate}&bloodGroup=${filterBloodGroup}&location=${searchByLocation}`
        );
        let alldonors = await response.json();
        let itemsInTotal = alldonors?.data?.meta?.total;
        let pagesInTotal = Math.ceil(Number(itemsInTotal) / Number(limit));
        alldonors = alldonors?.data?.data?.slice(0, 10);
        setDonorsList(alldonors);
        setTotalItems(itemsInTotal);
        setTotalPages(pagesInTotal);
      } catch (error) {}
    };

    fetchData();
  }, [
    page,
    limit,
    filterBloodGroup,
    filterisAvailableToDonate,
    searchByLocation,
  ]);

  const handlePageChange = (page: number) => {
    setPage(page.toString());
  };

  const handleBloodGroupChange = (bloodGroup: string) => {
    setFilterBloodGroup(bloodGroup);
    setPage('1');
  };

  const handleAvailabilityChange = (isAvailableToDonate: string) => {
    setFilterisAvailableToDonate(isAvailableToDonate);
    setPage('1');
  };

  return (
    <div className="main-container py-14 lg:py-20">
      <h3 className="text-center text-3xl lg:text-4xl font-bold uppercase">
        Our Registered Donors
      </h3>
      <p className="text-center lg:w-6/12 mx-auto mt-3 md:mb-6 lg:mb-0">
        Our donors are the heart of our organization. They are the ones who make
        it possible for us to save lives and make a difference in the world. We
        are grateful for their generosity and dedication.
      </p>
      <div className="grid grid-cols-12 gap-x-3 gap-y-6 mt-4 lg:mt-12 lg:p-6">
        {/* filter by blood group */}
        <div className="col-span-12 lg:col-span-4">
          <span className="text-sm text-gray-400 font-semibold">
            Filter donors by blood group
          </span>
          <br />
          <select
            className="lg:w-3/4 mt-1.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
            onChange={(e) => handleBloodGroupChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="A-positive">A-positive</option>
            <option value="A-negative">A-negative</option>
            <option value="B-positive">B-positive</option>
            <option value="B-negative">B-negative</option>
            <option value="AB-positive">AB-positive</option>
            <option value="AB-negative">AB-negative</option>
            <option value="O-positive">O-positive</option>
            <option value="O-negative">O-negative</option>
          </select>
        </div>
        {/* filter by availability */}
        <div className="col-span-12 lg:col-span-4">
          <span className="text-sm text-gray-400 font-semibold">
            Filter donors by availability
          </span>
          <br />
          <select
            className="lg:w-3/4 mt-1.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
            onChange={(e) => handleAvailabilityChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
        {/* search by location */}
        <div className="col-span-12 lg:col-span-4">
          <span className="text-sm text-gray-400 font-semibold">
            Search donors by location
          </span>
          <br />
          <input
            type="text"
            className="lg:w-3/4 mt-1.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
            placeholder="Search by location"
            onChange={(e) => setSearchByLocation(e.target.value)}
          />
        </div>
      </div>

      {/* if no donor found */}
      {donorsList.length === 0 && (
        <div className="flex items-center justify-center h-[300px]">
          <h3 className="text-lg font-semibold text-red-600">No donor found</h3>
        </div>
      )}

      {/* donor cards */}
      <div className="grid grid-cols-12 md:grid-cols-12 gap-1 mt-6">
        {donorsList.map((donor: TDonor) => {
          const donorProfileImage = donor?.profileImage || demodonor;
          return (
            <div
              key={donor._id}
              className="col-span-12 md:col-span-6 lg:col-span-3 p-3 lg:p-6 rounded"
            >
              <div className="w-full max-w-sm bg-white rounded-lg shadow pt-5 h-[300px]">
                <div className="flex flex-col items-center pb-5">
                  <Image
                    className="w-14 h-14 rounded-full shadow mb-3"
                    src={donorProfileImage}
                    alt={donor.name}
                    width={56}
                    height={56}
                  />
                  <h5 className="text-md font-medium text-black">
                    {donor.name}
                  </h5>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Blood Group:{' '}
                    <span className="text-red-400 font-bold ml-2">
                      {donor?.bloodGroup}
                    </span>
                  </span>
                  <span className="text-sm">
                    {donor?.isAvailableToDonate ? (
                      <span className="text-green-400">
                        {' '}
                        Available to donate now{' '}
                      </span>
                    ) : (
                      <span className="text-red-400">
                        {' '}
                        Unavailable to donate now{' '}
                      </span>
                    )}
                  </span>
                  {donor?.location?.address ? (
                    <>
                      <span className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3 px-2">
                        {`${donor?.location?.address}, ${donor?.location?.city}, ${donor?.location?.postalCode}`}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 text-center px-2">
                        {`${donor?.location?.state}, ${donor?.location?.country}`}
                      </span>
                    </>
                  ) : (
                    <span className="text-center px-2 mt-3 text-sm text-gray-400">
                      This donor has not updated his/her address yet!
                    </span>
                  )}
                  <div className="flex justify-center items-center mt-4 md:mt-6">
                    <Link
                      href={`/donors/${donor.username}`}
                      className="bg-red-400 rounded py-1.5 px-3 text-md  text-white hover:bg-red-300 transition-colors duration-300 ease-in-out"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* pagination */}
      {donorsList?.length === 0 ? (
        <div></div>
      ) : (
        <div
          className={`flex justify-center items-center my-5 space-x-2 lg:space-x-4 ${
            donorsList?.length < 5 ? 'mt-[323px]' : 'mt-6 lg:mt-12'
          }`}
        >
          <button
            className=" px-1.5 bg-red-300 rounded-full text-gray-700 h-8 w-8 hover:bg-orange-400 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            onClick={() => handlePageChange(Number(page) - 1)}
            disabled={Number(page) === 1}
          >
            <FaChevronLeft className="text-white" />
          </button>
          {[...Array(Math.min(totalPages, 5)).keys()].map((index) => {
            const pageNumber = Number(page) - 2 + index;
            // Check if pageNumber is within valid range and greater than 0
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <button
                  key={pageNumber}
                  className={`mx-2 px-2 bg-gray-300 text-gray-700 rounded-full w-8 h-8 hover:bg-gray-400 transition-all duration-300 disabled:cursor-not-allowed disabled:hover:bg-gray-200 ${
                    Number(page) === pageNumber
                      ? 'font-bold text-white bg-red-300'
                      : ''
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
            className="px-2 w-8 h-8 bg-red-300 text-white rounded-full hover:bg-red-400 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
            onClick={() => handlePageChange(Number(page) + 1)}
            disabled={Number(page) === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default DonorListPage;
