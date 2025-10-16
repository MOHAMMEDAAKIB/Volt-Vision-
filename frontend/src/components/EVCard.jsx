import { Link } from 'react-router-dom';
import { Battery, Gauge, Zap, Calendar } from 'lucide-react';
import { formatLKR } from '../utils/evCalculations';

const EVCard = ({ ev, showCompare = false, onCompare }) => {
  return (
    <div className="card hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 h-48">
        <img
          src={ev.image}
          alt={`${ev.brand} ${ev.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            ev.availability === 'Available' 
              ? 'bg-green-500 text-white' 
              : 'bg-yellow-500 text-white'
          }`}>
            {ev.availability}
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800">
            {ev.brand} {ev.model}
          </h3>
          <p className="text-sm text-gray-600">{ev.variant}</p>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-bold text-primary">{formatLKR(ev.price)}</p>
          <p className="text-xs text-gray-500">{ev.type} • {ev.year}</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Battery className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-gray-500 text-xs">Range</p>
              <p className="font-semibold">{ev.range} km</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Zap className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-gray-500 text-xs">Battery</p>
              <p className="font-semibold">{ev.batteryCapacity} kWh</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Gauge className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-gray-500 text-xs">0-100 km/h</p>
              <p className="font-semibold">{ev.acceleration}s</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-gray-500 text-xs">DC Charge</p>
              <p className="font-semibold">{ev.chargingTime.dc}h</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/ev/${ev.id}`}
            className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-center text-sm font-medium"
          >
            View Details
          </Link>
          {showCompare && (
            <button
              onClick={() => onCompare(ev)}
              className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium"
            >
              Compare
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EVCard;
