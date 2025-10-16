import { chargingStations } from '../models/data.js';

// Get all charging stations
export const getAllStations = (req, res) => {
  try {
    res.json({
      success: true,
      count: chargingStations.length,
      data: chargingStations,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get station by ID
export const getStationById = (req, res) => {
  try {
    const station = chargingStations.find(s => s.id === parseInt(req.params.id));
    if (!station) {
      return res.status(404).json({ success: false, error: 'Station not found' });
    }
    res.json({ success: true, data: station });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Filter charging stations
export const filterStations = (req, res) => {
  try {
    const { type, chargerType } = req.query;

    let filtered = [...chargingStations];

    if (type && type !== 'all') {
      filtered = filtered.filter(station => station.type === type);
    }

    if (chargerType && chargerType !== 'all') {
      filtered = filtered.filter(station => 
        station.chargerTypes.includes(chargerType)
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Find nearest stations
export const findNearestStations = (req, res) => {
  try {
    const { lat, lon, limit = 5 } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ 
        success: false, 
        error: 'Latitude and longitude are required' 
      });
    }

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const withDistance = chargingStations.map(station => ({
      ...station,
      distance: calculateDistance(
        parseFloat(lat),
        parseFloat(lon),
        station.coordinates[0],
        station.coordinates[1]
      ),
    }));

    const nearest = withDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      count: nearest.length,
      data: nearest,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
