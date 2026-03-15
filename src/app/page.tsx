'use client';

import { Container } from '@/components/layout';
import {
  ApplicationDataInfo,
  HomePageHero,
  HomePageHowItWorks,
  HomePageStatsCta,
} from '@/components/pages';

export default function Home() {
  return (
    <Container className="bg-background flex flex-col gap-12">
      <HomePageHero />
      <HomePageHowItWorks />
      <ApplicationDataInfo />
      {/* // TODO: Update this HomePageStatsCta component */}
      {/* <HomePageStatsCta /> */}
    </Container>
  );
}
