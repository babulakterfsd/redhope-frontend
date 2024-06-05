'use client';
import NotFound from '@/app/not-found';
import { TDonor } from '@/types/common.types';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const RequestBlood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBloodRequestLoading, setIsBloodRequestLoading] = useState(false);
  const [donor, setDonor] = useState({} as TDonor);
  const [requester, setRequester] = useState({} as TDonor);
  const { id } = useParams();
  const router = useRouter();
  const username = id;
  const session = useSession();
  const loggedInUserEmail = session?.data?.user?.email;
  const [requesterMobile, setRequesterMobile] = useState(
    requester?.location?.mobile || ''
  );
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [reasonForDonation, setReasonForDonation] = useState('');
  const [agreeToTermsAndConditions, setAgreeToTermsAndConditions] =
    useState(false);

  // get requester details
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://redhope-backend.vercel.app/api/auth/getalldonorsbyemail/${loggedInUserEmail}`
        );
        const data = await response.json();
        const loggedInUser = data?.data;
        setRequester(loggedInUser);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [id]);

  // get donor details
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://redhope-backend.vercel.app/api/auth/getalldonors/${username}`
        );
        const data = await response.json();
        const donor = data?.data;
        setDonor(donor);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [id]);

  if (!isLoading && !donor) {
    return <NotFound />;
  }

  const handleBloodRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBloodRequestLoading(true);

    // check if donation date is on a past date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const donationDateObj = new Date(donationDate);
    donationDateObj.setHours(0, 0, 0, 0);

    if (donationDateObj < today) {
      toast.error('You can not ask for a donation on a past date.', {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
      return;
    }

    const requestData = {
      requester: {
        name: requester?.name,
        username: requester?.username,
        email: requester?.email,
        isAccountActive: requester?.isAccountActive,
        location: {
          address: requester?.location?.address,
          city: requester?.location?.city,
          state: requester?.location?.state,
          postalCode: requester?.location?.postalCode,
          country: requester?.location?.country,
          mobile: requesterMobile,
        },
      },
      donor: {
        name: donor?.name,
        username: donor?.username,
        email: donor?.email,
        isAvailableToDonate: donor?.isAvailableToDonate,
        bloodGroup: donor?.bloodGroup,
        isAccountActive: donor?.isAccountActive,
        location: {
          address: donor?.location?.address,
          city: donor?.location?.city,
          state: donor?.location?.state,
          postalCode: donor?.location?.postalCode,
          country: donor?.location?.country,
          mobile: donor?.location?.mobile,
        },
      },
      agreeToTermsAndConditions: agreeToTermsAndConditions,
      requestStatus: 'pending',
      donationInfo: {
        hospitalName: hospitalName,
        hospitalAddress: hospitalAddress,
        donationDate: donationDate,
        reasonForDonation: reasonForDonation,
      },
    };

    const response = await fetch(
      'https://redhope-backend.vercel.app/api/bloodrequests/create-blood-request',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    );

    const data = await response.json();
    setIsBloodRequestLoading(false);

    if (data?.statusCode === 201) {
      toast.success(data?.message, {
        position: 'top-right',
        duration: 1500,
        icon: ' ✔️',
      });
      router.push('/dashboard');
    } else {
      toast.error(data?.message, {
        position: 'top-right',
        duration: 1500,
        icon: ' ❌',
      });
    }
  };

  return (
    <div className="main-container py-14 lg:py-20">
      <h3
        className="text-center text-3xl lg:text-4xl font-bold uppercase"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        {`Request Blood to ${donor?.name}`}
      </h3>
      <p
        className="text-center lg:w-8/12 mx-auto mt-3 md:mb-6 lg:mb-0"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        {`You can request blood to ${donor?.name} by calling him on his phone number or by sending him a message on his email address. But make sure that you are requesting blood for a valid reason. We will allow you to see his/her when he/she will accept your request.`}
      </p>
      {/* form */}
      <div
        className="lg:w-9/12 shadow rounded lg:mx-auto py-8 lg:py-14 px-4 md:px-6 lg:px-12 mt-6 lg:mt-12"
        data-aos="fade-down"
        data-aos-duration="2000"
      >
        <form onSubmit={handleBloodRequest}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8">
            {/* requester name */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="rname"
                className="block mb-2 text-sm text-gray-400 "
              >
                Requester Name
              </label>
              <input
                type="text"
                name="rname"
                id="rname"
                className="text-sm font-semibold text-black rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 cursor-not-allowed focus:outline-none"
                placeholder={requester?.name || 'e.g. Babul Akter'}
                required
                value={requester?.name || ''}
                disabled={true}
              />
            </div>
            {/* requester username */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="rusername"
                className="block mb-2 text-sm text-gray-400 "
              >
                Requester Username
              </label>
              <input
                type="text"
                name="rusername"
                id="rusername"
                className="text-sm font-semibold text-black rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 cursor-not-allowed focus:outline-none"
                placeholder={requester?.username || 'e.g. babulakterfsd'}
                required
                value={requester?.username || ''}
                disabled={true}
              />
            </div>
            {/* requester email */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="remail"
                className="block mb-2 text-sm text-gray-400 "
              >
                Requester Email
              </label>
              <input
                type="email"
                name="remail"
                id="remail"
                className="text-sm font-semibold text-black rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 cursor-not-allowed focus:outline-none"
                placeholder={requester?.email || 'e.g. babulakterfsd@gmail.com'}
                required
                value={requester?.email || ''}
                disabled={true}
              />
            </div>
            {/* requester mobile */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="rmobile"
                className="block mb-2 text-sm text-gray-400 "
              >
                Requester Mobile
              </label>
              <input
                type="text"
                name="rmobile"
                id="rmobile"
                className="text-sm font-semibold text-black rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 focus:outline-none"
                placeholder={requesterMobile || 'e.g. 01740020464'}
                required
                value={requesterMobile}
                onChange={(e) => setRequesterMobile(e.target.value)}
              />
            </div>
            {/* hospital name */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="hname"
                className="block mb-2 text-sm text-gray-400 "
              >
                Hospital Name
              </label>
              <input
                type="text"
                name="hname"
                id="hname"
                className="text-sm font-semibold text-black rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 focus:outline-none"
                placeholder={'e.g. Dhunat Upazila Health Complex'}
                required
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            </div>
            {/* hospital address */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="haddress"
                className="block mb-2 text-sm text-gray-400 "
              >
                Hospital Address
              </label>
              <input
                type="text"
                name="haddress"
                id="haddress"
                className="text-sm font-semibold text-black rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 focus:outline-none"
                placeholder={'e.g. Dhunat, Bogura'}
                required
                value={hospitalAddress}
                onChange={(e) => setHospitalAddress(e.target.value)}
              />
            </div>
            {/* donation date */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="ddate"
                className="block mb-2 text-sm text-gray-400 "
              >
                Donation Date
              </label>
              <input
                type="date"
                name="ddate"
                id="ddate"
                className="text-sm font-semibold text-black rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 focus:outline-none"
                placeholder="e.g. January 28, 2024"
                required
                value={donationDate}
                onChange={(e) => setDonationDate(e.target.value)}
              />
            </div>
            {/* donation reason */}
            <div className="col-span-12 md:col-span-6">
              <label
                htmlFor="dreason"
                className="block mb-2 text-sm text-gray-400 "
              >
                Reason for Donation
              </label>
              <input
                type="text"
                name="dreason"
                id="dreason"
                className="text-sm font-semibold text-black rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 focus:outline-none"
                placeholder={'e.g. accident'}
                required
                value={reasonForDonation}
                onChange={(e) => setReasonForDonation(e.target.value)}
              />
            </div>
            {/* agree to terms */}
            <div className="col-span-12 md:col-span-6">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="text-sm font-semibold text-black rounded-lg mr-1 p-2.5 bg-gray-50 border-gray-600 focus:outline-none"
                required
                checked={agreeToTermsAndConditions}
                onChange={(e) => setAgreeToTermsAndConditions(e.target.checked)}
              />
              <label htmlFor="terms" className=" text-black">
                I agree to the terms and conditions of Redhope
              </label>
            </div>
          </div>
          {/* submit button */}
          <div className="flex justify-end mr-3 mt-4">
            <button
              className="bg-red-400 rounded-md px-8 py-4 cursor-pointer text-white transition-colors duration-300 ease-in-out flex items-center space-x-2 mt-8 disabled:bg-red-300"
              type="submit"
              disabled={isBloodRequestLoading}
            >
              Request Blood
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestBlood;
