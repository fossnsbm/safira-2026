import "../../styles/app.css";
import "../../styles/components.css";
import Hero from '../landing/Hero';
import About from './About';
import WhoWeAre from './WhoWeAre';
import FAQ from './FAQ';
import Footer from './Footer';
import { ParticlesBackground } from '../ui/ParticlesBackground';

export function Home() {
  return (
    <div className="home-wrapper">
      <ParticlesBackground />
      <Hero />
      <About />
      <WhoWeAre />
      <FAQ />
      <Footer />
    </div>
  );
}
