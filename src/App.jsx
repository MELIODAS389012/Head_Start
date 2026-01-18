import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScientistDashboard from './components/ScientistDashboard';
import CitizenApp from './components/CitizenApp';
import Home from './components/citizen/Home';
import SurvivalGuides from './components/citizen/SurvivalGuides';
import Quiz from './components/citizen/Quiz';
import News from './components/citizen/News';
import EmergencyMap from './components/citizen/EmergencyMap';

function App() {
  const [viewMode, setViewMode] = useState('scientist'); // 'scientist' or 'citizen'

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* View Toggle */}
        <div className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">🌍 Head-Start: AI Disaster Warning</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('scientist')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  viewMode === 'scientist'
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                🔬 Scientist Dashboard
              </button>
              <button
                onClick={() => setViewMode('citizen')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  viewMode === 'citizen'
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                👥 Citizen App
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'scientist' ? (
          <ScientistDashboard />
        ) : (
          <CitizenApp />
        )}
      </div>
    </Router>
  );
}

export default App;
