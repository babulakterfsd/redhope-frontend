import About from '@/components/homepage/About';
import Banner from '@/components/homepage/Banner';
import DonorAreas from '@/components/homepage/DonorAreas';
import OurDonors from '@/components/homepage/OurDonors';
import SuccessStories from '@/components/homepage/SuccessStories';
import CommonLayout from '@/components/layout/CommonLayout';

const page = () => {
  return (
    <CommonLayout>
      <Banner />
      <About />
      <OurDonors />
      <DonorAreas />
      <SuccessStories />
    </CommonLayout>
  );
};

export default page;
