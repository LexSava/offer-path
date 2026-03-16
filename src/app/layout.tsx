import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Doto, Montserrat } from 'next/font/google';
import { getServerSession } from 'next-auth';
import './globals.css';
import '@/lib/toast/toast.styles.css';
import { Header } from '@/components/layout';
import { AuthProvider } from '@/components/providers';
import { Toaster } from 'sonner';
import { ApplicationsProvider, LoginModalProvider } from '@/contexts';
import { authOptions } from '@/lib/auth';
import { TOASTER_CONFIG } from '@/lib/toast';

const doto = Doto({
  subsets: ['latin'],
  variable: '--font-logo',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Force dynamic SSR so social crawlers always get fresh HTML metadata.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL('https://offer-path-sigma.vercel.app'),
  title: 'OfferPath - Your Job Application Tracker',
  description:
    'Track your job applications efficiently with OfferPath. Keep all your application information in one place and stay organized throughout your job search.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://offer-path-sigma.vercel.app',
    siteName: 'OfferPath',
    title: 'OfferPath - Your Job Application Tracker',
    description:
      'Track your job applications efficiently with OfferPath. Keep all your application information in one place and stay organized throughout your job search.',
    images: [
      {
        url: 'https://offer-path-sigma.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'OfferPath - Your Job Application Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OfferPath - Your Job Application Tracker',
    description:
      'Track your job applications efficiently with OfferPath. Keep all your application information in one place and stay organized throughout your job search.',
    images: ['https://offer-path-sigma.vercel.app/opengraph-image'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${doto.variable} ${montserrat.variable} antialiased`}>
        <AuthProvider session={session}>
          <ApplicationsProvider>
            <LoginModalProvider>
              <Header />
              {children}
              <Toaster {...TOASTER_CONFIG} />
            </LoginModalProvider>
          </ApplicationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
