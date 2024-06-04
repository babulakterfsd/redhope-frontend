import DonorListPage from '@/components/donorlist/DonorList';
import CommonLayout from '@/components/layout/CommonLayout';

const page = async () => {
  const data = await fetch('http://localhost:5000/api/auth/getalldonors');
  const donorsList = await data.json();
  const donors = donorsList?.data?.data;

  return (
    <CommonLayout>
      <DonorListPage donors={donors} />
    </CommonLayout>
  );
};

export default page;
