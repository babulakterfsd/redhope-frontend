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
      <body className="overflow-x-hidden">
        <Providers session={session}>
          <div className="h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
