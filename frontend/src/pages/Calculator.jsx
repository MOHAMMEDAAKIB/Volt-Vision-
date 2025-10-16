import { useState } from 'react';
import { Calculator as CalcIcon, TrendingDown, DollarSign, Zap, Wrench } from 'lucide-react';
import { evModels } from '../data/evData';
import { formatLKR, calculateTotalOwnership, compareWithPetrol } from '../utils/evCalculations';

const Calculator = () => {
  const [selectedEV, setSelectedEV] = useState(evModels[0]);
  const [monthlyKm, setMonthlyKm] = useState(1000);
  const [electricityRate, setElectricityRate] = useState(32);
  const [showComparison, setShowComparison] = useState(false);

  const evCosts = calculateTotalOwnership(selectedEV.price, monthlyKm);
  const comparison = compareWithPetrol(selectedEV.price, monthlyKm);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">EV Cost Calculator</h1>
          <p className="text-gray-600">Calculate total cost of ownership with Sri Lankan pricing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <CalcIcon className="w-5 h-5 mr-2" />
                Calculator Inputs
              </h2>

              {/* EV Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select EV Model
                </label>
                <select
                  value={selectedEV.id}
                  onChange={(e) => setSelectedEV(evModels.find(ev => ev.id === Number(e.target.value)))}
                  className="input"
                >
                  {evModels.map(ev => (
                    <option key={ev.id} value={ev.id}>
                      {ev.brand} {ev.model} - {formatLKR(ev.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Monthly Kilometers */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Distance (km)
                </label>
                <input
                  type="number"
                  value={monthlyKm}
                  onChange={(e) => setMonthlyKm(Number(e.target.value))}
                  className="input"
                  min="100"
                  max="10000"
                />
                <p className="text-xs text-gray-500 mt-1">Annual: {(monthlyKm * 12).toLocaleString()} km</p>
              </div>

              {/* Electricity Rate */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Electricity Rate (LKR/kWh)
                </label>
                <input
                  type="number"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(Number(e.target.value))}
                  className="input"
                  min="20"
                  max="60"
                />
                <p className="text-xs text-gray-500 mt-1">CEB average: LKR 30-35/kWh</p>
              </div>

              {/* Show Comparison Toggle */}
              <div className="mt-8">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    showComparison
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {showComparison ? 'Hide' : 'Show'} Petrol Comparison
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {/* EV Info Card */}
            <div className="card mb-8">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedEV.image}
                  alt={`${selectedEV.brand} ${selectedEV.model}`}
                  className="w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedEV.brand} {selectedEV.model}
                  </h3>
                  <p className="text-gray-600">{selectedEV.variant}</p>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Range</p>
                      <p className="font-semibold">{selectedEV.range} km</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Battery</p>
                      <p className="font-semibold">{selectedEV.batteryCapacity} kWh</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Efficiency</p>
                      <p className="font-semibold">{selectedEV.efficiency} Wh/km</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="card mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">5-Year Cost Breakdown</h3>
              
              <div className="space-y-4">
                {/* Purchase Price */}
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-primary mr-2" />
                    <span className="font-semibold">Purchase Price</span>
                  </div>
                  <span className="text-lg font-bold">{formatLKR(evCosts.purchasePrice)}</span>
                </div>

                {/* Annual Costs */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Annual Running Costs</h4>
                  
                  <div className="space-y-3 ml-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="text-sm">Electricity</span>
                      </div>
                      <span className="font-semibold">{formatLKR(evCosts.annualElectricity)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Wrench className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm">Maintenance</span>
                      </div>
                      <span className="font-semibold">{formatLKR(evCosts.annualMaintenance)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm">Insurance</span>
                      </div>
                      <span className="font-semibold">{formatLKR(evCosts.annualInsurance)}</span>
                    </div>
                  </div>
                </div>

                {/* Total Running Cost */}
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="font-semibold">Total Running (5 years)</span>
                  <span className="text-lg font-bold text-primary">{formatLKR(evCosts.totalRunning)}</span>
                </div>

                {/* Total Cost */}
                <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                  <span className="text-lg font-bold">Total Cost of Ownership</span>
                  <span className="text-2xl font-bold text-gray-800">{formatLKR(evCosts.totalCost)}</span>
                </div>

                {/* Per KM Cost */}
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Cost per Kilometer</span>
                    <span className="text-xl font-bold text-primary">
                      {formatLKR(evCosts.totalCostPerKm)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Petrol Comparison */}
            {showComparison && (
              <div className="card bg-gradient-to-r from-green-50 to-blue-50">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <TrendingDown className="w-6 h-6 text-primary mr-2" />
                  EV vs Petrol Comparison
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* EV Column */}
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-primary mb-3">Electric Vehicle</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Purchase:</span>
                        <span className="font-semibold">{formatLKR(comparison.ev.purchasePrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Fuel/Electricity:</span>
                        <span className="font-semibold">{formatLKR(comparison.ev.annualElectricity)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Maintenance:</span>
                        <span className="font-semibold">{formatLKR(comparison.ev.annualMaintenance)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-bold">
                        <span>5-Year Total:</span>
                        <span>{formatLKR(comparison.ev.totalCost)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Petrol Column */}
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-bold text-gray-700 mb-3">Petrol Vehicle</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Purchase:</span>
                        <span className="font-semibold">{formatLKR(comparison.petrol.purchasePrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Fuel/Electricity:</span>
                        <span className="font-semibold">{formatLKR(comparison.petrol.annualFuel)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Maintenance:</span>
                        <span className="font-semibold">{formatLKR(comparison.petrol.annualMaintenance)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-bold">
                        <span>5-Year Total:</span>
                        <span>{formatLKR(comparison.petrol.totalCost)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings */}
                <div className="bg-primary text-white p-6 rounded-lg">
                  <h4 className="text-2xl font-bold mb-2">You Save with EV!</h4>
                  <div className="flex items-baseline space-x-4">
                    <span className="text-4xl font-bold">{formatLKR(comparison.savings)}</span>
                    <span className="text-xl">({comparison.savingsPercentage.toFixed(1)}% savings)</span>
                  </div>
                  <p className="text-sm mt-2 text-green-100">Over 5 years compared to a petrol vehicle</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
