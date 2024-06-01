import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import notFoundImg from '../../public/404.png';

const NotFound = () => {
  return (
    <>
      <div className="h-screen flex flex-col items-center mt-8 md:mt-10 lg:mt-16">
        <Image
          src={notFoundImg}
          alt="Not Found"
          className="object-cover w-96 h-96"
        />
        <h3 className="text-orange text-2xl font-semibold">
          {' '}
          404 ! Page Not Found !!
        </h3>
        <p className="text-sm text-center mt-4 w-full sm:w-[475px]">
          Something went wrong. It’s look that your requested page could not be
          found. The link is broken or the page is removed.
        </p>
        <div className="mt-4">
          <Link href="/">
            <button className="bg-red-300 py-2.5 px-6 rounded text-custom-black font-semibold flex items-center gap-x-2 text-white">
              Back to Home <FaArrowRightLong />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
