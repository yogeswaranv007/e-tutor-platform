import React from 'react';
import Banner from '../components/homepage/Banner';
import StepSection from '../components/homepage/StepSection';
import Categories from '../components/homepage/Categories';
import SubscriptionPlans from '../components/homepage/SubscriptionPlans';
import Footer from '../components/common/Footer';


function HomePage() {
  return (
    <div>
      <div className='homepage'>
      <Banner />
      <StepSection />
      <Categories />
      <SubscriptionPlans />
      <Footer />
    </div>
    </div>
  );
}

export default HomePage;
