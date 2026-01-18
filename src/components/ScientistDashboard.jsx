import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateAnimalData } from '../data';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ScientistDashboard() {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [alertActive, setAlertActive] = useState(false);

  useEffect(() => {
    // Initial data
    const initialData = generateAnimalData();
    setAnimals(initialData);
    checkAlertStatus(initialData);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const updatedData = generateAnimalData();
      setAnimals(updatedData);
      checkAlertStatus(updatedData);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const checkAlertStatus = (animalData) => {
    const criticalCount = animalData.filter(a => a.status === 'critical').length;
    const criticalPercentage = (criticalCount / animalData.length) * 100;
    setAlertActive(criticalPercentage >= 70);
  };

  const criticalCount = animals.filter(a => a.status === 'critical').length;
  const criticalPercentage = animals.length > 0 ? ((criticalCount / animals.length) * 100).toFixed(1) : 0;

  return (
    <div className="container mx-auto p-6">
      {/* AI Alert Banner */}
      {alertActive && (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <h2 className="text-xl font-bold">CRITICAL ALERT: Potential Disaster Detected!</h2>
                <p>70%+ animals showing critical behavior patterns. Immediate action recommended.</p>
              </div>
            </div>
            <span className="text-2xl font-bold">{criticalPercentage}%</span>
          </div>
        </div>
      )}

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Total Animals</h3>
          <p className="text-3xl font-bold text-blue-600">{animals.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Critical Status</h3>
          <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Normal Status</h3>
          <p className="text-3xl font-bold text-green-600">{animals.length - criticalCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm">Alert Level</h3>
          <p className={`text-3xl font-bold ${alertActive ? 'text-red-600' : 'text-green-600'}`}>
            {criticalPercentage}%
          </p>
        </div>
      </div>

      {/* Animal Monitoring Cards */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Animal Monitoring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {animals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => setSelectedAnimal(animal)}
              className={`bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition ${
                animal.status === 'critical' ? 'border-2 border-red-500' : 'border-2 border-green-500'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{animal.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  animal.status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {animal.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{animal.location.name}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Heart Rate:</span>
                  <span className={`font-semibold ${animal.vitals.heartRate > 120 ? 'text-red-600' : 'text-green-600'}`}>
                    {animal.vitals.heartRate} bpm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stress:</span>
                  <span className={`font-semibold ${animal.vitals.stress > 60 ? 'text-red-600' : 'text-green-600'}`}>
                    {animal.vitals.stress}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activity:</span>
                  <span className={`font-semibold ${animal.vitals.activity > 60 ? 'text-red-600' : 'text-green-600'}`}>
                    {animal.vitals.activity}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed View with Chart */}
      {selectedAnimal && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{selectedAnimal.name} - Detailed Analysis</h2>
              <p className="text-gray-600">{selectedAnimal.location.name}</p>
            </div>
            <button
              onClick={() => setSelectedAnimal(null)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={selectedAnimal.history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="heartRate" stroke="#ef4444" name="Heart Rate" />
              <Line type="monotone" dataKey="stress" stroke="#f59e0b" name="Stress Level" />
              <Line type="monotone" dataKey="activity" stroke="#3b82f6" name="Activity Level" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Map View */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Animal Locations</h2>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={4}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {animals.map((animal) => (
              <Marker key={animal.id} position={[animal.location.lat, animal.location.lng]}>
                <Popup>
                  <div>
                    <h3 className="font-bold">{animal.name}</h3>
                    <p className="text-sm">Status: {animal.status}</p>
                    <p className="text-sm">Heart Rate: {animal.vitals.heartRate} bpm</p>
                    <p className="text-sm">Stress: {animal.vitals.stress}%</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Validation Panel */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Validation Panel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Data Quality Metrics</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Sensor Accuracy:</span>
                <span className="text-green-600 font-semibold">98.5%</span>
              </li>
              <li className="flex justify-between">
                <span>Data Completeness:</span>
                <span className="text-green-600 font-semibold">99.2%</span>
              </li>
              <li className="flex justify-between">
                <span>Signal Strength:</span>
                <span className="text-green-600 font-semibold">Strong</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">AI Model Performance</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Prediction Accuracy:</span>
                <span className="text-green-600 font-semibold">94.7%</span>
              </li>
              <li className="flex justify-between">
                <span>False Positive Rate:</span>
                <span className="text-green-600 font-semibold">3.2%</span>
              </li>
              <li className="flex justify-between">
                <span>Model Status:</span>
                <span className="text-green-600 font-semibold">Active</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScientistDashboard;
