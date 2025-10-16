import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { evModels } from '../data/evData';
import { getAIRecommendation, formatLKR } from '../utils/evCalculations';
import EVCard from '../components/EVCard';

const AIAssistant = () => {
  const [step, setStep] = useState(1);
  const [userProfile, setUserProfile] = useState({
    budget: 10000000,
    dailyKm: 50,
    priorities: [],
    usage: '',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const priorities = [
    { value: 'range', label: 'Long Range', icon: '🔋' },
    { value: 'price', label: 'Affordable Price', icon: '💰' },
    { value: 'performance', label: 'Performance', icon: '⚡' },
    { value: 'charging', label: 'Fast Charging', icon: '⏱️' },
    { value: 'space', label: 'Space & Comfort', icon: '🚗' },
  ];

  const usageTypes = [
    { value: 'city', label: 'City Commute', description: 'Daily office commute in urban areas' },
    { value: 'family', label: 'Family Use', description: 'Weekend trips and family outings' },
    { value: 'business', label: 'Business Travel', description: 'Frequent intercity travel' },
    { value: 'mixed', label: 'Mixed Use', description: 'Combination of city and highway' },
  ];

  const togglePriority = (priority) => {
    setUserProfile(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const handleGetRecommendations = () => {
    const results = getAIRecommendation(userProfile, evModels);
    setRecommendations(results);
    setShowResults(true);
  };

  const resetAssistant = () => {
    setStep(1);
    setUserProfile({
      budget: 10000000,
      dailyKm: 50,
      priorities: [],
      usage: '',
    });
    setRecommendations([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">AI EV Assistant</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Answer a few questions and get personalized EV recommendations
          </p>
        </div>

        {!showResults ? (
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">Step {step} of 4</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Budget */}
            {step === 1 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What's your budget?</h2>
                <p className="text-gray-600 mb-6">Set your maximum budget for the EV purchase</p>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget: {formatLKR(userProfile.budget)}
                  </label>
                  <input
                    type="range"
                    min="5000000"
                    max="20000000"
                    step="500000"
                    value={userProfile.budget}
                    onChange={(e) => setUserProfile({ ...userProfile, budget: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>LKR 5M</span>
                    <span>LKR 20M</span>
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="btn-primary w-full">
                  Next
                </button>
              </div>
            )}

            {/* Step 2: Daily Distance */}
            {step === 2 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How far do you drive daily?</h2>
                <p className="text-gray-600 mb-6">Average daily distance in kilometers</p>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Daily Distance: {userProfile.dailyKm} km
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="10"
                    value={userProfile.dailyKm}
                    onChange={(e) => setUserProfile({ ...userProfile, dailyKm: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10 km</span>
                    <span>200 km</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Monthly: ~{(userProfile.dailyKm * 25).toLocaleString()} km
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button onClick={() => setStep(1)} className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="flex-1 btn-primary">
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Priorities */}
            {step === 3 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">What matters most to you?</h2>
                <p className="text-gray-600 mb-6">Select your top priorities (choose multiple)</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      onClick={() => togglePriority(priority.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        userProfile.priorities.includes(priority.value)
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{priority.icon}</div>
                      <div className="font-semibold text-gray-800">{priority.label}</div>
                    </button>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button onClick={() => setStep(2)} className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={userProfile.priorities.length === 0}
                    className={`flex-1 px-6 py-2 rounded-lg font-medium transition-colors ${
                      userProfile.priorities.length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-green-600'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Usage Type */}
            {step === 4 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How will you use your EV?</h2>
                <p className="text-gray-600 mb-6">Select your primary usage pattern</p>
                
                <div className="space-y-3 mb-6">
                  {usageTypes.map((usage) => (
                    <button
                      key={usage.value}
                      onClick={() => setUserProfile({ ...userProfile, usage: usage.value })}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        userProfile.usage === usage.value
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold text-gray-800 mb-1">{usage.label}</div>
                      <div className="text-sm text-gray-600">{usage.description}</div>
                    </button>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button onClick={() => setStep(3)} className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Back
                  </button>
                  <button
                    onClick={handleGetRecommendations}
                    disabled={!userProfile.usage}
                    className={`flex-1 px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${
                      !userProfile.usage
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-green-600'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Recommendations
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Results */}
            <div className="card mb-8 bg-gradient-to-r from-primary to-secondary text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Personalized Recommendations</h2>
                  <p className="text-green-100">
                    Based on your budget of {formatLKR(userProfile.budget)} and {userProfile.dailyKm} km daily driving
                  </p>
                </div>
                <button
                  onClick={resetAssistant}
                  className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  Start Over
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((ev, index) => (
                <div key={ev.id} className="relative">
                  {index === 0 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        ⭐ Best Match
                      </span>
                    </div>
                  )}
                  <EVCard ev={ev} showCompare={false} />
                </div>
              ))}
            </div>

            {/* Why These Recommendations */}
            <div className="card mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Why these recommendations?</h3>
              <div className="space-y-2 text-gray-700">
                <p>✓ All models fit within your budget of {formatLKR(userProfile.budget)}</p>
                <p>✓ Range sufficient for your daily {userProfile.dailyKm} km commute</p>
                <p>✓ Prioritized based on your preferences: {userProfile.priorities.join(', ')}</p>
                <p>✓ Optimized for {usageTypes.find(u => u.value === userProfile.usage)?.label}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
