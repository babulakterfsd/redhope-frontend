import Link from 'next/link';
import OurDonorsClient from './OurDonors.client';

const OurDonors = async () => {
  return (
    <div className="bg-gray-100 py-14 lg:py-20">
      <div className="main-container">
        <h3 className="text-center text-3xl lg:text-4xl font-bold uppercase">
          Our Donors
        </h3>
        <p className="text-center lg:w-6/12 mx-auto mt-3 md:mb-6 lg:mb-0">
          Our donors are the heart of our organization. They are the ones who
          make it possible for us to save lives and make a difference in the
          world. We are grateful for their generosity and dedication.
        </p>
      </div>
      <div>
        <OurDonorsClient />
      </div>
      <div className="flex justify-center items-center">
        <Link href="/donors">
          <button className="mt-4 lg:mt-8 border border-red-400 text-black rounded px-8 py-4 text-md font-semibold hover:bg-red-400 transition-colors duration-300 ease-in-out hover:text-white">
            View all donors
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OurDonors;
