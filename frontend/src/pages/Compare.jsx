import { useState } from 'react';
import { X, Plus, Battery, Gauge, Zap, Clock, Users, TrendingUp } from 'lucide-react';
import { evModels } from '../data/evData';
import { formatLKR } from '../utils/evCalculations';

const Compare = () => {
  const [selectedEVs, setSelectedEVs] = useState([]);
  const [showSelector, setShowSelector] = useState(true);

  const addEV = (ev) => {
    if (selectedEVs.length < 3 && !selectedEVs.find(e => e.id === ev.id)) {
      setSelectedEVs([...selectedEVs, ev]);
      if (selectedEVs.length === 2) {
        setShowSelector(false);
      }
    }
  };

  const removeEV = (evId) => {
    setSelectedEVs(selectedEVs.filter(ev => ev.id !== evId));
    setShowSelector(true);
  };

  const resetComparison = () => {
    setSelectedEVs([]);
    setShowSelector(true);
  };

  const specs = [
    { key: 'price', label: 'Price', icon: <TrendingUp className="w-4 h-4" />, format: (val) => formatLKR(val) },
    { key: 'type', label: 'Type', icon: <Users className="w-4 h-4" /> },
    { key: 'year', label: 'Year', icon: <Clock className="w-4 h-4" /> },
    { key: 'batteryCapacity', label: 'Battery Capacity', icon: <Battery className="w-4 h-4" />, format: (val) => `${val} kWh` },
    { key: 'range', label: 'Range', icon: <Zap className="w-4 h-4" />, format: (val) => `${val} km` },
    { key: 'acceleration', label: '0-100 km/h', icon: <Gauge className="w-4 h-4" />, format: (val) => `${val}s` },
    { key: 'topSpeed', label: 'Top Speed', icon: <Gauge className="w-4 h-4" />, format: (val) => `${val} km/h` },
    { key: 'efficiency', label: 'Efficiency', icon: <Battery className="w-4 h-4" />, format: (val) => `${val} Wh/km` },
    { key: 'seatingCapacity', label: 'Seating', icon: <Users className="w-4 h-4" />, format: (val) => `${val} seats` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Compare Electric Vehicles</h1>
          <p className="text-gray-600">Compare up to 3 EVs side by side</p>
        </div>

        {/* Selection Info */}
        <div className="card mb-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              <span className="font-semibold">{selectedEVs.length}</span> of 3 vehicles selected
            </p>
            {selectedEVs.length > 0 && (
              <button
                onClick={resetComparison}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Reset Comparison
              </button>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedEVs.length > 0 ? (
          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 border-b-2 border-gray-200 w-48">Specification</th>
                  {selectedEVs.map((ev) => (
                    <th key={ev.id} className="py-4 px-4 border-b-2 border-gray-200 min-w-60">
                      <div className="flex flex-col items-center">
                        <img
                          src={ev.image}
                          alt={`${ev.brand} ${ev.model}`}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <h3 className="font-bold text-gray-800 text-center">
                          {ev.brand} {ev.model}
                        </h3>
                        <p className="text-sm text-gray-600">{ev.variant}</p>
                        <button
                          onClick={() => removeEV(ev.id)}
                          className="mt-2 text-red-500 hover:text-red-600 text-sm"
                        >
                          <X className="w-4 h-4 inline mr-1" />
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                  {selectedEVs.length < 3 && (
                    <th className="py-4 px-4 border-b-2 border-gray-200 min-w-60">
                      <button
                        onClick={() => setShowSelector(true)}
                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors"
                      >
                        <Plus className="w-8 h-8" />
                      </button>
                      <p className="text-sm text-gray-500 mt-2">Add Vehicle</p>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, index) => (
                  <tr key={spec.key} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      <div className="flex items-center space-x-2">
                        {spec.icon}
                        <span>{spec.label}</span>
                      </div>
                    </td>
                    {selectedEVs.map((ev) => (
                      <td key={ev.id} className="py-3 px-4 text-center">
                        {spec.format ? spec.format(ev[spec.key]) : ev[spec.key]}
                      </td>
                    ))}
                    {selectedEVs.length < 3 && (
                      <td className="py-3 px-4 text-center text-gray-400">-</td>
                    )}
                  </tr>
                ))}
                
                {/* Charging Times */}
                <tr className={specs.length % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>AC Charging (Full)</span>
                    </div>
                  </td>
                  {selectedEVs.map((ev) => (
                    <td key={ev.id} className="py-3 px-4 text-center">
                      {ev.chargingTime.ac} hours
                    </td>
                  ))}
                  {selectedEVs.length < 3 && (
                    <td className="py-3 px-4 text-center text-gray-400">-</td>
                  )}
                </tr>
                
                <tr className={specs.length % 2 === 1 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>DC Fast Charging</span>
                    </div>
                  </td>
                  {selectedEVs.map((ev) => (
                    <td key={ev.id} className="py-3 px-4 text-center">
                      {ev.chargingTime.dc} hours
                    </td>
                  ))}
                  {selectedEVs.length < 3 && (
                    <td className="py-3 px-4 text-center text-gray-400">-</td>
                  )}
                </tr>

                {/* Features */}
                <tr className={specs.length % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-4 font-semibold text-gray-700">Key Features</td>
                  {selectedEVs.map((ev) => (
                    <td key={ev.id} className="py-3 px-4">
                      <ul className="text-sm space-y-1 text-left">
                        {ev.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="text-gray-600">• {feature}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                  {selectedEVs.length < 3 && (
                    <td className="py-3 px-4 text-center text-gray-400">-</td>
                  )}
                </tr>

                {/* Warranty */}
                <tr className={specs.length % 2 === 1 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-4 font-semibold text-gray-700">Battery Warranty</td>
                  {selectedEVs.map((ev) => (
                    <td key={ev.id} className="py-3 px-4 text-center text-sm">
                      {ev.warranty}
                    </td>
                  ))}
                  {selectedEVs.length < 3 && (
                    <td className="py-3 px-4 text-center text-gray-400">-</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Select vehicles below to start comparing</p>
          </div>
        )}

        {/* Vehicle Selector */}
        {showSelector && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Vehicles to Compare</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evModels
                .filter(ev => !selectedEVs.find(selected => selected.id === ev.id))
                .map((ev) => (
                  <div key={ev.id} className="card">
                    <img
                      src={ev.image}
                      alt={`${ev.brand} ${ev.model}`}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {ev.brand} {ev.model}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{ev.variant}</p>
                    <p className="text-2xl font-bold text-primary mb-4">{formatLKR(ev.price)}</p>
                    <button
                      onClick={() => addEV(ev)}
                      disabled={selectedEVs.length >= 3}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        selectedEVs.length >= 3
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-green-600'
                      }`}
                    >
                      <Plus className="w-4 h-4 inline mr-2" />
                      Add to Compare
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
