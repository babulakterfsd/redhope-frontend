'use client';
import NotFound from '@/app/not-found';
import { TDonor } from '@/types/common.types';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const RequestBlood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [donor, setDonor] = useState({} as TDonor);
  const { id } = useParams();
  const username = id;
  const session = useSession();
  const requester = session?.data?.user;

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

  if (!isLoading && !donor && !session?.data?.user) {
    return <NotFound />;
  }

  return (
    <div className="main-container py-14 lg:py-20">
      <h3 className="text-center text-3xl lg:text-4xl font-bold uppercase">
        {`Request Blood to ${donor?.name}`}
      </h3>
      <p className="text-center lg:w-8/12 mx-auto mt-3 md:mb-6 lg:mb-0">
        {`You can request blood to ${donor?.name} by calling him on his phone number or by sending him a message on his email address. But make sure that you are requesting blood for a valid reason. We will allow you to see his/her when he/she will accept your request.`}
      </p>
    </div>
  );
};

export default RequestBlood;
