import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import Providers from '@/util/providers';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'RedHope: Every drop counts',
  description:
    'RedHope is a blood donation platform that connects donors with recipients.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Navbar />
          <div className="h-screen">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
