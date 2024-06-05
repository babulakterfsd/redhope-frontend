'use client';

import { useEffect, useState } from 'react';

const MyRequests = ({ loggedInUser }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bloodrequests/requests-made-by-me?requesterEmail=${loggedInUser?.email}`
        );
        const data = await response.json();
        const myrequests = data?.data;
        setMyRequests(myrequests);
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, [loggedInUser?.email]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">My Blood Requests</h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        In this section, you can view all the blood requests you have made. You
        can view the status of the request and also can see the donor contact
        info if the request is accepted.
      </p>
    </div>
  );
};

export default MyRequests;
