import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { emergencyLocations } from '../../data';
import L from 'leaflet';

// Custom icons for different location types
const shelterIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function EmergencyMap() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🗺️ Emergency Map</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="h-96 lg:h-[600px] rounded-lg overflow-hidden">
              <MapContainer
                center={[40.7580, -73.9855]}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {emergencyLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.lat, location.lng]}
                    icon={location.type === 'shelter' ? shelterIcon : hospitalIcon}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 capitalize">
                          {location.type === 'shelter' ? '🏠 Emergency Shelter' : '🏥 Hospital'}
                        </p>
                        {location.type === 'shelter' ? (
                          <p className="text-sm">Capacity: {location.capacity} people</p>
                        ) : (
                          <p className="text-sm">Beds: {location.beds}</p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Location List */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Legend</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Emergency Shelter</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">Hospital</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">🏠 Shelters ({emergencyLocations.filter(l => l.type === 'shelter').length})</h2>
            <div className="space-y-3">
              {emergencyLocations
                .filter((location) => location.type === 'shelter')
                .map((location) => (
                  <div key={location.id} className="border-l-4 border-blue-500 pl-3">
                    <h3 className="font-semibold text-sm">{location.name}</h3>
                    <p className="text-xs text-gray-600">Capacity: {location.capacity}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">🏥 Hospitals ({emergencyLocations.filter(l => l.type === 'hospital').length})</h2>
            <div className="space-y-3">
              {emergencyLocations
                .filter((location) => location.type === 'hospital')
                .map((location) => (
                  <div key={location.id} className="border-l-4 border-red-500 pl-3">
                    <h3 className="font-semibold text-sm">{location.name}</h3>
                    <p className="text-xs text-gray-600">Beds: {location.beds}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyMap;
