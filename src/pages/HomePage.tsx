import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductCarousel from '../components/ProductCarousel';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductCarousel />
    </>
  );
};

export default HomePage;
