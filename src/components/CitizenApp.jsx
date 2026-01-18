import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './citizen/Home';
import SurvivalGuides from './citizen/SurvivalGuides';
import Quiz from './citizen/Quiz';
import News from './citizen/News';
import EmergencyMap from './citizen/EmergencyMap';

function CitizenApp() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 Home', icon: '🏠' },
    { path: '/guides', label: '📚 Survival Guides', icon: '📚' },
    { path: '/quiz', label: '🎯 Safety Quiz', icon: '🎯' },
    { path: '/news', label: '📰 News Feed', icon: '📰' },
    { path: '/map', label: '🗺️ Emergency Map', icon: '🗺️' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 whitespace-nowrap font-semibold transition ${
                  location.pathname === item.path
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides" element={<SurvivalGuides />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/news" element={<News />} />
          <Route path="/map" element={<EmergencyMap />} />
        </Routes>
      </div>
    </div>
  );
}

export default CitizenApp;
