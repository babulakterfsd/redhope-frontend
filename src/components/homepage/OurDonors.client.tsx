'use client';

import { TDonor } from '@/types/common.types';
import Image from 'next/image';
import Link from 'next/link';
import demodonor from '../../../public/demodonor.png';

const OurDonorsClient = (donors: any) => {
  const donorsList = donors?.donors?.data?.data?.slice(0, 10);
  return (
    <div className="main-container">
      <div className="grid grid-cols-12 md:grid-cols-12 gap-1 lg:mt-12">
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
