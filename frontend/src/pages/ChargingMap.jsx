import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Zap, Clock, DollarSign, Filter } from 'lucide-react';
import { chargingStations } from '../data/evData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ChargingMap = () => {
  const [filteredStations, setFilteredStations] = useState(chargingStations);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCharger, setSelectedCharger] = useState('all');
  const [mapCenter] = useState([6.9271, 79.8612]); // Colombo center

  useEffect(() => {
    let filtered = chargingStations;

    if (selectedType !== 'all') {
      filtered = filtered.filter(station => station.type === selectedType);
    }

    if (selectedCharger !== 'all') {
      filtered = filtered.filter(station => 
        station.chargerTypes.includes(selectedCharger)
      );
    }

    setFilteredStations(filtered);
  }, [selectedType, selectedCharger]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Charging Station Map</h1>
          <p className="text-gray-600">Find EV charging stations across Sri Lanka</p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-primary" />
            <h2 className="text-lg font-bold text-gray-800">Filter Stations</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Station Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input"
              >
                <option value="all">All Types</option>
                <option value="Public">Public</option>
                <option value="Semi-Public">Semi-Public</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Charger Type
              </label>
              <select
                value={selectedCharger}
                onChange={(e) => setSelectedCharger(e.target.value)}
                className="input"
              >
                <option value="all">All Chargers</option>
                <option value="AC">AC Charging</option>
                <option value="DC Fast">DC Fast Charging</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="bg-primary/10 p-3 rounded-lg w-full">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-primary">{filteredStations.length}</span> stations found
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stations List */}
          <div className="lg:col-span-1">
            <div className="card max-h-[600px] overflow-y-auto">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Station List</h2>
              
              <div className="space-y-4">
                {filteredStations.map((station) => (
                  <div key={station.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{station.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        station.available > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {station.available}/{station.total}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{station.location}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Zap className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{station.chargerTypes.join(', ')}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>LKR {station.price}/kWh</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{station.hours}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {station.amenities.map((amenity, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="card p-0 overflow-hidden h-[600px]">
              <MapContainer
                center={mapCenter}
                zoom={10}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredStations.map((station) => (
                  <Marker
                    key={station.id}
                    position={station.coordinates}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-gray-800 mb-2">{station.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{station.location}</p>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <Zap className="w-3 h-3 mr-1" />
                            <span>{station.chargerTypes.join(', ')}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="font-semibold mr-1">Power:</span>
                            <span>{station.power.join(', ')}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="font-semibold mr-1">Available:</span>
                            <span className={station.available > 0 ? 'text-green-600' : 'text-red-600'}>
                              {station.available}/{station.total}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            <span>LKR {station.price}/kWh</span>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{station.hours}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Legend */}
            <div className="card mt-4">
              <h3 className="font-bold text-gray-800 mb-3">Map Legend</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Chargers Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>All Chargers Busy</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                * Availability shown is indicative. Please verify before visiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargingMap;
