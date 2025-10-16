import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { evTips, faqs } from '../data/evData';

const EVTips = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const categories = ['all', ...new Set(evTips.map(tip => tip.category))];
  const filteredTips = selectedCategory === 'all' 
    ? evTips 
    : evTips.filter(tip => tip.category === selectedCategory);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">EV Tips & Guides</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Everything you need to know about owning and living with an EV in Sri Lanka
          </p>
        </div>

        {/* Category Filter */}
        <div className="card mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Tips' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {selectedCategory === 'all' ? 'All Tips' : `${selectedCategory} Tips`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTips.map((tip) => (
              <div key={tip.id} className="card hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{tip.icon}</div>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                    {tip.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buying Guide CTA */}
        <div className="card mt-12 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Buy Your First EV?</h2>
            <p className="text-xl mb-6 text-green-100">
              Use our AI assistant to find the perfect electric vehicle for your needs
            </p>
            <a
              href="/ai-assistant"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Get AI Recommendations
            </a>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Government Policies</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn about EV incentives and regulations in Sri Lanka
              </p>
              <a href="#" className="text-primary font-semibold text-sm hover:text-green-600">
                Read More →
              </a>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Charging Infrastructure</h3>
              <p className="text-gray-600 text-sm mb-4">
                Find charging stations and plan your routes
              </p>
              <a href="/charging-map" className="text-primary font-semibold text-sm hover:text-green-600">
                View Map →
              </a>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-2">EV Community</h3>
              <p className="text-gray-600 text-sm mb-4">
                Connect with other EV owners in Sri Lanka
              </p>
              <a href="#" className="text-primary font-semibold text-sm hover:text-green-600">
                Join Now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVTips;
