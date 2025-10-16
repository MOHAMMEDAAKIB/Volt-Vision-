import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchEVs from './pages/SearchEVs';
import Compare from './pages/Compare';
import Calculator from './pages/Calculator';
import ChargingMap from './pages/ChargingMap';
import AIAssistant from './pages/AIAssistant';
import EVTips from './pages/EVTips';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchEVs />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/charging-map" element={<ChargingMap />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/tips" element={<EVTips />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
