// Utility functions for EV calculations

// Format currency in LKR
export const formatLKR = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculate total cost of ownership for 5 years
export const calculateTotalOwnership = (evPrice, monthlyKm = 1000) => {
  const years = 5;
  const electricityRate = 32; // LKR per kWh (average home rate)
  const efficiency = 0.15; // Average 150 Wh/km = 0.15 kWh/km
  
  // Annual running costs
  const annualKm = monthlyKm * 12;
  const annualElectricityCost = annualKm * efficiency * electricityRate;
  const annualMaintenance = 50000; // Average EV maintenance per year in LKR
  const annualInsurance = evPrice * 0.03; // 3% of vehicle value
  
  // 5-year costs
  const totalRunningCost = (annualElectricityCost + annualMaintenance + annualInsurance) * years;
  const depreciation = evPrice * 0.35; // 35% depreciation over 5 years
  const totalCost = evPrice + totalRunningCost;
  
  return {
    purchasePrice: evPrice,
    annualElectricity: annualElectricityCost,
    annualMaintenance,
    annualInsurance,
    totalRunning: totalRunningCost,
    depreciation,
    totalCost,
    totalCostPerKm: totalCost / (annualKm * years),
  };
};

// Compare with petrol vehicle
export const compareWithPetrol = (evPrice, monthlyKm = 1000) => {
  const years = 5;
  const petrolPrice = 420; // LKR per liter (approximate)
  const petrolEfficiency = 12; // km per liter
  const petrolCarPrice = evPrice * 0.6; // Assume comparable petrol car is 60% of EV price
  
  // Petrol costs
  const annualKm = monthlyKm * 12;
  const annualPetrolCost = (annualKm / petrolEfficiency) * petrolPrice;
  const annualPetrolMaintenance = 120000; // Higher maintenance for ICE
  const annualPetrolInsurance = petrolCarPrice * 0.03;
  
  const totalPetrolRunning = (annualPetrolCost + annualPetrolMaintenance + annualPetrolInsurance) * years;
  const totalPetrolCost = petrolCarPrice + totalPetrolRunning;
  
  // EV costs
  const evCosts = calculateTotalOwnership(evPrice, monthlyKm);
  
  return {
    ev: evCosts,
    petrol: {
      purchasePrice: petrolCarPrice,
      annualFuel: annualPetrolCost,
      annualMaintenance: annualPetrolMaintenance,
      annualInsurance: annualPetrolInsurance,
      totalRunning: totalPetrolRunning,
      totalCost: totalPetrolCost,
      totalCostPerKm: totalPetrolCost / (annualKm * years),
    },
    savings: totalPetrolCost - evCosts.totalCost,
    savingsPercentage: ((totalPetrolCost - evCosts.totalCost) / totalPetrolCost) * 100,
  };
};

// Calculate charging cost
export const calculateChargingCost = (batteryCapacity, electricityRate = 32) => {
  const fullChargeCost = batteryCapacity * electricityRate;
  return {
    fullCharge: fullChargeCost,
    per100km: (fullChargeCost / 400) * 100, // Assuming 400km range
  };
};

// Calculate range based on efficiency
export const calculateRange = (batteryCapacity, efficiency) => {
  // efficiency in Wh/km, batteryCapacity in kWh
  return (batteryCapacity * 1000) / efficiency;
};

// Filter EVs based on criteria
export const filterEVs = (evs, filters) => {
  let filtered = [...evs];
  
  if (filters.priceMax) {
    filtered = filtered.filter(ev => ev.price <= filters.priceMax);
  }
  
  if (filters.priceMin) {
    filtered = filtered.filter(ev => ev.price >= filters.priceMin);
  }
  
  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(ev => ev.type.toLowerCase() === filters.type.toLowerCase());
  }
  
  if (filters.rangeMin) {
    filtered = filtered.filter(ev => ev.range >= filters.rangeMin);
  }
  
  if (filters.brand && filters.brand !== 'all') {
    filtered = filtered.filter(ev => ev.brand === filters.brand);
  }
  
  if (filters.availability && filters.availability !== 'all') {
    filtered = filtered.filter(ev => ev.availability === filters.availability);
  }
  
  return filtered;
};

// Sort EVs
export const sortEVs = (evs, sortBy) => {
  const sorted = [...evs];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'range-high':
      return sorted.sort((a, b) => b.range - a.range);
    case 'range-low':
      return sorted.sort((a, b) => a.range - b.range);
    case 'efficiency':
      return sorted.sort((a, b) => a.efficiency - b.efficiency);
    default:
      return sorted;
  }
};

// Get unique values for filters
export const getUniqueValues = (evs, key) => {
  return [...new Set(evs.map(ev => ev[key]))];
};

// AI recommendation based on user preferences
export const getAIRecommendation = (userProfile, evs) => {
  const { budget, dailyKm, priorities } = userProfile;
  
  // Filter by budget
  let candidates = evs.filter(ev => ev.price <= budget);
  
  if (candidates.length === 0) {
    candidates = evs.slice(0, 3); // Show top 3 if none in budget
  }
  
  // Score based on priorities
  const scored = candidates.map(ev => {
    let score = 0;
    
    if (priorities.includes('range')) {
      score += ev.range / 10;
    }
    if (priorities.includes('price')) {
      score += (budget - ev.price) / 100000;
    }
    if (priorities.includes('performance')) {
      score += (250 - ev.acceleration * 10);
    }
    if (priorities.includes('charging')) {
      score += (2 - ev.chargingTime.dc) * 50;
    }
    if (priorities.includes('space')) {
      score += ev.type === 'SUV' ? 100 : 50;
    }
    
    return { ...ev, score };
  });
  
  // Sort by score and return top 3
  return scored.sort((a, b) => b.score - a.score).slice(0, 3);
};

// Calculate distance between two points (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Find nearest charging stations
export const findNearestStations = (userLat, userLon, stations, limit = 5) => {
  const withDistance = stations.map(station => ({
    ...station,
    distance: calculateDistance(userLat, userLon, station.coordinates[0], station.coordinates[1]),
  }));
  
  return withDistance.sort((a, b) => a.distance - b.distance).slice(0, limit);
};
