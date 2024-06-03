import About from '@/components/homepage/About';
import Banner from '@/components/homepage/Banner';
import DonorAreas from '@/components/homepage/DonorAreas';
import OurDonors from '@/components/homepage/OurDonors';
import CommonLayout from '@/components/layout/CommonLayout';

const page = () => {
  return (
    <CommonLayout>
      <Banner />
      <About />
      <OurDonors />
      <DonorAreas />
    </CommonLayout>
  );
};

export default page;
