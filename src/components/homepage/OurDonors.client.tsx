'use client';

import { TDonor } from '@/types/common.types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import demodonor from '../../../public/demodonor.png';

const OurDonorsClient = () => {
  const [donorsList, setDonorsList] = useState([]);
  const [filterBloodGroup, setFilterBloodGroup] = useState('all');
  const [filterisAvailableToDonate, setFilterisAvailableToDonate] =
    useState('all');
  const [searchByLocation, setSearchByLocation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/getalldonors?isAvailableToDonate=${filterisAvailableToDonate}&bloodGroup=${filterBloodGroup}&location=${searchByLocation}`
        );
        let alldonors = await response.json();
        alldonors = alldonors?.data?.data?.slice(0, 10);
        setDonorsList(alldonors);
      } catch (error) {}
    };

    fetchData();
  }, [filterBloodGroup, filterisAvailableToDonate, searchByLocation]);

  return (
    <div className="main-container">
      <div className="grid grid-cols-12 gap-x-3 gap-y-6 mt-4 lg:mt-12 lg:p-6">
        {/* filter by blood group */}
        <div className="col-span-12 lg:col-span-4">
          <span className="text-sm text-gray-400 font-semibold">
            Filter donors by blood group
          </span>
          <br />
          <select
            className="lg:w-3/4 mt-1.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   focus:outline-none"
            onChange={(e) => setFilterBloodGroup(e.target.value)}
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
            onChange={(e) => setFilterisAvailableToDonate(e.target.value)}
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
              className="col-span-12 md:col-span-4 lg:col-span-3 p-3 lg:p-6 rounded"
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
    </div>
  );
};

export default OurDonorsClient;
