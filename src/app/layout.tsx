import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import { Header } from '@/components/common/header';
import { ScrollToTopButton } from '@/components/scroll-to-top';
import Provider from '@/components/session-provider';
import { metadataConfig } from '@/constants/metadata';

export const metadata: Metadata = {
  title: metadataConfig.title,
  description: metadataConfig.description,
  openGraph: {
    title: metadataConfig.title,
    description: metadataConfig.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Provider>
          <div className="min-h-screen bg-gray-50">
            <ToastContainer />
            <Header />
            <main>{children}</main>
          </div>
          <ScrollToTopButton />
        </Provider>
      </body>
    </html>
  );
}
