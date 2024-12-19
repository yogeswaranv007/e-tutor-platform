import Hero from '../components/About/hero';
import Features from '../components/About/features';
import Reviews from '../components/About/reviews';
import Faq from '../components/About/faq';
import Footer from '../components/common/Footer';

function About() {
  return (
    <div>
      <Hero/>
      <Features/>
      <Faq/>
      <Reviews/>
      <Footer/>
    </div>
  );
}
export default About;