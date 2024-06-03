import About from '@/components/homepage/About';
import Banner from '@/components/homepage/Banner';
import OurDonors from '@/components/homepage/OurDonors';
import CommonLayout from '@/components/layout/CommonLayout';

const page = () => {
  return (
    <CommonLayout>
      <Banner />
      <About />
      <OurDonors />
    </CommonLayout>
  );
};

export default page;
