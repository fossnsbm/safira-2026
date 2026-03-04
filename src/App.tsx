import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/sections/Home';
import Registration from './components/sections/Registration';
import './styles/sections.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
