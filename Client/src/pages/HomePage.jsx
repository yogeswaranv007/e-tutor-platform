import React from 'react';
import Banner from '../components/Banner';
import StepSection from '../components/StepSection';
import Categories from '../components/Categories';
import SubscriptionPlans from '../components/SubscriptionPlans';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div>
      <Banner />
      <StepSection />
      <Categories />
      <SubscriptionPlans />
      <Footer />
    </div>
  );
}

export default HomePage;
