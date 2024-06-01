import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

const CommonLayout = (props: any) => {
  return (
    <>
      <Navbar />
      <div className="h-screen">{props.children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
