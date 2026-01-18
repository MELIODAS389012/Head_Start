import { useState, useEffect } from 'react';

function Home() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Simulate receiving an alert
    const hasAlert = Math.random() > 0.7;
    if (hasAlert) {
      setAlert({
        type: 'warning',
        title: 'Earthquake Alert',
        message: 'Unusual animal behavior detected in your area. Stay alert and prepared.',
        time: new Date().toLocaleTimeString(),
      });
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold mb-2">Welcome to Head-Start</h1>
        <p className="text-xl">AI-Powered Disaster Warning & Safety Platform</p>
      </div>

      {/* Alert Notification */}
      {alert && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-lg mb-6 animate-pulse">
          <div className="flex items-start">
            <span className="text-2xl mr-3">⚠️</span>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{alert.title}</h3>
              <p className="mt-1">{alert.message}</p>
              <p className="text-sm mt-2 text-yellow-700">Received at: {alert.time}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="font-bold text-lg mb-2">Survival Guides</h3>
          <p className="text-gray-600 text-sm">Learn how to stay safe during disasters</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-bold text-lg mb-2">Safety Quiz</h3>
          <p className="text-gray-600 text-sm">Test your disaster preparedness knowledge</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="font-bold text-lg mb-2">Emergency Map</h3>
          <p className="text-gray-600 text-sm">Find nearby shelters and hospitals</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
          <div className="text-4xl mb-3">📰</div>
          <h3 className="font-bold text-lg mb-2">News Feed</h3>
          <p className="text-gray-600 text-sm">Stay updated with latest alerts</p>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">🌍 How It Works</h2>
          <div className="space-y-3 text-gray-700">
            <p>🐾 <strong>Animal Monitoring:</strong> IoT sensors track animal behavior patterns</p>
            <p>🤖 <strong>AI Analysis:</strong> Machine learning detects anomalies</p>
            <p>⚠️ <strong>Early Warning:</strong> Alerts sent before disasters strike</p>
            <p>🛡️ <strong>Stay Safe:</strong> Access guides, maps, and emergency resources</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">📊 Platform Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Animals Monitored</span>
              <span className="text-2xl font-bold text-blue-600">10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Active Sensors</span>
              <span className="text-2xl font-bold text-green-600">10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Prediction Accuracy</span>
              <span className="text-2xl font-bold text-purple-600">94.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Users Protected</span>
              <span className="text-2xl font-bold text-orange-600">1,250+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg shadow mt-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4">🚨 Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-red-600">911</p>
            <p className="text-gray-700">Emergency Services</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-red-600">211</p>
            <p className="text-gray-700">Disaster Assistance</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-red-600">311</p>
            <p className="text-gray-700">Non-Emergency Info</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
