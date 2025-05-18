import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/next";
import AuthProvider from '@/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME as string,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS as string,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_APP_URL as string,
    title: process.env.NEXT_PUBLIC_APP_NAME as string,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
    images: ['/icon.png'],
    siteName: process.env.NEXT_PUBLIC_APP_NAME as string,
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_APP_NAME as string,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
    images: ['/icon.png'],
    creator: "@aadarsh_guru",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
      <Analytics />
    </html>
  );
};