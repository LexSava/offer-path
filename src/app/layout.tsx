import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Doto, Montserrat } from 'next/font/google';
import { getServerSession } from 'next-auth';
import './globals.css';
import { Header } from '@/components/layout';
import { AuthProvider } from '@/components/providers';
import { ApplicationsProvider, LoginModalProvider, TooltipProvider } from '@/contexts';
import { authOptions } from '@/lib/auth';

const doto = Doto({
  subsets: ['latin'],
  variable: '--font-logo',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'OfferPath - Your Job Application Tracker',
  description:
    'Track your job applications efficiently with OfferPath. Keep all your application information in one place and stay organized throughout your job search.',
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
            <TooltipProvider>
              <LoginModalProvider>
                <Header />
                {children}
              </LoginModalProvider>
            </TooltipProvider>
          </ApplicationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
