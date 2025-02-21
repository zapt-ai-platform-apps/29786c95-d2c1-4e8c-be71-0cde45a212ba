import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Questions from './screens/Questions';
import SimulatedTests from './screens/SimulatedTests';
import Performance from './screens/Performance';
import Gamification from './screens/Gamification';
import Navbar from './components/Navbar';
import Badge from './components/Badge';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Navbar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/simulated-tests" element={<SimulatedTests />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/gamification" element={<Gamification />} />
        </Routes>
      </div>
      <Badge />
    </div>
  );
}

export default App;