import { evModels } from '../models/data.js';

// Get all EVs
export const getAllEVs = (req, res) => {
  try {
    res.json({
      success: true,
      count: evModels.length,
      data: evModels,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get EV by ID
export const getEVById = (req, res) => {
  try {
    const ev = evModels.find(ev => ev.id === parseInt(req.params.id));
    if (!ev) {
      return res.status(404).json({ success: false, error: 'EV not found' });
    }
    res.json({ success: true, data: ev });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Filter EVs
export const filterEVs = (req, res) => {
  try {
    const { 
      minPrice, 
      maxPrice, 
      type, 
      brand, 
      minRange,
      availability 
    } = req.query;

    let filtered = [...evModels];

    if (minPrice) {
      filtered = filtered.filter(ev => ev.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(ev => ev.price <= parseInt(maxPrice));
    }

    if (type && type !== 'all') {
      filtered = filtered.filter(ev => ev.type.toLowerCase() === type.toLowerCase());
    }

    if (brand && brand !== 'all') {
      filtered = filtered.filter(ev => ev.brand === brand);
    }

    if (minRange) {
      filtered = filtered.filter(ev => ev.range >= parseInt(minRange));
    }

    if (availability && availability !== 'all') {
      filtered = filtered.filter(ev => ev.availability === availability);
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

// Get unique brands
export const getBrands = (req, res) => {
  try {
    const brands = [...new Set(evModels.map(ev => ev.brand))];
    res.json({ success: true, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get EV types
export const getTypes = (req, res) => {
  try {
    const types = [...new Set(evModels.map(ev => ev.type))];
    res.json({ success: true, data: types });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
