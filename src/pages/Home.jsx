import React from 'react';
import { HeroScrollLock } from '@/components/sections/HeroScrollLock/HeroScrollLock';
import {AboutUs} from '../components/sections/AboutUS/AboutUS';
import { StatsCounter } from '../components/sections/StatsCounter/StatsCounter';
import { ServicesGrid } from '../components/sections/ServicesGrid/ServicesGrid';
import  ScrollSection  from '../components/sections/ScrollSection/ScrollSection';
import CaseStudies  from '../components/sections/CaseStudies/CaseStudies';
import  WhyChooseUs  from '../components/sections/WhyChooseUs/WhyChooseUs';
import OurClints from '../components/sections/OurClients/OurClients';
import OurProcess from '../components/sections/OurProcess/OurProcess';
import Testimonials from '../components/sections/Testimonials/Testimonials';

const Home = () => {
  return (
    <>
    <HeroScrollLock />
    <AboutUs translationPrefix="home.intro" />
    <StatsCounter translationPrefix="home.stats" />
    <ServicesGrid translationPrefix="home.values" />
    <ScrollSection /> 
    <CaseStudies translationPrefix="home.caseStudies" />
    <WhyChooseUs translationPrefix="home.whyChooseUs" />
    <OurClints /> 
    <OurProcess />
      <Testimonials translationPrefix="home.testimonials" />
    </>
  );
};

export default Home;
