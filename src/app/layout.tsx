import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'To-DO App',
  description:
    'An App that helps you build To-Do lists, where you can add, edit, view, and delete tasks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Head>
          <title>To-DO App</title>
          <meta
            property='og:title'
            content='An App that helps you build To-Do lists, where you can add, edit, view, and delete tasks.'
            key='title'
          />
        </Head>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
