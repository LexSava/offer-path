'use client';

import { Container } from '@/components/layout';
import { HomePageHero, HomePageHowItWorks, HomePageStatsCta } from '@/components/pages';

export default function Home() {
  return (
    <Container className="bg-background flex flex-col gap-12">
      <HomePageHero />
      <HomePageHowItWorks />
      <HomePageStatsCta />
    </Container>
  );
}
