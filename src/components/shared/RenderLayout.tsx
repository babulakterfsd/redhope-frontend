'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Toaster } from 'sonner';
import Footer from './Footer';
import Navbar from './Navbar';

const RenderLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <>
      {pathname === '/login' || pathname === '/register' ? (
        <>
          <Toaster />
          <div className="h-screen">{children}</div>
        </>
      ) : (
        <>
          <Toaster />
          <Navbar />
          <div className="h-screen">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default RenderLayout;
