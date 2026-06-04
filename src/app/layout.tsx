import './globals.css';
import type { Metadata } from 'next';

import { Header } from '@/components/common/header';

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
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
