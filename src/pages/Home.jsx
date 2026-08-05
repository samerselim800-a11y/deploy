import React from 'react';
import { HeroScrollLock } from '@/components/sections/HeroScrollLock/HeroScrollLock';
import {AboutUs} from '../components/sections/AboutUS/AboutUS';
import { StatsCounter } from '../components/sections/StatsCounter/StatsCounter';
import { ServicesGrid } from '../components/sections/ServicesGrid/ServicesGrid';
import  ScrollSection  from '../components/sections/ScrollSection/ScrollSection';
import  WhyChooseUs  from '../components/sections/WhyChooseUs/WhyChooseUs';
import OurClints from '../components/sections/OurClients/OurClients';
import OurProcess from '../components/sections/OurProcess/OurProcess';
import Testimonials from '../components/sections/Testimonials/Testimonials';

const Home = () => {
  return (
    <>
      <div dir="ltr">
        <HeroScrollLock />
      </div>

      <AboutUs translationPrefix="home.intro" />

      <div dir="ltr">
        <StatsCounter translationPrefix="home.stats" />
      </div>

      <ServicesGrid translationPrefix="home.values" />
      <ScrollSection />
      <WhyChooseUs translationPrefix="home.whyChooseUs" />

      <div dir="ltr">
        <OurClints />
      </div>

      <OurProcess />

      <div dir="ltr">
        <Testimonials translationPrefix="home.testimonials" />
      </div>
    </>
  );
};

export default Home;
