'use client';

import { Container } from '@/components/layout';
import { HomePageHero } from '@/components/pages';

export default function Home() {
  return (
    <Container className="bg-background">
      <HomePageHero />
    </Container>
  );
}
