import { useState } from 'react';
import { survivalGuides } from '../../data';

function SurvivalGuides() {
  const [selectedGuide, setSelectedGuide] = useState('earthquake');

  const guides = {
    earthquake: survivalGuides.earthquake,
    tsunami: survivalGuides.tsunami,
    flood: survivalGuides.flood,
  };

  const currentGuide = guides[selectedGuide];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Disaster Survival Guides</h1>

      {/* Guide Selection */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedGuide('earthquake')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            selectedGuide === 'earthquake'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          🌍 Earthquake
        </button>
        <button
          onClick={() => setSelectedGuide('tsunami')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            selectedGuide === 'tsunami'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          🌊 Tsunami
        </button>
        <button
          onClick={() => setSelectedGuide('flood')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            selectedGuide === 'flood'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          💧 Flood
        </button>
      </div>

      {/* Guide Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-6xl">{currentGuide.icon}</span>
          <h2 className="text-3xl font-bold">{currentGuide.title}</h2>
        </div>

        <div className="space-y-6">
          {currentGuide.sections.map((section, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold mb-3 text-blue-800">{section.title}</h3>
              <ul className="space-y-2">
                {section.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Emergency Kit Checklist */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-yellow-900">🎒 Emergency Kit Essentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <div>✓ Water (1 gallon per person per day)</div>
            <div>✓ Non-perishable food (3-day supply)</div>
            <div>✓ Flashlight and extra batteries</div>
            <div>✓ First aid kit</div>
            <div>✓ Radio (battery or hand crank)</div>
            <div>✓ Important documents (copies)</div>
            <div>✓ Cash and credit cards</div>
            <div>✓ Medications and prescriptions</div>
            <div>✓ Phone charger and backup battery</div>
            <div>✓ Whistle for signaling</div>
            <div>✓ Dust masks and plastic sheeting</div>
            <div>✓ Local maps</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurvivalGuides;
