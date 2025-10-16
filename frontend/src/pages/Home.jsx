import { Link } from 'react-router-dom';
import { Search, GitCompare, Calculator, Map, Bot, BookOpen, ArrowRight, Zap, Battery, DollarSign, MapPin } from 'lucide-react';
import { evModels } from '../data/evData';
import EVCard from '../components/EVCard';

const Home = () => {
  const featuredEVs = evModels.slice(0, 3);

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Search & Filter EVs',
      description: 'Find the perfect EV with advanced filters by price, range, brand, and type.',
      link: '/search',
      color: 'bg-blue-500',
    },
    {
      icon: <GitCompare className="w-8 h-8" />,
      title: 'Compare Models',
      description: 'Side-by-side comparison of specifications, features, and pricing.',
      link: '/compare',
      color: 'bg-purple-500',
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Cost Calculator',
      description: 'Calculate total cost of ownership with LKR pricing and local context.',
      link: '/calculator',
      color: 'bg-green-500',
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: 'Charging Map',
      description: 'Locate charging stations across Sri Lanka with real-time availability.',
      link: '/charging-map',
      color: 'bg-red-500',
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'AI Assistant',
      description: 'Get personalized EV recommendations based on your needs and budget.',
      link: '/ai-assistant',
      color: 'bg-indigo-500',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'EV Tips & Guides',
      description: 'Learn about buying, charging, maintenance, and living with an EV in Sri Lanka.',
      link: '/tips',
      color: 'bg-orange-500',
    },
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-12 h-12 text-primary" />,
      title: 'Lower Running Costs',
      description: 'Save up to 70% on fuel costs compared to petrol vehicles.',
    },
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: 'Government Incentives',
      description: 'Benefit from reduced import duties and special electricity rates.',
    },
    {
      icon: <Battery className="w-12 h-12 text-primary" />,
      title: 'Less Maintenance',
      description: '60% fewer parts mean lower maintenance costs and fewer repairs.',
    },
    {
      icon: <MapPin className="w-12 h-12 text-primary" />,
      title: 'Growing Network',
      description: 'Over 50 charging stations and expanding rapidly across the island.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Perfect Electric Vehicle in Sri Lanka
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              EVGuide SL helps you make informed decisions about electric vehicles with local pricing, 
              charging infrastructure, and expert insights tailored for Sri Lanka.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/search" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse EVs
              </Link>
              <Link to="/ai-assistant" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Get AI Recommendations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Everything You Need to Choose an EV</h2>
            <p className="text-xl text-gray-600">Comprehensive tools and information to make your EV journey smooth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="card hover:shadow-xl transition-shadow group"
              >
                <div className={`${feature.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-primary font-semibold">
                  Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured EVs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Electric Vehicles</h2>
            <p className="text-xl text-gray-600">Popular EVs available in Sri Lanka</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEVs.map((ev) => (
              <EVCard key={ev.id} ev={ev} showCompare={false} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/search" className="btn-primary inline-block">
              View All EVs
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose an Electric Vehicle?</h2>
            <p className="text-xl text-gray-600">Benefits of going electric in Sri Lanka</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Go Electric?</h2>
          <p className="text-xl mb-8">Let our AI assistant help you find the perfect EV for your lifestyle</p>
          <Link to="/ai-assistant" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Get Started with AI Assistant
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
