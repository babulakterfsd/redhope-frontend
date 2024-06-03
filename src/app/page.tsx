import About from '@/components/homepage/About';
import Banner from '@/components/homepage/Banner';
import CommonLayout from '@/components/layout/CommonLayout';

const page = () => {
  return (
    <CommonLayout>
      <Banner />
      <About />
    </CommonLayout>
  );
};

export default page;
