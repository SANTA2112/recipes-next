import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import { Header } from '@/components/common/header';
import Provider from '@/components/session-provider';

export const metadata: Metadata = {
  title: 'Русская кухня',
  description: 'На этом сайте собраны рецепты русской кухни',
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
        </Provider>
      </body>
    </html>
  );
}
