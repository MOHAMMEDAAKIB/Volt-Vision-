import { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { evModels } from '../data/evData';
import { filterEVs, sortEVs, getUniqueValues } from '../utils/evCalculations';
import EVCard from '../components/EVCard';

const SearchEVs = () => {
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    type: 'all',
    brand: 'all',
    rangeMin: '',
    availability: 'all',
  });
  
  const [sortBy, setSortBy] = useState('price-low');
  const [showFilters, setShowFilters] = useState(true);
  const [filteredEVs, setFilteredEVs] = useState(evModels);

  const brands = ['all', ...getUniqueValues(evModels, 'brand')];
  const types = ['all', 'Sedan', 'SUV', 'Hatchback'];

  useEffect(() => {
    let result = filterEVs(evModels, filters);
    result = sortEVs(result, sortBy);
    setFilteredEVs(result);
  }, [filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      type: 'all',
      brand: 'all',
      rangeMin: '',
      availability: 'all',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Search Electric Vehicles</h1>
          <p className="text-gray-600">Find the perfect EV from {evModels.length} models available in Sri Lanka</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary hover:text-green-600"
                >
                  Reset
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range (LKR)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value ? Number(e.target.value) : '')}
                    className="input text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value ? Number(e.target.value) : '')}
                    className="input text-sm"
                  />
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="input"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="input"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand === 'all' ? 'All Brands' : brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimum Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Range (km)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 300"
                  value={filters.rangeMin}
                  onChange={(e) => handleFilterChange('rangeMin', e.target.value ? Number(e.target.value) : '')}
                  className="input"
                />
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="input"
                >
                  <option value="all">All</option>
                  <option value="Available">Available</option>
                  <option value="Pre-Order">Pre-Order</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="card mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">{filteredEVs.length}</span> vehicles found
                </p>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-secondary text-sm flex items-center"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </button>
                
                <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                  <label className="text-sm font-semibold text-gray-700">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input text-sm"
                  >
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="range-high">Range: High to Low</option>
                    <option value="range-low">Range: Low to High</option>
                    <option value="efficiency">Most Efficient</option>
                  </select>
                </div>
              </div>
            </div>

            {/* EV Grid */}
            {filteredEVs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEVs.map((ev) => (
                  <EVCard key={ev.id} ev={ev} showCompare={true} />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600 text-lg">No vehicles found matching your criteria.</p>
                <button
                  onClick={resetFilters}
                  className="btn-primary mt-4"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchEVs;
