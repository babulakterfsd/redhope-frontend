'use client';
import NotFound from '@/app/not-found';
import { TDonor } from '@/types/common.types';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import demodonor from '../../../public/demodonor.png';

const DonorDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [donor, setDonor] = useState({} as TDonor);
  const { id } = useParams();
  const username = id;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/getalldonors/${username}`
        );
        const data = await response.json();
        const donor = data?.data;
        setDonor(donor);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [id]);

  const donorImage = donor?.profileImage ? donor?.profileImage : demodonor;

  const handleRequestBloodForUnavaileableDonor = () => {
    toast.error('This donor is not available to donate blood now!', {
      position: 'top-right',
      duration: 1500,
      icon: ' ❌',
    });
  };

  if (!isLoading && !donor) {
    return <NotFound />;
  }

  return (
    <div className="main-container py-14 lg:py-20">
      <div className="grid grid-cols-1 gap-y-6 border lg:w-8/12 lg:mx-auto border-gray-200 p-6">
        <div className="col-span-12">
          <Image
            src={donorImage}
            alt={donor?.name || 'Donor'}
            width={300}
            height={300}
            className="rounded-full w-44 md:w-52 h-44 md:h-52 mx-auto"
          />
        </div>
        <div className="col-span-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{donor?.name}</h2>
          <div className="text-sm text-gray-500 mt-2">
            Blood Group:{' '}
            <span className="text-red-400 font-bold ml-2">
              {donor?.bloodGroup}
            </span>
          </div>
          {donor?.location?.address ? (
            <>
              <span className="text-sm text-gray-400 capitalize">
                {`${donor?.location?.address}, ${donor?.location?.city}, ${donor?.location?.postalCode}`}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center px-2 capitalize">
                {`${donor?.location?.state}, ${donor?.location?.country}`}
              </span>
            </>
          ) : (
            <span className="text-center px-2 mt-3 text-md text-gray-400">
              This donor has not updated his/her address yet!
            </span>
          )}
          {donor?.isAvailableToDonate ? (
            <div className="text-green-500 font-bold text-md mt-12">
              Available to donate blood now
            </div>
          ) : (
            <div className="text-red-500 font-bold text-md mt-12">
              Not available to donate blood now
            </div>
          )}
          {donor?.isAvailableToDonate ? (
            <Link href={`${donor?.username}/requestblood`}>
              <button className="mt-2 bg-red-400 rounded px-6 py-3 text-md font-semibold text-white hover:bg-red-300 transition-colors duration-300 ease-in-out">
                Request Blood
              </button>
            </Link>
          ) : (
            <button
              className="mt-2 bg-red-400 rounded px-6 py-3 text-md font-semibold text-white hover:cursor-not-allowed transition-colors duration-300 ease-in-out"
              onClick={handleRequestBloodForUnavaileableDonor}
            >
              Request Blood
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDetails;
