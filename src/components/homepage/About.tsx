import Image from 'next/image';
import Link from 'next/link';
import homeabout from '../../../public/homeabout.jpg';

const About = () => {
  return (
    <div className="main-container py-14 lg:py-20">
      <h3 className="text-center text-3xl lg:text-4xl font-bold">
        About Redhope
      </h3>
      <p className="text-center lg:w-6/12 mx-auto mt-3 md:mb-6 lg:mb-0">
        Redhope is a blood donation platform that connects blood donors with
        patients in need. We aim to make blood donation easier and more
        accessible to everyone.
      </p>
      <div className="lg:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-6 md:gap-y-0">
          <div className="col-span-12 md:col-span-6">
            <Image
              src={homeabout}
              alt="About Redhope"
              width={500}
              height={500}
              className="rounded-lg mt-6 lg:mt-0"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <p className="mt-2 lg:w-11/12">
              Redhope is a blood donation platform that connects blood donors
              with patients in need. We are a non-profit organization that aims
              to provide a safe and efficient way for people to donate blood and
              save lives.{' '}
              <span className="md:hidden lg:block">
                Our platform is designed to make it easy for donors to find
                donation centers and schedule appointments, while also providing
                patients with access.We are a non-profit organization that aims
                to provide a safe and efficient way for people to donate blood
                and save livesWe are a non-profit organization that aims to
                provide a safe and efficient way for people to donate blood and
                save lives
              </span>
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-red-300 font-semibold">
                100% safe and secure platform for blood donation.
              </span>
            </div>
            <Link href="/donors">
              <button className="mt-4 lg:mt-8 bg-red-400 rounded px-8 py-4 text-md font-semibold text-white hover:bg-red-300 transition-colors duration-300 ease-in-out">
                Search Our Donors
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
