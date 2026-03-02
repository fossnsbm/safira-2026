import '../../styles/sections.css';
import { ParticlesBackground } from '../ui/ParticlesBackground';

export const Home: React.FC = () => {
  const handleScrollToRegistration = () => {
    const el = document.getElementById('registration');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-section">
      <ParticlesBackground />
      <h1>Welcome to Safira '26</h1>
      <button onClick={handleScrollToRegistration}>
        Register Now
      </button>
    </div>
  );
};
