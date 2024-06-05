'use client';

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

const CommonLayout = (props: any) => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">{props.children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
