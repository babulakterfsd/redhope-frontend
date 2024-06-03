import Image from 'next/image';
import Link from 'next/link';
import beniftImage from '../../../public/benifits.webp';

const BenifitsOfDonation = () => {
  return (
    <div className="main-container py-14 lg:py-20">
      <h3 className="text-center text-3xl lg:text-4xl font-bold uppercase">
        Benifits of Donation
      </h3>
      <p className="text-center lg:w-6/12 mx-auto mt-3 md:mb-6 lg:mb-0">
        If you are a blood donor, you are a hero to someone, somewhere, who
        received your gracious gift of life. Also, one drop of blood can save a
        life. That's how you can be a real hero to someone.
      </p>
      <div className="lg:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-6 gap-y-6 md:gap-y-0">
          <div className="col-span-12 md:col-span-6">
            <Image
              src={beniftImage}
              alt="benifits of donation"
              width={500}
              height={500}
              className="rounded-lg mt-6 lg:mt-0"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center space-x-2">
              <span className="text-black font-semibold">
                Docotors say that donating blood is good for health and it also
                helps in reducing the risk of heart diseases.
              </span>
            </div>
            <ul className="mt-4 lg:ml-6 gap-y-2 flex flex-col main-container">
              <li className="list-disc text-green-500">
                <span className="text-sm text-green-600 font-semibold">
                  Blood donation helps in reducing the risk of cancer.
                </span>
              </li>
              <li className="list-disc text-green-500">
                <span className="text-sm text-green-600 font-semibold">
                  eceive a mini-physical that can help detect potential health
                  issues.
                </span>
              </li>
              <li className="list-disc text-green-500">
                <span className="text-sm text-green-600 font-semibold">
                  Blood donation helps in reducing the risk of kidney diseases.
                </span>
              </li>
              <li className="list-disc text-green-500">
                <span className="text-sm text-green-600 font-semibold">
                  xperience the joy and fulfillment of giving back to the
                  community
                </span>
              </li>
            </ul>
            <Link href="/donors">
              <button className="mt-4 lg:mt-8 bg-red-400 rounded px-8 py-4 text-md font-semibold text-white hover:bg-red-300 transition-colors duration-300 ease-in-out">
                See Who Is Donating
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenifitsOfDonation;
