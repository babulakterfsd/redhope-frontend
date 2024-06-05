import { TDonor } from '@/types/common.types';
import Image from 'next/image';
import Link from 'next/link';
import coverageImage from '../../../public/coverage.png';

const DonorAreas = async () => {
  const alldonors = await fetch(
    'https://redhope-backend.vercel.app/api/auth/getalldonors',
    {
      cache: 'no-cache',
    }
  );
  const donors = await alldonors.json();
  const donorsList = donors?.data?.data;

  const donorLocations = donorsList?.map((donor: TDonor) => {
    return `${donor?.location?.state}, ${donor?.location?.country}`;
  });

  const uniqueLocations = Array.from(
    new Set(
      donorLocations.map((location: any) => {
        return location.toLowerCase();
      })
    )
  );

  return (
    <div className="main-container py-14 lg:py-20">
      <h3
        className="text-center text-3xl lg:text-4xl font-bold uppercase"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        Our Coverage Areas
      </h3>
      <p
        className="text-center lg:w-6/12 mx-auto mt-3 md:mb-6 lg:mb-0"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        Basically we cover the whole world. We have donors from all over the
        world. We have a large network of donors who are ready to donate blood
        whenever and wherever needed.
      </p>
      <div
        className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-6 md:gap-y-0 mt-8 lg:mt-16"
        data-aos="fade-down"
        data-aos-duration="2000"
      >
        <div className="col-span-12 md:col-span-6">
          <p className="mt-2 lg:w-11/12">
            We have a large network of donors who are ready to donate blood
            whenever and wherever needed. We have donors from all over the
            world. New donors are joining our network every day. We are proud to
            have such a large network of donors. You can also join our network
            and help us save lives. Best of all, it's free to join. You can join
            our network by signing up on our website. Here are some of the areas
            where we have donors:
          </p>
          <div className="mt-4 grid grid-cols-12 gap-x-2 lg:gap-x-10 gap-y-4">
            {uniqueLocations?.slice(0, 9).map((location: unknown) => {
              return (
                <div
                  key={Math.random() * 999}
                  className="bg-gray-400 text-white font-semibold rounded-lg py-1 px-2 text-center col-span-6 lg:col-span-4 text-sm capitalize"
                >
                  {location as string}
                </div>
              );
            })}
          </div>
          <Link href="/donors">
            <button className="mt-4 lg:mt-8 bg-red-400 rounded px-8 py-4 text-md font-semibold text-white hover:bg-red-300 transition-colors duration-300 ease-in-out">
              View all Donors
            </button>
          </Link>
        </div>
        <div className="col-span-12 md:col-span-6 order-first md:order-none">
          <Image
            src={coverageImage}
            alt="coverage area"
            width={500}
            height={500}
            className="rounded-lg mt-6 lg:mt-0"
          />
        </div>
      </div>
    </div>
  );
};

export default DonorAreas;
