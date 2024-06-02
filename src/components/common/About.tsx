import { TCoreTeamMemberOption } from '@/types/common.types';
import Image, { StaticImageData } from 'next/image';
import greenCheck from '../../../public/Checks.svg';
import member1 from '../../../public/Image (1).png';
import member2 from '../../../public/Image (2).png';
import member3 from '../../../public/Image (3).png';
import member4 from '../../../public/Image (4).png';
import AboutImg from '../../../public/aboutimg.jpg';
import Contact from './Contact';

const coreTeamMemberOptions: TCoreTeamMemberOption[] = [
  {
    id: 1,
    img: member1,
    name: 'Babul Akter',
    position: 'CEO & Founder',
    donated: 100,
  },
  {
    id: 2,
    img: member2,
    name: 'John Doe',
    position: 'Management Officer',
    donated: 50,
  },
  {
    id: 3,
    img: member3,
    name: 'Jane Doe',
    position: 'Head of Operations',
    donated: 75,
  },
  {
    id: 4,
    img: member4,
    name: 'Kevin Doe',
    position: 'Public Relations Officer',
    donated: 25,
  },
];

const AboutPage = () => {
  return (
    <div className="md:mt-8 lg:mt-14">
      {/* About Us */}
      <div className="md:pb-8 lg:pb-12">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-6 md:gap-y-0">
            <div className="col-span-12 md:col-span-6">
              <button className="bg-red-300 text-white py-2 px-4 lg:px-4 rounded-sm font-medium text-sm mt-8 md:mt-0 cursor-default">
                Who We Are
              </button>
              <h3 className="text-custom-black text-2xl lg:text-4xl font-semibold mt-3 lg:w-10/12">
                Redhope - A blood donation platform for everyone.
              </h3>
              <p className="mt-2 lg:mt-4 text-pure-gray lg:w-11/12">
                Redhope is a blood donation platform that connects blood donors
                with patients in need. We are a non-profit organization that
                aims to provide a safe and efficient way for people to donate
                blood and save lives. Our platform is designed to make it easy
                for donors to find donation centers and schedule appointments,
                while also providing patients with access.
              </p>
              <div className="flex flex-col space-y-3 lg:space-y-4 mt-4 lg:mt-8">
                <div className="flex items-center space-x-2">
                  <Image
                    src={greenCheck}
                    alt="check"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-black">
                    No cost needed for blood donation process.
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src={greenCheck}
                    alt="check"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-black">
                    Easy to find donation centers and schedule appointments.
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src={greenCheck}
                    alt="check"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-black">
                    Provide patients with access to blood donation services.
                  </span>
                </div>
                <div className="flex items-center space-x-2 md:hidden">
                  <Image
                    src={greenCheck}
                    alt="check"
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-black">
                    100% safe and secure platform for blood donation.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <Image
                src={AboutImg}
                alt="About Us"
                className="w-full h-96 object-contain -mt-10 md:mt-0"
              />
            </div>
          </div>
        </div>
      </div>
      {/*Team Member */}
      <div className="main-container lg:mt-16">
        <h3 className="text-black font-semibold text-2xl lg:text-3xl mt-5 md:text-center">
          Team Members
        </h3>
        <p className="md:text-center md:w-4/6 md:mx-auto mt-2">
          Our team members are dedicated to making a difference. They are
          passionate about helping others and are committed to providing the
          best possible service to our donors and patients.
        </p>
        <div className="mt-5 lg:mt-10 grid grid-cols-12 md:grid-cols-12 gap-x-6 gap-y-5 mb-8 lg:mb-16">
          {coreTeamMemberOptions.map(
            (option: {
              id: number;
              img: StaticImageData;
              name: string;
              position: string;
              donated: number;
            }) => (
              <div
                key={option.id}
                className="col-span-12 md:col-span-4 lg:col-span-3 border border-gray-200 p-3 lg:p-6 rounded-md"
              >
                <div className="flex justify-start items-center space-x-3">
                  <Image
                    src={option.img}
                    alt={option.name}
                    className="object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="text-custom-black font-semibold">
                      {option.name}
                    </p>
                    <p className="text-pure-gray text-sm mt-0.5">
                      {option.position}
                    </p>
                    <p className="text-pure-gray text-sm mt-1.5">
                      {`Donated: ${option?.donated} times`}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-gray-100 lg:mt-24">
        <div className="main-container py-10 lg:py-16">
          <h3 className="text-black font-semibold text-2xl lg:text-3xl mt-5 md:text-center">
            Contact Information
          </h3>
          <p className="md:text-center md:w-4/6 md:mx-auto mt-2">
            We would love to hear from you. If you have any questions,
            suggestions, or just want to say hello, please don't hesitate to get
            in touch with us.
          </p>
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
